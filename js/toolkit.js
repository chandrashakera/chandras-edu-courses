// js/toolkit.js — GenAI 5.4 Final Project: the "My Personal AI Toolkit" form.
// Seven text sections + one optional screenshot link. The draft lives in Firestore at
// users/{uid}/projects/genai-toolkit (owner-only, covered by the users/{userId}/{document=**} rule).
// Submitting writes submittedAt and — only if 5.4 is not already complete — marks genai/m-5-4 complete
// with no score, which is what the certificate needs. Minimums are simple counts, not AI grading.
// Download: Markdown always; PDF with jsPDF (window.jspdf, loaded by the page).

import { getProject, saveProject, getProgress, markModuleComplete } from './firebase-config.js';

const MAX_CHARS = 4000;
const PROJECT_ID = 'genai-toolkit';
const COURSE_ID = 'genai', MODULE_ID = 'm-5-4';
const AUTOSAVE_MS = 30000;

// ── The seven sections and their minimums ─────────────────────
const lines  = t => t.split('\n').map(s => s.trim()).filter(Boolean);
const blocks = t => t.split(/\n\s*\n/).map(s => s.trim()).filter(s => s.length >= 8);
const MONTH = /\bmonth\s*\d|\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\b|\b(30|60|90)[\s-]*day/i;
const need = (have, n, noun) => ({ ok: have >= n, status: have >= n ? '✓ Minimum met' : `${Math.min(have, n)} of ${n} ${noun}` });

export const SECTIONS = [
  { key: 'stack', no: 1, title: 'AI Stack', min: 'At least 3 tools, each with what you use it for',
    help: 'List the tools you use and what you use each one for — one tool per line, written as “tool — what for”.',
    example: 'ChatGPT — drafting emails and explaining error messages\nClaude — summarising long documents\nGemini — quick research with sources',
    check: t => need(lines(t).filter(l => /\S.*?\s*[-–—:]\s*\S{3}/.test(l)).length, 3, 'tools') },
  { key: 'prompts', no: 2, title: 'Prompt Library', min: 'At least 5 prompts',
    help: 'Your tested prompts in the standard entry format. Leave a blank line between one prompt and the next.',
    example: 'Title: Explain an error\nPrompt: You are a senior developer. Explain this error in simple words and give a fix: [paste error]\nBest tool: ChatGPT\n\nTitle: Summarise a report\nPrompt: …',
    check: t => need(blocks(t).length, 5, 'prompts') },
  { key: 'roles', no: 3, title: 'Role Library', min: 'At least 5 roles',
    help: 'Five or more customised roles, each with all four elements. Leave a blank line between one role and the next.',
    example: 'Role: Technical interviewer\nTask: Ask me one question at a time on Java basics\nContext: I am a fresher applying for a developer job\nFormat: Question, wait, then feedback in two lines\n\nRole: …',
    check: t => need(blocks(t).length, 5, 'roles') },
  { key: 'usecases', no: 4, title: 'Use Cases and Workflows', min: 'At least 3 use cases from your own work',
    help: 'Your company research notes, your RAG use case and your agent workflow. Leave a blank line between use cases.',
    example: 'Company: Infosys — uses GenAI for code assistance (source: annual report, 2026)\n\nRAG use case: answer questions from my college notes…\n\nAgent workflow: …',
    check: t => need(blocks(t).length, 3, 'use cases') },
  { key: 'automation', no: 5, title: 'Automation', min: 'One workflow you will automate, step by step (at least 3 steps)',
    help: 'Step-by-step description (add a link to a screenshot if you have one). Write one step per line.',
    example: '1. New email arrives in Gmail with the label “Invoices”\n2. AI extracts the amount and due date\n3. A row is added to my Google Sheet',
    check: t => need(lines(t).length, 3, 'steps') },
  { key: 'decision', no: 6, title: 'Architecture Decision', min: 'Your choice (prompting, RAG, fine-tuning or agent) and why',
    help: 'Your prompt vs RAG vs fine-tuning recommendation and your reasoning, in a few sentences.',
    example: 'For my use case I recommend RAG, because my notes change every semester and fine-tuning would need retraining each time…',
    check: t => { const words = t.trim().split(/\s+/).filter(Boolean).length, named = /prompt|\brag\b|retriev|fine-?\s?tun|agent/i.test(t);
      return { ok: words >= 25 && named, status: words >= 25 && named ? '✓ Minimum met' : !named ? 'Name your choice (prompting, RAG, fine-tuning or agent)' : `${words} of 25 words` }; } },
  { key: 'plan', no: 7, title: '90-Day Plan', min: 'At least 3 goals, each with a month',
    help: 'Your certification plan, profile updates and first-client plan, with dates. One goal per line, each with its month.',
    example: 'Month 1 — finish a prompt-engineering certification\nMonth 2 — update LinkedIn and Naukri profiles\nMonth 3 — pitch my first freelance client',
    check: t => need(lines(t).filter(l => MONTH.test(l)).length, 3, 'goals with a month') }
];
const FIELDS = SECTIONS.map(s => s.key).concat('automationUrl');

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const validUrl = u => !u || /^https?:\/\/\S+\.\S+$/i.test(u.trim());

