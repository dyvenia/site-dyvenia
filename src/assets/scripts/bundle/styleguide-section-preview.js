(() => {
  const STORAGE_KEY = 'sg-section-fixtures';
  const demos = document.querySelector('[data-sg-demos]');
  const themeSelect = document.querySelector('[data-sg-theme]');
  const accentSelect = document.querySelector('[data-sg-accent]');
  const widthSelect = document.querySelector('[data-sg-width]');
  const alignSelect = document.querySelector('[data-sg-align]');
  const heightSelect = document.querySelector('[data-sg-height]');
  const mediaBgSelect = document.querySelector('[data-sg-media-bg]');
  const vAlignSelect = document.querySelector('[data-sg-valign]');
  const resetBtn = document.querySelector('[data-sg-reset]');

  // Theme + accent always required; layout selects optional on pages without that form
  if (!themeSelect || !accentSelect) return;

  const WIDTH_CLASSES = ['content', 'feature', 'full'];
  const ALIGN_CLASSES = ['text-center', 'text-right'];

  const seedFromDemo = () => {
    if (!demos) return;
    const root =
      demos.querySelector('[data-section-theme]') ||
      demos.querySelector('.custom-hero') ||
      demos.querySelector('.section-cta');
    if (!root) return;
    const theme = root.getAttribute('data-section-theme');
    if (theme && [...themeSelect.options].some(o => o.value === theme)) {
      themeSelect.value = theme;
    }
    const hero = demos.querySelector('.custom-hero');
    if (hero) {
      const h = hero.getAttribute('data-hero-height');
      const bg = hero.getAttribute('data-hero-background');
      const inline = hero.getAttribute('data-hero-content-inline');
      const block = hero.getAttribute('data-hero-content-block');
      if (heightSelect && h) heightSelect.value = h;
      if (mediaBgSelect && bg) mediaBgSelect.value = bg;
      if (vAlignSelect && block) vAlignSelect.value = block;
      if (inline && alignSelect && [...alignSelect.options].some(o => o.value === inline)) {
        alignSelect.value = inline;
      }
    }
    const btn = demos.querySelector('.button:not([data-small-button]):not([data-pill-button])');
    const variant =
      demos.querySelector('[data-section-accent]')?.getAttribute('data-section-accent') ||
      btn?.getAttribute('data-button-variant');
    if (variant && accentSelect && [...accentSelect.options].some(o => o.value === variant)) {
      accentSelect.value = variant;
    }
  };

  const defaults = {};
  const captureDefaults = () => {
    defaults.theme = themeSelect.value;
    defaults.accent = accentSelect.value;
    if (widthSelect) defaults.width = widthSelect.value;
    if (alignSelect) defaults.align = alignSelect.value;
    if (heightSelect) defaults.height = heightSelect.value;
    if (mediaBgSelect) defaults.mediaBg = mediaBgSelect.value;
    if (vAlignSelect) defaults.vAlign = vAlignSelect.value;
  };

  const readStored = () => {
    try {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  };

  const currentState = () => ({
    theme: themeSelect.value,
    accent: accentSelect.value,
    width: widthSelect?.value,
    align: alignSelect?.value,
    height: heightSelect?.value,
    mediaBg: mediaBgSelect?.value,
    vAlign: vAlignSelect?.value
  });

  const writeStored = state => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  };

  const restore = () => {
    const stored = readStored();
    if (stored.theme) themeSelect.value = stored.theme;
    if (stored.accent) accentSelect.value = stored.accent;
    if (stored.width && widthSelect) widthSelect.value = stored.width;
    if (stored.align && alignSelect) alignSelect.value = stored.align;
    if (stored.height && heightSelect) heightSelect.value = stored.height;
    if (stored.mediaBg && mediaBgSelect) mediaBgSelect.value = stored.mediaBg;
    if (stored.vAlign && vAlignSelect) vAlignSelect.value = stored.vAlign;
  };

  const sectionRoots = () => {
    if (!demos) return [];
    return demos.querySelectorAll('[data-section-theme], .custom-hero, .section-cta, .page-header');
  };

  const applyWidth = width => {
    if (!demos || !width) return;
    demos.querySelectorAll('.section__inner').forEach(el => {
      el.classList.remove(...WIDTH_CLASSES);
      if (WIDTH_CLASSES.includes(width)) el.classList.add(width);
    });
  };

  const applyAlign = align => {
    if (!demos || !align) return;
    const targets = demos.querySelectorAll(
      '.section__inner, .section__inner .prose, .section__inner header, .section-process h2, .custom-hero .wrapper, .section-cta .wrapper'
    );
    targets.forEach(el => {
      el.classList.remove(...ALIGN_CLASSES);
      if (align === 'center') el.classList.add('text-center');
      if (align === 'right') el.classList.add('text-right');
    });
    demos.querySelectorAll('.custom-hero').forEach(el => {
      el.setAttribute('data-hero-content-inline', align || 'left');
    });
  };

  const apply = () => {
    const theme = themeSelect.value;
    const accent = accentSelect.value;
    const width = widthSelect?.value;
    const align = alignSelect?.value;
    const height = heightSelect?.value;
    const mediaBg = mediaBgSelect?.value;
    const vAlign = vAlignSelect?.value;

    writeStored(currentState());
    if (!demos) return;

    demos.dataset.previewTheme = theme;
    demos.dataset.previewAccent = accent;

    sectionRoots().forEach(el => {
      el.setAttribute('data-section-theme', theme || 'white');
      if (accent && accent !== 'default') {
        el.setAttribute('data-section-accent', accent);
      } else {
        el.removeAttribute('data-section-accent');
      }
      el.style.removeProperty('--spot-color');
      el.style.removeProperty('background-color');
      el.querySelectorAll('.section').forEach(inner => {
        inner.style.removeProperty('--spot-color');
      });
    });

    demos.querySelectorAll('.custom-hero').forEach(el => {
      el.setAttribute('data-section-theme', theme || 'white');
      if (height) el.setAttribute('data-hero-height', height);
      if (mediaBg) el.setAttribute('data-hero-background', mediaBg);
      if (vAlign) el.setAttribute('data-hero-content-block', vAlign);
    });

    demos.querySelectorAll('.button:not([data-small-button]):not([data-pill-button])').forEach(btn => {
      if (accent && accent !== 'default') {
        btn.setAttribute('data-button-variant', accent);
      } else {
        btn.removeAttribute('data-button-variant');
      }
      btn.removeAttribute('data-ghost-button');
    });

    if (width) applyWidth(width);
    if (align) applyAlign(align);
  };

  seedFromDemo();
  captureDefaults();
  restore();
  apply();

  const onChange = () => apply();
  themeSelect.addEventListener('change', onChange);
  accentSelect.addEventListener('change', onChange);
  widthSelect?.addEventListener('change', onChange);
  alignSelect?.addEventListener('change', onChange);
  heightSelect?.addEventListener('change', onChange);
  mediaBgSelect?.addEventListener('change', onChange);
  vAlignSelect?.addEventListener('change', onChange);
  resetBtn?.addEventListener('click', () => {
    sessionStorage.removeItem(STORAGE_KEY);
    themeSelect.value = defaults.theme;
    accentSelect.value = defaults.accent;
    if (widthSelect && defaults.width != null) widthSelect.value = defaults.width;
    if (alignSelect && defaults.align != null) alignSelect.value = defaults.align;
    if (heightSelect && defaults.height != null) heightSelect.value = defaults.height;
    if (mediaBgSelect && defaults.mediaBg != null) mediaBgSelect.value = defaults.mediaBg;
    if (vAlignSelect && defaults.vAlign != null) vAlignSelect.value = defaults.vAlign;
    apply();
  });
})();
