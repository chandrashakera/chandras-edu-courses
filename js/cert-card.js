// js/cert-card.js — the "🏆 Your certificate" card shared by the course landing pages (GenAI, COA, …).
// States: checking → issued → not yet eligible (N of M, links to topics still to do, a separate
// "retake to pass" list) → claim form. Eligibility rules and the course title/track/prefix come from
// js/certificates/config.js; this file has no course-specific code.
//
// Page usage (signed-in user, after loading progress):
//   renderCertCard({ el, user, courseId:'coa', prog, items, unit:'topic' });
//   items : { [progressId]: { href, label, title } }  — href relative to the page showing the card
//   unit  : the word used for one required item ('sub-module', 'topic')

import { checkEligibility, getExistingCertificate, claimCertificate, validateName, renderCertificateHTML, NAME_HELP } from './certificate.js';
import { CERT_COURSES } from './certificates/config.js';

const CERT_PAGE = new URL('../certificate.html', import.meta.url).href;
const QUIZ_LENGTH = 5;
const COLLAPSE_OVER = 30;      // a "still to do" list longer than this is folded into a <details>

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));

function list(ids, items, prog, withScore) {
  return ids.filter(id => items[id]).map(id => {
    const m = items[id], p = prog[id];
    const best = withScore && p && p.score != null ? ` <span style="color:var(--text-3)">(best ${p.score}/${p.total || QUIZ_LENGTH})</span>` : '';
    return `<li><a href="${m.href}">${esc(m.label)} ${esc(m.title)}</a>${best}</li>`;
  }).join('');
}
const ul = html => `<ul style="margin:.6rem 0 0 1.4rem;font-size:.9rem;columns:2;column-gap:2rem">${html}</ul>`;
function foldable(count, noun, html) {
  return count > COLLAPSE_OVER
    ? `<details style="margin-top:.6rem"><summary style="cursor:pointer;font-weight:600;font-size:.9rem">Show the ${count} ${noun}</summary>${ul(html)}</details>`
    : ul(html);
}

export async function renderCertCard({ el, user, courseId, prog, items, unit = 'sub-module' }) {
  const course = CERT_COURSES[courseId];
  const passCount = Math.ceil((course.passPct ?? 0) * QUIZ_LENGTH / 100);
  const passText = `${passCount} out of ${QUIZ_LENGTH}`;
  el.innerHTML = '<p style="text-align:center;color:var(--text-2)">Checking your progress…</p>';
  const [elig, existing] = await Promise.all([checkEligibility(user.uid, courseId, prog), getExistingCertificate(user.uid, courseId)]);
  if (existing) {
    el.innerHTML = `<p style="text-align:center;color:var(--text-2)">Your certificate has been issued.</p>
      <p style="text-align:center;margin-top:.5rem">Certificate ID: <strong>${esc(existing.certId)}</strong></p>
      <p style="text-align:center;margin-top:.75rem"><a class="btn btn-success" href="${CERT_PAGE}?id=${encodeURIComponent(existing.certId)}">View your certificate</a></p>`;
    return;
  }
  if (!elig.eligible) {
    let html = `<p style="text-align:center;color:var(--text-2)"><strong>${elig.done} / ${elig.total} complete.</strong> Pass the quiz in each ${unit} (${passText}) to earn your certificate.${elig.missing.length ? ' Still to do:' : ''}</p>`;
    if (elig.missing.length) html += foldable(elig.missing.length, `${unit}s still to do`, list(elig.missing, items, prog, false));
    if (elig.belowPass.length) {
      html += `<p style="text-align:center;color:var(--text-2);margin-top:.9rem"><strong>Retake to pass:</strong> your best score in ${elig.belowPass.length === 1 ? 'this ' + unit + ' is' : 'these ' + elig.belowPass.length + ' ' + unit + 's is'} below ${passText}.</p>`
            + foldable(elig.belowPass.length, `${unit}s to retake`, list(elig.belowPass, items, prog, true));
    }
    el.innerHTML = html;
    return;
  }
  const first = validateName(user.displayName || '');
  el.innerHTML = `<p style="text-align:center;color:var(--text-2)">You have completed all ${elig.total} ${unit}s. Claim your certificate.</p>
    <label for="cert-name" style="display:block;font-weight:600;font-size:.92rem;margin:.9rem 0 .3rem">Your name as it should appear on the certificate</label>
    <input type="text" id="cert-name" maxlength="80" autocomplete="name" value="${first.ok ? esc(first.name) : ''}" style="width:100%;max-width:440px;padding:.55rem .7rem;border:1.5px solid var(--border);border-radius:var(--radius);font-size:1rem">
    <div style="font-size:.8rem;color:var(--text-3);margin-top:.3rem">Use your full name as on your college ID or official documents. Check spelling and capitalisation. ${esc(NAME_HELP)}</div>
    <div id="cert-name-err" style="color:var(--error);font-size:.85rem;min-height:1.1rem;margin-top:.25rem"></div>
    <div id="cert-preview" style="margin:.75rem 0"></div>
    <label style="display:flex;gap:.5rem;align-items:flex-start;font-size:.9rem;margin:.5rem 0"><input type="checkbox" id="cert-confirm" style="margin-top:.2rem"><span>I confirm this is my name exactly as it should appear on my certificate.</span></label>
    <p style="font-size:.82rem;color:var(--text-3);margin:.25rem 0 .75rem">Anyone with your certificate link can see your name, the course and the date.</p>
    <div style="text-align:center"><button class="btn btn-success" id="cert-claim" disabled>Claim certificate</button></div>
    <div id="cert-claim-err" style="color:var(--error);font-size:.85rem;text-align:center;min-height:1.1rem;margin-top:.4rem"></div>`;
  const draft = { certId: `CE-${course.prefix}-${new Date().getFullYear()}-XXXXXX`, name: first.ok ? first.name : '', courseTitle: course.title, track: course.track, completedOn: elig.completedOn };
  const view = renderCertificateHTML(draft, document.getElementById('cert-preview'), { draft: true });
  const input = document.getElementById('cert-name'), confirmBox = document.getElementById('cert-confirm'), btn = document.getElementById('cert-claim');
  const refresh = () => {
    const v = validateName(input.value);
    document.getElementById('cert-name-err').textContent = input.value && !v.ok ? v.error : '';
    view.setName(v.ok ? v.name : '');
    btn.disabled = !(v.ok && confirmBox.checked);
  };
  input.oninput = refresh; confirmBox.onchange = refresh; refresh();
  btn.onclick = async () => {
    btn.disabled = true; btn.textContent = 'Creating your certificate…';
    try {
      const cert = await claimCertificate(user.uid, courseId, input.value);
      location.href = `${CERT_PAGE}?id=${encodeURIComponent(cert.certId)}`;
    } catch (err) {
      document.getElementById('cert-claim-err').textContent = err.message || 'Something went wrong. Please try again.';
      btn.textContent = 'Claim certificate'; refresh();
    }
  };
}

export async function renderCertCardSafe(opts) {
  try { await renderCertCard(opts); }
  catch (err) { console.error(err); opts.el.innerHTML = '<p style="text-align:center;color:var(--text-2)">Could not load your certificate status. Please refresh the page.</p>'; }
}
