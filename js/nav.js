// js/nav.js — shared nav bar, no course tabs in header
import { onAuth, logout } from './firebase-config.js';

export function initNav(depth = 0) {
  const root = depth === 0 ? '.' : Array(depth).fill('..').join('/');
  const nav = document.getElementById('main-nav');
  if (nav) {
    nav.innerHTML = `
      <div class="nav-inner">
        <a href="${root}/index.html" class="nav-brand">Chandras <span>EDU</span></a>
        <div class="nav-links">
          <a href="https://chandrashaker.in" class="hide-mobile" target="_blank" rel="noopener">Blog</a>
          <span class="nav-user" id="nav-user"></span>
          <a href="${root}/login.html" class="nav-btn" id="nav-auth-btn">Login</a>
        </div>
      </div>`;
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
