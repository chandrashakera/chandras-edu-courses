// js/sidebar.js — course topic sidebar for COA/DLD content pages.
// Self-sufficient: derives course, unit, and the relative path back to
// js/curriculum/ purely from location.pathname, so calling pages need
// nothing but `import { initSidebar } from '<root>/js/sidebar.js'; initSidebar();`
// with no per-page parameters. Silently does nothing on unit index pages,
// GenAI pages, or any page it can't match — additive, never required.
//
// Wraps .page-narrow in .sidebar-shell so the sidebar can sit genuinely
// alongside content (flex, centered, within the widened 1400px shell) on
// desktop, and becomes a fixed slide-out drawer below 1366px where there
// isn't room for both side by side (see SIDEBAR_REVISED_WIDECONTAINER_BRIEF.md).

export async function initSidebar() {
  const m = location.pathname.match(/academic\/(coa|dld)\/unit(\d+)\/([^\/]*)$/);
  if (!m) return;
  const [, course, unitNum, page] = m;
  const currentFile = page.replace(/\.html$/, '');
  if (currentFile === '' || currentFile === 'index') return; // unit landing page already shows the full topic grid

  const root = '../../../'; // academic/<course>/unit<N>/<page> is always 3 folders deep
  let mod;
  try {
    mod = await import(`${root}js/curriculum/${course}-unit${unitNum}.js`);
  } catch {
    return; // no curriculum data file for this unit yet — fail silently
  }
  const topics = Object.values(mod.GROUPS).flat().filter(t => t.status === 'active');
  if (!topics.length) return;

  const pageNarrow = document.querySelector('.page-narrow');
  if (!pageNarrow) return;

  const listHTML = topics.map((t, i) => {
    const topicFile = t.href.replace(/\.html$/, '');
    const isActive = topicFile === currentFile;
    return `<a href="${t.href}" class="sidebar-topic${isActive ? ' active' : ''}">${i + 1}. ${t.title}</a>`;
  }).join('');

  // Wrap .page-narrow in .sidebar-shell (flex row: sidebar + content)
  const shell = document.createElement('div');
  shell.className = 'sidebar-shell';
  pageNarrow.parentNode.insertBefore(shell, pageNarrow);

  const aside = document.createElement('aside');
  aside.className = 'topic-sidebar';
  aside.innerHTML = `
    <button class="sidebar-toggle-btn" type="button" aria-expanded="true">✕ Hide Topics</button>
    <button class="drawer-close-btn" type="button" aria-label="Close topic list">✕ Close</button>
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
