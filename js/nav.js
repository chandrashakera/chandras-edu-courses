// js/nav.js — shared header + nav bar + footer, matching chandrashaker.com's branding
import { onAuth, logout } from './firebase-config.js';

export function initNav(depth = 0) {
  const root = depth === 0 ? '.' : Array(depth).fill('..').join('/');
  const nav = document.getElementById('main-nav');
  if (nav) {
    nav.innerHTML = `
      <header class="site-header">
        <div class="site-header-inner">
          <a href="${root}/index.html" class="site-logo">
            <img src="${root}/images/logo-mark.png" alt="Chandras EDU" class="site-logo-img">
            <span class="site-logo-text">
              <span class="site-logo-title">CHANDRAS EDU</span>
              <span class="site-logo-tagline">Never Stop Learning</span>
            </span>
          </a>
        </div>
      </header>
      <nav class="nav">
        <div class="nav-inner">
          <div class="nav-links">
            <a href="https://chandrashaker.in" class="hide-mobile" target="_blank" rel="noopener">Blog</a>
            <span class="nav-user" id="nav-user"></span>
            <a href="${root}/login.html" class="nav-btn" id="nav-auth-btn">Login</a>
          </div>
        </div>
      </nav>`;
  }
  const footer = document.getElementById('main-footer');
  if (footer) {
    footer.className = 'footer';
    footer.textContent = '© 2026 CHANDRAS EDU.';
  }
  onAuth(user => {
    const btn     = document.getElementById('nav-auth-btn');
    const navUser = document.getElementById('nav-user');
    if (!btn) return;
    if (user) {
      navUser.textContent = user.displayName || user.email.split('@')[0];
      btn.textContent = 'Logout';
      btn.href = '#';
      btn.onclick = async e => { e.preventDefault(); await logout(); location.reload(); };
    } else {
      btn.textContent = 'Login';
      btn.href = `${root}/login.html`;
      btn.onclick = null;
    }
  });
}
