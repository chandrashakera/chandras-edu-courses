// js/copy-prompt.js — attaches a click handler to every .prompt-copy-btn on
// the page, copying its sibling .prompt-text to the clipboard. Shared across
// any page with prompt boxes (currently the AI Tools course).

export function initCopyButtons() {
  document.querySelectorAll('.prompt-copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.closest('.prompt-box')?.querySelector('.prompt-text')?.textContent ?? '';
      try {
        await navigator.clipboard.writeText(text.trim());
      } catch {
        return; // clipboard permission denied or unsupported — fail silently, text is still visible to copy manually
      }
      const original = btn.textContent;
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('copied');
      }, 1500);
    });
  });
}
