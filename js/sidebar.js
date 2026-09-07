// js/sidebar.js — course topic sidebar for COA/DLD/GenAI content pages.
// Self-sufficient: derives everything needed purely from location.pathname,
// so calling pages need nothing but
// `import { initSidebar } from '<root>/js/sidebar.js'; initSidebar();`
// with no per-page parameters. Silently does nothing on unit/course index
// pages or any page it can't match — additive, never required.
//
// Wraps .page-narrow in .sidebar-shell so the sidebar can sit genuinely
// alongside content (flex, aligned with the header's left edge, within the
// widened 1400px shell) on desktop, and becomes a fixed slide-out drawer
// below 1366px where there isn't room for both side by side (see
// SIDEBAR_REVISED_WIDECONTAINER_BRIEF.md).

export async function initSidebar() {
  const data = await resolveCoaDld() ?? await resolveGenai();
  if (!data) return;
  buildSidebar(data.pathHTML, data.listHTML);
}

// ── COA / DLD: academic/<course>/unit<N>/<topic>.html ─────────────────────
async function resolveCoaDld() {
  const m = location.pathname.match(/academic\/(coa|dld)\/unit(\d+)\/([^\/]*)$/);
  if (!m) return null;
  const [, course, unitNum, page] = m;
  const currentFile = page.replace(/\.html$/, '');
  if (currentFile === '' || currentFile === 'index') return null; // unit landing page already shows the full topic grid

  // Resolved relative to THIS module's own URL, not the calling page's —
  // dynamic import() inside a module always resolves against that module's
  // location. sidebar.js and js/curriculum/ are siblings under js/, so this
  // path is fixed regardless of the page's folder depth or any URL prefix
  // (e.g. the /courses/ prefix chandrashaker.com proxies this site under —
  // a page-relative '../../../' guess broke there while working by pure
  // coincidence on a bare-root localhost deployment).
  let mod;
  try {
    mod = await import(`./curriculum/${course}-unit${unitNum}.js`);
  } catch {
    return null; // no curriculum data file for this unit yet — fail silently
  }
  const topics = Object.values(mod.GROUPS).flat().filter(t => t.status === 'active');
  if (!topics.length) return null;

  // Which group does the current topic belong to? (for the "COA › Unit 1 ›
  // <group>" header path — the flat numbered list itself is unaffected.)
  const groupEntry = Object.entries(mod.GROUPS).find(([, list]) => list.some(t => t.href.replace(/\.html$/, '') === currentFile));
  const groupLabel = groupEntry && mod.GROUP_LABELS ? mod.GROUP_LABELS[groupEntry[0]] : null;
  // href targets match the breadcrumb's own — relative to the content page
  // itself (not this module), which is always 3 folders deep under
  // academic/<course>/unit<N>/.
  const pathParts = [
    `<a href="../../../index.html">Courses</a>`,
    `<a href="../index.html">${course.toUpperCase()}</a>`,
    `<a href="index.html">Unit ${unitNum}</a>`,
    groupLabel,
  ].filter(Boolean);
  const pathHTML = `<div class="sidebar-path">${pathParts.join(' <span class="sidebar-path-sep">›</span> ')}</div>`;

  const listHTML = topics.map((t, i) => {
    const topicFile = t.href.replace(/\.html$/, '');
    const isActive = topicFile === currentFile;
    return `<a href="${t.href}" class="sidebar-topic${isActive ? ' active' : ''}">${i + 1}. ${t.title}</a>`;
  }).join('');

  return { pathHTML, listHTML };
}

// ── GenAI: professional/genai/modules/<module>.html ────────────────────────
// No per-unit folders here (all 20 modules sit flat in modules/), so the
// "current unit" is found by searching js/curriculum/genai.js's UNITS array
// for the one containing this module, rather than reading it from the URL.
async function resolveGenai() {
  const m = location.pathname.match(/professional\/genai\/modules\/([^\/]*)$/);
  if (!m) return null;
  const currentFile = m[1].replace(/\.html$/, '');
  if (!currentFile) return null;

  let mod;
  try {
    mod = await import('./curriculum/genai.js');
  } catch {
    return null;
  }
  const unit = mod.UNITS.find(u => u.modules.some(mod2 => mod2.href.replace(/\.html$/, '') === `modules/${currentFile}`));
  if (!unit) return null;

  // GenAI has no dedicated per-unit page (the course index lists all 5
  // units together), so unlike COA/DLD's "Unit N", it's shown as plain
  // text rather than a link — there's nowhere for it to point.
  const pathHTML = `<div class="sidebar-path"><a href="../../../index.html">Courses</a> <span class="sidebar-path-sep">›</span> <a href="../index.html">GENAI</a> <span class="sidebar-path-sep">›</span> Unit ${unit.num}: ${unit.title}</div>`;

  const listHTML = unit.modules.map(mm => {
    const modFile = mm.href.replace(/\.html$/, '').replace(/^modules\//, '');
    const isActive = modFile === currentFile;
    return `<a href="${mm.href.replace(/^modules\//, '')}" class="sidebar-topic${isActive ? ' active' : ''}">${mm.label}. ${mm.title}</a>`;
  }).join('');

  return { pathHTML, listHTML };
}

// ── Shared DOM building (identical for every course) ───────────────────────
function buildSidebar(pathHTML, listHTML) {
  const pageNarrow = document.querySelector('.page-narrow');
  if (!pageNarrow) return;

  // Wrap .page-narrow in .sidebar-shell (flex row: sidebar + content)
  const shell = document.createElement('div');
  shell.className = 'sidebar-shell';
  pageNarrow.parentNode.insertBefore(shell, pageNarrow);

  const aside = document.createElement('aside');
  aside.className = 'topic-sidebar';
  aside.innerHTML = `
    <button class="sidebar-toggle-btn" type="button" aria-expanded="true">✕ Hide Topics</button>
    <button class="drawer-close-btn" type="button" aria-label="Close topic list">✕ Close</button>
    ${pathHTML}
    <nav class="sidebar-list">${listHTML}</nav>
  `;
  shell.appendChild(aside);
  shell.appendChild(pageNarrow);

  // Mobile-only: backdrop + edge trigger tab (hidden via CSS at >=1366px)
  const backdrop = document.createElement('div');
  backdrop.className = 'drawer-backdrop';
  document.body.appendChild(backdrop);

  const triggerTab = document.createElement('button');
  triggerTab.className = 'drawer-trigger-tab';
  triggerTab.type = 'button';
  triggerTab.setAttribute('aria-label', 'Open unit topic list');
  triggerTab.textContent = '📋 Topics';
  document.body.appendChild(triggerTab);

  // Desktop: collapse/expand in place (sidebar column stays, list hides)
  const toggleBtn = aside.querySelector('.sidebar-toggle-btn');
  toggleBtn.addEventListener('click', () => {
    const collapsed = aside.classList.toggle('sidebar-collapsed');
    toggleBtn.textContent = collapsed ? '☰ Show Topics' : '✕ Hide Topics';
    toggleBtn.setAttribute('aria-expanded', String(!collapsed));
  });

  // Mobile: slide-out drawer over a dimmed backdrop, page never shifts
  function openDrawer() {
    aside.classList.add('drawer-open');
    backdrop.classList.add('show');
  }
  function closeDrawer() {
    aside.classList.remove('drawer-open');
    backdrop.classList.remove('show');
  }
  triggerTab.addEventListener('click', openDrawer);
  backdrop.addEventListener('click', closeDrawer);
  aside.querySelector('.drawer-close-btn').addEventListener('click', closeDrawer);
}
