// js/nav.js
// Call initNav(depth) on every page
// depth = how many ../ to reach root
// e.g. index.html → depth=0, academic/coa/unit1/topic.html → depth=3

import { onAuth, logout } from './firebase-config.js';

export function initNav(depth = 0) {
  const root = depth === 0 ? '.' : Array(depth).fill('..').join('/');

  const nav = document.getElementById('main-nav');
  if (nav) {
    nav.innerHTML = `
      <div class="nav-inner">
        <a href="${root}/index.html" class="nav-brand">Chandras <span>EDU</span></a>
        <div class="nav-links">
          <a href="${root}/academic/coa/index.html" class="hide-mobile">COA</a>
          <a href="${root}/professional/genai/index.html" class="hide-mobile">GenAI</a>
          <a href="https://chandrashaker.in" class="hide-mobile" target="_blank">Blog</a>
          <span class="nav-user" id="nav-user"></span>
          <a href="${root}/login.html" class="nav-btn" id="nav-auth-btn">Login</a>
        </div>
      </div>
    `;
  }

  onAuth(user => {
    const btn     = document.getElementById('nav-auth-btn');
    const navUser = document.getElementById('nav-user');
    if (!btn) return;
    if (user) {
      navUser.textContent = user.displayName || user.email.split('@')[0];
      btn.textContent     = 'Logout';
      btn.href            = '#';
      btn.onclick = async (e) => {
        e.preventDefault();
        await logout();
        location.reload();
      };
    } else {
      btn.textContent = 'Login';
      btn.href        = `${root}/login.html`;
      btn.onclick     = null;
    }
  });
}
