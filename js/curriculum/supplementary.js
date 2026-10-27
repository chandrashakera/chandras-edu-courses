// js/curriculum/supplementary.js — support for "supplementary" topics (extra pages beyond the syllabus).
// A curriculum entry marks itself with `supplementary: true`; by convention such topics sit in the last group of a unit
// (key 'tg-supplementary', label 'Supplementary Topics — Beyond the Syllabus').
// Supplementary topics have no quiz, no progress record and are never required for a certificate, so everything that
// counts topics (progress label, getAllProgress ids, certificate requiredIds, slides card) goes through syllabusTopics().
// To add one: put the entry in the unit's curriculum file with `supplementary: true` — the unit index renders the section itself.

export const SUPP_LABEL = 'Supplementary Topics — Beyond the Syllabus';
export const SUPP_INTRO = 'Extra topics students often search for and examiners sometimes ask. Not required for the certificate.';

export const isSupp = t => !!(t && t.supplementary);
export const syllabusTopics = GROUPS => Object.values(GROUPS).flat().filter(t => !isSupp(t));
export const supplementaryTopics = GROUPS => Object.values(GROUPS).flat().filter(isSupp);

// Builds the supplementary section on a unit index page (after the slides card, else before the login nudge).
// No-op when the unit has no supplementary topics.
export function renderSupplementary(GROUPS) {
  const topics = supplementaryTopics(GROUPS).filter(t => t.status === 'active');
  if (!topics.length || document.getElementById('supplementary')) return;
  const sec = document.createElement('div');
  sec.id = 'supplementary';
  sec.innerHTML = `
    <div class="section-head" style="margin-top:2rem">\u{1F4CC} ${SUPP_LABEL}</div>
    <p style="color:var(--text-2);font-size:.88rem;margin-bottom:.9rem">${SUPP_INTRO}</p>
    <div class="topic-list">` + topics.map(t => `
      <a href="${t.href}" class="topic-card">
        <div class="topic-info">
          <div class="topic-title">${t.title} <span class="badge badge-blue" style="font-size:.65rem;vertical-align:middle;margin-left:.35rem">Supplementary</span></div>
          <div class="topic-desc">${t.desc}</div>
          <div class="topic-meta"><span>⏱ ${t.time}</span></div>
        </div>
        <div class="topic-arrow">→</div>
      </a>`).join('') + `
    </div>`;
  const anchor = document.getElementById('slides') || document.getElementById('login-nudge');
  if (!anchor) return;
  if (anchor.id === 'slides') anchor.insertAdjacentElement('afterend', sec);
  else anchor.insertAdjacentElement('beforebegin', sec);
}
