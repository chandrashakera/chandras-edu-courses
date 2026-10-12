// js/certificate.js — shared certificate system (eligibility, claim, verify, render, PDF).
// Needs on the page: jsPDF 2.5.1 (window.jspdf) and qrcode-generator 1.4.4 (window.qrcode), both from cdnjs.
// Certificates live in Firestore: certificates/{certId} (public get) and users/{uid}/certificates/{courseId} (pointer).
// Eligibility is self-attested (Firestore rules cannot check 20 progress docs) — see the handoff.

import { db, getAllProgress } from './firebase-config.js';
import {
  doc, getDoc, writeBatch, updateDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { CERT_COURSES, SITE_ORIGIN } from './certificates/config.js';

const DAY_MS = 24 * 60 * 60 * 1000;
export const NAME_HELP = 'Use English letters; accented letters such as é are allowed.';
const NAME_RE = /^[A-Za-zÀ-ÖØ-öø-ÿ .'-]{2,60}$/;
const HAS_2_LETTERS = /[A-Za-zÀ-ÖØ-öø-ÿ].*[A-Za-zÀ-ÖØ-öø-ÿ]/;
const ID_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';        // no 0, O, 1, I
const ID_FORMAT = /^CE-[A-Z0-9]{2,12}-\d{4}-[A-Z2-9]{6}$/;
const LOGO_URL = new URL('../images/logo-lockup-v2.png', import.meta.url).href;

// ── Names ─────────────────────────────────────────────────────
export function normalizeName(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }
export function validateName(raw) {
  const name = normalizeName(raw);
  if (name.length < 2)  return { ok:false, name, error:'Enter at least 2 characters.' };
  if (name.length > 60) return { ok:false, name, error:'Use 60 characters or fewer.' };
  if (!NAME_RE.test(name) || !HAS_2_LETTERS.test(name))
    return { ok:false, name, error:'Use English letters, spaces, full stops, apostrophes and hyphens only (no digits or symbols).' };
  return { ok:true, name, error:'' };
}

// ── URLs ──────────────────────────────────────────────────────
export function isValidCertId(id) { return ID_FORMAT.test(String(id || '')); }
export function certificateUrl(certOrId) {
  const id = typeof certOrId === 'string' ? certOrId : certOrId.certId;
  return `${SITE_ORIGIN}/certificate?id=${encodeURIComponent(id)}`;
}
export function linkedInAddUrl(cert) {
  const [y, m] = String(cert.completedOn).split('-');
  const q = {
    startTask: 'CERTIFICATION_NAME', name: cert.courseTitle, organizationName: 'CHANDRAS EDU',
    issueYear: String(+y), issueMonth: String(+m), certUrl: certificateUrl(cert), certId: cert.certId
  };
  return 'https://www.linkedin.com/profile/add?' + Object.entries(q).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
}
export function formatDate(d) {
  const dt = d instanceof Date ? d : new Date(String(d).length === 10 ? d + 'T00:00:00' : d);
  return dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

// ── Eligibility, claim, read, correct ─────────────────────────
function ymd(date) {
  const p = n => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`;
}

export async function checkEligibility(uid, courseId, progress) {
  const course = CERT_COURSES[courseId];
  if (!course) throw new Error('Unknown course: ' + courseId);
  const prog = progress || await getAllProgress(uid, courseId, course.requiredIds);
  const missing = course.requiredIds.filter(id => !prog[id]?.completed);
  const total = course.requiredIds.length;
  const stamps = course.requiredIds.map(id => prog[id]?.completedAt).filter(Boolean).map(s => new Date(s)).filter(d => !isNaN(d));
  const latest = stamps.length ? new Date(Math.max(...stamps)) : null;
  return { eligible: missing.length === 0, done: total - missing.length, total, missing,
           completedOn: ymd(latest || new Date()) };          // fallback: today (issue date)
}

function toCert(data) {
  if (!data) return null;
  const ts = data.issuedAt;
  return { ...data, issuedAt: ts && ts.toDate ? ts.toDate() : (ts ? new Date(ts) : null) };
}

export async function getCertificate(certId) {
  if (!isValidCertId(certId)) return null;
  const snap = await getDoc(doc(db, 'certificates', certId));
  return snap.exists() ? toCert(snap.data()) : null;
}

export async function getExistingCertificate(uid, courseId) {
  const ptr = await getDoc(doc(db, 'users', uid, 'certificates', courseId));
  if (!ptr.exists()) return null;
  return getCertificate(ptr.data().certId);
}

function newCertId(prefix) {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  const tail = Array.from(bytes, b => ID_ALPHABET[b & 31]).join('');   // 32 symbols → no modulo bias
  return `CE-${prefix}-${new Date().getFullYear()}-${tail}`;
}

export async function claimCertificate(uid, courseId, rawName) {
  const course = CERT_COURSES[courseId];
  if (!course) throw new Error('Unknown course: ' + courseId);
  const v = validateName(rawName);
  if (!v.ok) throw new Error(v.error);
  const existing = await getExistingCertificate(uid, courseId);
  if (existing) return existing;                                         // one certificate per learner per course
  const elig = await checkEligibility(uid, courseId);
  if (!elig.eligible) throw new Error('Course not complete yet.');
  for (let attempt = 0; attempt < 5; attempt++) {
    const certId = newCertId(course.prefix);
    const certRef = doc(db, 'certificates', certId);
    if ((await getDoc(certRef)).exists()) continue;                      // ID collision → new ID
    const batch = writeBatch(db);                                        // certificate + pointer succeed or fail together
    batch.set(certRef, {
      certId, uid, name: v.name, courseId, courseTitle: course.title, track: course.track,
      completedOn: elig.completedOn, issuedAt: serverTimestamp(), nameCorrected: false
    });
    batch.set(doc(db, 'users', uid, 'certificates', courseId), { certId, issuedAt: serverTimestamp() });
    await batch.commit();
    return getCertificate(certId);
  }
  throw new Error('Could not create a certificate ID. Please try again.');
}

export function canCorrectName(cert, uid, now = new Date()) {
  return !!cert && cert.uid === uid && cert.nameCorrected === false && cert.issuedAt &&
         now.getTime() < cert.issuedAt.getTime() + 7 * DAY_MS;
}

export async function correctName(uid, certId, rawName) {
  const v = validateName(rawName);
  if (!v.ok) throw new Error(v.error);
  const cert = await getCertificate(certId);
  if (!cert) throw new Error('Certificate not found.');
  if (!canCorrectName(cert, uid)) throw new Error('The name can no longer be corrected here. Email mailchandrasedu@gmail.com.');
  await updateDoc(doc(db, 'certificates', certId), { name: v.name, nameCorrected: true });   // same ID and link
  return getCertificate(certId);
}

// ── Layout (shared by the page and the PDF; units = px on a 1000 × 707 sheet, A4 landscape) ──
const SHEET = { w: 1000, h: 707 };
const BLUE = '#1565C0', ORANGE = '#FF8F00', GREY = '#4b5563', DARK = '#111827';
const FOOTER = ['Free online course by CHANDRAS EDU · chandrashaker.com/courses.',
                'This certificate confirms course completion; it is not an accredited qualification.'];
const QR_BOX = { x: 790, y: 448, size: 112 };

function fitSize(text, maxW, startPx, weight) {
  const c = document.createElement('canvas').getContext('2d');
  let size = startPx;
  for (; size > 18; size -= 1) { c.font = `${weight} ${size}px Helvetica, Arial, sans-serif`; if (c.measureText(text).width <= maxW) break; }
  return size;
}

function qrMatrix(url) {
  const qr = window.qrcode(0, 'M'); qr.addData(url); qr.make();
  const n = qr.getModuleCount(), rows = [];
  for (let r = 0; r < n; r++) { const row = []; for (let c = 0; c < n; c++) row.push(qr.isDark(r, c)); rows.push(row); }
  return rows;
}
function qrPngDataUrl(url) {
  const m = qrMatrix(url), n = m.length, cell = 8, q = 4 * cell, size = n * cell + 2 * q;
  const c = document.createElement('canvas'); c.width = c.height = size;
  const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, size, size); x.fillStyle = '#000';
  m.forEach((row, r) => row.forEach((d, k) => { if (d) x.fillRect(q + k * cell, q + r * cell, cell, cell); }));
  return c.toDataURL('image/png');
}

function ensureStyle() {
  if (document.getElementById('cert-style')) return;
  const s = document.createElement('style'); s.id = 'cert-style';
  s.textContent = `
  .certv-outer{position:relative;width:100%;overflow:hidden;background:#fff;border:1px solid #d6dbe4;border-radius:4px}
  .certv{position:absolute;left:0;top:0;width:${SHEET.w}px;height:${SHEET.h}px;transform-origin:0 0;background:#fff;
         font-family:Helvetica,Arial,sans-serif;color:${DARK}}
  .certv *{box-sizing:border-box;margin:0;padding:0}
  .certv .cv-b1{position:absolute;inset:12px;border:3px solid ${BLUE}}
  .certv .cv-b2{position:absolute;inset:20px;border:1.5px solid ${ORANGE}}
  .certv .cv-t{position:absolute;left:0;width:${SHEET.w}px;text-align:center;line-height:1;white-space:nowrap}
  .certv .cv-l{position:absolute;line-height:1;white-space:nowrap}
  .certv img.cv-logo{position:absolute;left:350px;top:38px;width:300px;height:57px}
  .certv img.cv-qr{position:absolute;left:${QR_BOX.x}px;top:${QR_BOX.y}px;width:${QR_BOX.size}px;height:${QR_BOX.size}px}`;
  document.head.appendChild(s);
}

const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[ch]));

function nameSize(name) { return fitSize(name || 'Your name', 800, 52, 'bold'); }

// Renders the certificate into el, scaled to the element's width. Returns { setName(name) } for live previews.
export function renderCertificateHTML(cert, el, opts = {}) {
  ensureStyle();
  const url = cert.certId && !opts.draft ? certificateUrl(cert) : `${SITE_ORIGIN}/certificate`;
  const t = (top, size, weight, color, text, extra = '') =>
    `<div class="cv-t" style="top:${top - size}px;font-size:${size}px;font-weight:${weight};color:${color};${extra}">${text}</div>`;
  const l = (left, top, size, weight, color, text) =>
    `<div class="cv-l" style="left:${left}px;top:${top - size}px;font-size:${size}px;font-weight:${weight};color:${color}">${text}</div>`;
  const nm = cert.name || 'Your name', ns = nameSize(nm);
  el.innerHTML = `<div class="certv-outer"><div class="certv" role="img" aria-label="Certificate of Completion for ${esc(nm)}">
    <div class="cv-b1"></div><div class="cv-b2"></div>
    <img class="cv-logo" src="${LOGO_URL}" alt="">
    ${t(165, 46, 'bold', BLUE, 'Certificate of Completion')}
    <div style="position:absolute;left:380px;width:240px;top:182px;height:3px;background:${ORANGE}"></div>
    ${t(225, 20, 'normal', GREY, 'This is to certify that')}
    <div class="cv-t cv-name" style="top:${285 - ns}px;font-size:${ns}px;font-weight:bold;color:${DARK}${cert.name ? '' : ';opacity:.35'}">${esc(nm)}</div>
    <div style="position:absolute;left:100px;width:800px;top:299px;height:2px;background:${BLUE}"></div>
    ${t(341, 20, 'normal', GREY, 'has successfully completed the free online course')}
    ${t(389, 32, 'bold', BLUE, esc(cert.courseTitle))}
    ${t(421, 18, 'normal', GREY, esc(cert.track) + ' course')}
    ${l(90, 478, 13, 'normal', GREY, 'Completed on')}
    ${l(90, 506, 21, 'bold', DARK, esc(formatDate(cert.completedOn)))}
    ${l(90, 546, 13, 'normal', GREY, 'Certificate ID')}
    ${l(90, 572, 20, 'bold', DARK, esc(cert.certId))}
    <div style="position:absolute;left:370px;width:260px;top:520px;height:1px;background:#9ca3af"></div>
    <div class="cv-t" style="left:370px;width:260px;top:528px;font-size:20px;font-weight:bold;color:${DARK}">Chandra Shaker</div>
    <div class="cv-t" style="left:370px;width:260px;top:556px;font-size:14px;color:${GREY}">Course Instructor</div>
    <img class="cv-qr" src="${qrPngDataUrl(url)}" alt="QR code to verify this certificate">
    <div class="cv-t" style="left:${QR_BOX.x - 24}px;width:${QR_BOX.size + 48}px;top:${QR_BOX.y + QR_BOX.size + 8}px;font-size:12px;color:${GREY}">Scan to verify</div>
    ${t(628, 12, 'normal', GREY, FOOTER[0])}
    ${t(646, 12, 'normal', GREY, FOOTER[1])}
  </div></div>`;
  const outer = el.firstElementChild, sheet = outer.firstElementChild;
  const fit = () => { const w = outer.clientWidth || el.clientWidth || SHEET.w, k = w / SHEET.w; sheet.style.transform = `scale(${k})`; outer.style.height = (SHEET.h * k) + 'px'; };
  fit();
  if (window.ResizeObserver) new ResizeObserver(fit).observe(el); else window.addEventListener('resize', fit);
  return {
    setName(name) {
      const d = sheet.querySelector('.cv-name'), s = nameSize(name);
      d.textContent = name || 'Your name'; d.style.fontSize = s + 'px'; d.style.top = (285 - s) + 'px'; d.style.opacity = name ? '' : '.35';
    }
  };
}

// ── PDF ───────────────────────────────────────────────────────
function loadLogoPng() {
  return new Promise((res, rej) => {
    const im = new Image();
    im.onload = () => { const c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight; c.getContext('2d').drawImage(im, 0, 0); res(c.toDataURL('image/png')); };
    im.onerror = () => rej(new Error('Could not load the logo'));
    im.src = LOGO_URL;
  });
}

export async function buildCertificatePDF(cert) {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const K = 297 / SHEET.w;                                   // px → mm
  const pt = px => px * K * 2.8346;                          // px font size → pt
  const rgb = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
  const color = hex => pdf.setTextColor(...rgb(hex));
  const text = (str, x, y, px, weight, hex, align) => { pdf.setFont('helvetica', weight); pdf.setFontSize(pt(px)); color(hex); pdf.text(str, x * K, y * K, align ? { align } : undefined); };
  pdf.setFillColor(255, 255, 255); pdf.rect(0, 0, 297, 210, 'F');
  pdf.setDrawColor(...rgb(BLUE)); pdf.setLineWidth(3 * K); pdf.rect(12 * K, 12 * K, (SHEET.w - 24) * K, (SHEET.h - 24) * K, 'S');
  pdf.setDrawColor(...rgb(ORANGE)); pdf.setLineWidth(1.5 * K); pdf.rect(20 * K, 20 * K, (SHEET.w - 40) * K, (SHEET.h - 40) * K, 'S');
  pdf.addImage(await loadLogoPng(), 'PNG', 350 * K, 38 * K, 300 * K, 57 * K);
  const cx = SHEET.w / 2;
  text('Certificate of Completion', cx, 165, 46, 'bold', BLUE, 'center');
  pdf.setFillColor(...rgb(ORANGE)); pdf.rect(380 * K, 182 * K, 240 * K, 3 * K, 'F');
  text('This is to certify that', cx, 225, 20, 'normal', GREY, 'center');
  const ns = nameSize(cert.name);
  text(cert.name, cx, 285, ns, 'bold', DARK, 'center');
  pdf.setFillColor(...rgb(BLUE)); pdf.rect(100 * K, 299 * K, 800 * K, 2 * K, 'F');
  text('has successfully completed the free online course', cx, 341, 20, 'normal', GREY, 'center');
  text(cert.courseTitle, cx, 389, 32, 'bold', BLUE, 'center');
  text(cert.track + ' course', cx, 421, 18, 'normal', GREY, 'center');
  text('Completed on', 90, 478, 13, 'normal', GREY);
  text(formatDate(cert.completedOn), 90, 506, 21, 'bold', DARK);
  text('Certificate ID', 90, 546, 13, 'normal', GREY);
  text(cert.certId, 90, 572, 20, 'bold', DARK);
  pdf.setFillColor(156, 163, 175); pdf.rect(370 * K, 520 * K, 260 * K, 1 * K, 'F');
  text('Chandra Shaker', 500, 548, 20, 'bold', DARK, 'center');
  text('Course Instructor', 500, 570, 14, 'normal', GREY, 'center');
  // QR as vector squares (stays sharp when printed), 4-module quiet zone
  const m = qrMatrix(certificateUrl(cert)), n = m.length, mod = QR_BOX.size / (n + 8);
  pdf.setFillColor(255, 255, 255); pdf.rect(QR_BOX.x * K, QR_BOX.y * K, QR_BOX.size * K, QR_BOX.size * K, 'F');
  pdf.setFillColor(0, 0, 0);
  m.forEach((row, r) => row.forEach((d, c) => { if (d) pdf.rect((QR_BOX.x + (c + 4) * mod) * K, (QR_BOX.y + (r + 4) * mod) * K, mod * K + 0.02, mod * K + 0.02, 'F'); }));
  text('Scan to verify', QR_BOX.x + QR_BOX.size / 2, QR_BOX.y + QR_BOX.size + 20, 12, 'normal', GREY, 'center');
  text(FOOTER[0], cx, 628, 12, 'normal', GREY, 'center');
  text(FOOTER[1], cx, 646, 12, 'normal', GREY, 'center');
  return pdf;
}

export async function downloadCertificatePDF(cert) {
  const pdf = await buildCertificatePDF(cert);
  pdf.save(`Certificate-${cert.certId}.pdf`);
}