// ── Downloads ─────────────────────────────────────────────────
function monthYear(d = new Date()) { return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }); }
export function toolkitTitle(name) { return `My Personal AI Toolkit — ${name || 'Learner'} — ${monthYear()}`; }

export function toMarkdown(data, name) {
  const out = [`# ${toolkitTitle(name)}`, ''];
  SECTIONS.forEach(s => {
    out.push(`## ${s.no}. ${s.title}`, '', (data[s.key] || '').trim() || '_(empty)_', '');
    if (s.key === 'automation' && (data.automationUrl || '').trim()) out.push(`Screenshot: ${data.automationUrl.trim()}`, '');
  });
  out.push('---', 'Built in the free “Generative AI: Zero to Job-Ready” course at CHANDRAS EDU — https://chandrashaker.com/courses/', '');
  return out.join('\n');
}

const PDF_MAP = { '‘': "'", '’': "'", '“': '"', '”': '"', '–': '-', '—': '-', '…': '...', '•': '-', '→': '->', '←': '<-', '✓': 'v', '₀': '0', '₁': '1', '₂': '2', '₃': '3' };
const pdfSafe = t => String(t).replace(/[^\x09\x0A\x20-\x7E -ÿ]/g, c => PDF_MAP[c] ?? '?');

export function toPdf(data, name) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const W = 210, M = 20, LW = W - 2 * M; let y = M;
  const ensure = h => { if (y + h > 280) { doc.addPage(); y = M; } };
  doc.setFont('helvetica', 'bold'); doc.setFontSize(17);
  doc.splitTextToSize(pdfSafe(toolkitTitle(name)), LW).forEach(l => { ensure(8); doc.text(l, M, y); y += 8; });
  y += 4;
  SECTIONS.forEach(s => {
    ensure(14); doc.setFont('helvetica', 'bold'); doc.setFontSize(12.5); doc.text(`${s.no}. ${s.title}`, M, y); y += 6.5;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
    let body = (data[s.key] || '').trim() || '(empty)';
    if (s.key === 'automation' && (data.automationUrl || '').trim()) body += `\n\nScreenshot: ${data.automationUrl.trim()}`;
    pdfSafe(body).split('\n').forEach(par => {
      if (!par.trim()) { y += 2.5; return; }
      doc.splitTextToSize(par, LW).forEach(l => { ensure(5); doc.text(l, M, y); y += 4.9; });
    });
    y += 5;
  });
  ensure(10); doc.setFontSize(8.5); doc.setTextColor(110);
  doc.text('Built in the free "Generative AI: Zero to Job-Ready" course at CHANDRAS EDU - chandrashaker.com/courses', M, y);
  return doc;
}

