(() => {
  const demos = document.querySelector('[data-sg-demos]');
  const themeSelect = document.querySelector('[data-sg-theme]');
  const accentSelect = document.querySelector('[data-sg-accent]');
  const resetBtn = document.querySelector('[data-sg-reset]');
  if (!demos || !themeSelect || !accentSelect) return;

  const HERO_BG = {
    white: 'bg-accent',
    'gray-light': 'bg-accent',
    'gray-dark': 'teal-800',
    teal: 'teal-800',
    purple: 'purple-dark',
    navy: 'navy-dark'
  };

  const sectionRoots = () =>
    demos.querySelectorAll(
      '[data-sg-demos] > .section-hero, [data-sg-demos] > .section-text, [data-sg-demos] > .section-highlight, [data-sg-demos] > .section-list, [data-sg-demos] > .section-process, [data-sg-demos] > .section-feature, [data-sg-demos] > .section-accordion, [data-sg-demos] > .section-cta, [data-sg-demos] > .custom-hero, [data-sg-demos] > .page-header'
    );

  const apply = () => {
    const theme = themeSelect.value;
    const accent = accentSelect.value;

    demos.dataset.previewTheme = theme;
    demos.dataset.previewAccent = accent;

    sectionRoots().forEach(el => {
      el.setAttribute('data-section-theme', theme || 'white');
      el.style.removeProperty('--spot-color');
      el.style.removeProperty('background-color');

      el.querySelectorAll('.section').forEach(inner => {
        inner.style.removeProperty('--spot-color');
      });
    });

    demos.querySelectorAll('.custom-hero').forEach(el => {
      el.setAttribute('data-hero-background', HERO_BG[theme] || 'teal-800');
      el.setAttribute('data-section-theme', theme || 'white');
    });

    demos.querySelectorAll('.button:not([data-small-button])').forEach(btn => {
      if (accent && accent !== 'default') {
        btn.setAttribute('data-button-variant', accent);
      } else {
        btn.removeAttribute('data-button-variant');
      }
      btn.removeAttribute('data-ghost-button');
    });
  };

  themeSelect.addEventListener('change', apply);
  accentSelect.addEventListener('change', apply);
  resetBtn?.addEventListener('click', () => {
    window.location.reload();
  });
})();
