// js/slides-card.js — the "Revise with the slides" download card at the end of each COA unit page,
// and the end-of-unit prompt on the last topic page of each unit.
// Data-driven: both show only for units listed in js/curriculum/coa-slides.js.
// To add a unit: drop COA_Unit<N>_Slides.pdf/.pptx into downloads/coa/ and add one line to that config.
// Real content with plain download links — no timers, gating or sign-in. The wrapper #slides-card is
// the element to add as an AdSense Excluded Area; it carries generous margins so no ad sits against the buttons.

import { SLIDES } from './curriculum/coa-slides.js';

const BASE = new URL('../downloads/coa/', import.meta.url).href;
const fmtDate = d => new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export function slidesFor(unit) { return SLIDES.find(s => s.unit === unit) || null; }

export function renderSlidesCard(el, unit, topicCount) {
  const s = slidesFor(unit);
  if (!el || !s) return;
  el.innerHTML = `
    <div id="slides-card" style="margin:1.75rem 0;padding:1.25rem 1.4rem;background:var(--bg-2);border:1px solid var(--border);border-radius:var(--radius-lg)">
      <h2 style="font-size:1.05rem;font-weight:700;margin-bottom:.3rem">\u{1F4E5} Revise with the slides</h2>
      <p style="font-size:.9rem;color:var(--text-2);margin-bottom:.3rem">Finished the topics? Download the lecture slides for this unit to revise — figures, worked examples and key points.</p>
      <p style="font-size:.82rem;color:var(--text-3);margin-bottom:.9rem">${s.slides} slides · PDF ${s.pdfMB} MB · PowerPoint ${s.pptxMB} MB · updated ${fmtDate(s.updated)}</p>
      <div style="display:flex;flex-wrap:wrap;gap:.6rem">
        <a class="btn btn-primary" style="flex:1 1 220px;justify-content:center" href="${BASE}${s.pdf}" download="${s.pdf}">Download PDF</a>
        <a class="btn btn-outline" style="flex:1 1 220px;justify-content:center" href="${BASE}${s.pptx}" download="${s.pptx}">Download PPTX</a>
      </div>
      <p style="font-size:.78rem;color:var(--text-3);margin:.8rem 0 0">Sharing with classmates? Please share this page link rather than the file, so they always get the latest version.</p>
    </div>`;
}

// End-of-unit prompt (last topic page of a unit): a box-tip pointing to the slides card; only for units with slides.
export function renderUnitEnd(el, unit) {
  if (!el || !slidesFor(unit)) return;
  el.innerHTML = `<div class="box box-tip" style="margin:1.5rem 0">\u{1F389} You've reached the end of Unit ${unit}. <a href="index.html#slides">Revise the whole unit with the lecture slides →</a></div>`;
}