function saveFile(filename, blob) {
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

// ── The form ──────────────────────────────────────────────────
export async function initToolkit({ root, user, courseHref = '../index.html' }) {
  const name = (user.displayName || '').trim();
  root.innerHTML = `
    <p style="font-size:.9rem;color:var(--text-2);margin-bottom:1rem">Fill in the seven sections from the practice you kept in your AI Learning Journal. Each section shows its minimum. Your draft is saved automatically every 30 seconds.</p>
    <div id="tk-sections" style="display:flex;flex-direction:column;gap:1rem"></div>
    <div style="background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1rem 1.1rem;margin-top:1rem">
      <label style="display:flex;gap:.5rem;align-items:flex-start;font-size:.9rem"><input type="checkbox" id="tk-confirm" style="margin-top:.2rem"><span>This is my own work for my own role.</span></label>
      <div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-top:.9rem;align-items:center">
        <button class="btn btn-outline btn-sm" id="tk-save">Save draft</button>
        <button class="btn btn-success btn-sm" id="tk-submit" disabled>Submit Final Project</button>
        <span id="tk-status" style="font-size:.82rem;color:var(--text-3)"></span>
      </div>
      <div id="tk-submit-hint" style="font-size:.82rem;color:var(--text-3);margin-top:.5rem"></div>
      <div id="tk-done" style="display:none;margin-top:.75rem;padding:.75rem 1rem;background:#f0fdf4;border:1px solid #86efac;border-radius:var(--radius);color:#166534;font-size:.9rem;font-weight:600">
        ✅ Final Project complete — your certificate is ready on the <a href="${courseHref}" style="color:#166534;text-decoration:underline">course page</a>.
      </div>
    </div>
    <div style="margin-top:1rem;padding-top:.9rem;border-top:1px solid var(--border)">
      <div style="font-weight:600;font-size:.92rem;margin-bottom:.5rem">Keep your toolkit</div>
      <div style="display:flex;gap:.6rem;flex-wrap:wrap">
        <button class="btn btn-primary btn-sm" id="tk-md">Download my toolkit (.md)</button>
        <button class="btn btn-outline btn-sm" id="tk-pdf">Download as PDF</button>
      </div>
      <p style="font-size:.8rem;color:var(--text-3);margin-top:.5rem">The PDF supports English letters and common punctuation. Use the Markdown file if you write in another script.</p>
    </div>`;

  const holder = root.querySelector('#tk-sections');
  holder.innerHTML = SECTIONS.map(s => `
    <div style="background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1rem 1.1rem" data-sec="${s.key}">
      <div style="display:flex;justify-content:space-between;gap:.5rem;align-items:baseline;flex-wrap:wrap">
        <label for="tk-${s.key}" style="font-weight:700;font-size:.95rem">${s.no}. ${esc(s.title)}</label>
        <span class="tk-stat" style="font-size:.8rem;font-weight:600;color:var(--text-3)"></span>
      </div>
      <div style="font-size:.84rem;color:var(--text-2);margin:.25rem 0 .1rem">${esc(s.help)}</div>
      <div style="font-size:.78rem;color:var(--text-3);margin-bottom:.45rem">Minimum: ${esc(s.min)}</div>
      <textarea id="tk-${s.key}" maxlength="${MAX_CHARS}" rows="6" placeholder="${esc('Example:\n' + s.example)}" style="width:100%;box-sizing:border-box;padding:.6rem .7rem;border:1.5px solid var(--border);border-radius:var(--radius);font:inherit;font-size:.9rem;line-height:1.5;resize:vertical"></textarea>
      ${s.key === 'automation' ? `<label for="tk-automationUrl" style="display:block;font-size:.82rem;font-weight:600;margin:.55rem 0 .2rem">Screenshot link (optional)</label>
        <input type="url" id="tk-automationUrl" maxlength="500" placeholder="https://…" style="width:100%;box-sizing:border-box;padding:.5rem .7rem;border:1.5px solid var(--border);border-radius:var(--radius);font-size:.9rem">
        <div class="tk-urlerr" style="font-size:.8rem;color:var(--error);min-height:1rem"></div>` : ''}
      <div class="tk-count" style="font-size:.76rem;color:var(--text-3);text-align:right;margin-top:.2rem"></div>
    </div>`).join('');

  const el = id => root.querySelector('#' + id);
  const area = Object.fromEntries(FIELDS.map(k => [k, el('tk-' + k)]));
  const status = el('tk-status');
  const read = () => Object.fromEntries(FIELDS.map(k => [k, area[k].value.trim() === '' ? '' : area[k].value]));
  let dirty = false, busy = false, submittedAt = null;

  function refresh() {
    const data = read(); let all = true;
    SECTIONS.forEach(s => {
      const r = s.check(data[s.key]), card = root.querySelector(`[data-sec="${s.key}"]`);
      const st = card.querySelector('.tk-stat'); st.textContent = r.status; st.style.color = r.ok ? 'var(--success)' : 'var(--text-3)';
      card.querySelector('.tk-count').textContent = `${data[s.key].length} / ${MAX_CHARS}`;
      all = all && r.ok;
    });
    const urlOk = validUrl(area.automationUrl.value);
    root.querySelector('.tk-urlerr').textContent = urlOk ? '' : 'Enter a full link starting with https://';
    const ready = all && urlOk && el('tk-confirm').checked;
    el('tk-submit').disabled = !ready || busy;
    el('tk-submit-hint').textContent = ready ? '' : (all && urlOk ? 'Tick the box to enable Submit.' : 'Submit unlocks when all seven sections show ✓.');
  }

  async function save(extra = {}) {
    if (busy) return; busy = true;
    try {
      await saveProject(user.uid, PROJECT_ID, { ...read(), ...extra });
      dirty = false; status.textContent = 'Draft saved ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (err) { console.error(err); status.textContent = 'Could not save — check your connection and try again.'; throw err; }
    finally { busy = false; refresh(); }
  }

  // restore the draft
  try {
    const saved = await getProject(user.uid, PROJECT_ID);
    if (saved) {
      FIELDS.forEach(k => { if (typeof saved[k] === 'string') area[k].value = saved[k]; });
      submittedAt = saved.submittedAt || null;
      status.textContent = 'Draft restored';
      if (submittedAt) el('tk-done').style.display = 'block';
    }
  } catch (err) { console.error(err); status.textContent = 'Could not load your saved draft.'; }
  const prog = await getProgress(user.uid, COURSE_ID, MODULE_ID).catch(() => null);
  if (prog?.completed) el('tk-done').style.display = 'block';

  FIELDS.forEach(k => area[k].addEventListener('input', () => { dirty = true; refresh(); }));
  el('tk-confirm').onchange = refresh;
  el('tk-save').onclick = () => save().catch(() => {});
  setInterval(() => { if (dirty && !busy) save().catch(() => {}); }, AUTOSAVE_MS);

  el('tk-submit').onclick = async () => {
    el('tk-submit').disabled = true; status.textContent = 'Submitting…';
    try {
      await save({ submittedAt: new Date().toISOString() });
      const p = await getProgress(user.uid, COURSE_ID, MODULE_ID);
      if (!p?.completed) await markModuleComplete(user.uid, COURSE_ID, MODULE_ID);   // legacy completers keep their record
      el('tk-done').style.display = 'block'; status.textContent = 'Submitted';
    } catch (err) { status.textContent = 'Could not submit — please try again.'; }
    refresh();
  };

  el('tk-md').onclick = () => saveFile('my-ai-toolkit.md', new Blob([toMarkdown(read(), name)], { type: 'text/markdown;charset=utf-8' }));
  el('tk-pdf').onclick = () => {
    if (!window.jspdf) { status.textContent = 'The PDF tool did not load — use the Markdown download.'; return; }
    toPdf(read(), name).save('my-ai-toolkit.pdf');
  };
  refresh();
}
