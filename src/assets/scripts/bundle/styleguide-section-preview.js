(() => {
  const STORAGE_KEY = 'sg-section-fixtures';
  const demos = document.querySelector('[data-sg-demos]');
  const themeSelect = document.querySelector('[data-sg-theme]');
  const accentSelect = document.querySelector('[data-sg-accent]');
  const widthSelect = document.querySelector('[data-sg-width]');
  const alignSelect = document.querySelector('[data-sg-align]');
  const bodySizeSelect = document.querySelector('[data-sg-body-size]');
  const titleSizeSelect = document.querySelector('[data-sg-title-size]');
  const heightSelect = document.querySelector('[data-sg-height]');
  const mediaBgSelect = document.querySelector('[data-sg-media-bg]');
  const presetImageSelect = document.querySelector('[data-sg-preset-image]');
  const presetBank = document.querySelector('[data-sg-preset-bank]');
  const dividerSelect = document.querySelector('[data-sg-divider]');
  const dividerTopSelect = document.querySelector('[data-sg-divider-top]');
  const dividerSizeSelect = document.querySelector('[data-sg-divider-size]');
  const dividerBank = document.querySelector('[data-sg-divider-bank]');
  const vAlignSelect = document.querySelector('[data-sg-valign]');
  const decorationSelect = document.querySelector('[data-sg-decoration]');
  const decorationAccentSelect = document.querySelector('[data-sg-decoration-accent]');
  const mediaSideSelect = document.querySelector('[data-sg-media-side]');
  const decorationBank = document.querySelector('[data-sg-deco-bank]');
  const listVariantSelect = document.querySelector('[data-sg-list-variant]');
  const listChecksSelect = document.querySelector('[data-sg-list-checks]');
  const listBorderedSelect = document.querySelector('[data-sg-list-bordered]');
  const listHighlightSelect = document.querySelector('[data-sg-list-highlight]');
  const listCheckBank = document.querySelector('[data-sg-list-check-bank]');
  const resetBtn = document.querySelector('[data-sg-reset]');

  if (!themeSelect || !accentSelect) return;

  const WIDTH_CLASSES = ['content', 'feature', 'full'];
  const ALIGN_CLASSES = ['text-center'];
  const BODY_SIZE_CLASSES = ['text-step-0', 'text-step-1'];
  const TITLE_SIZE_CLASS = 'text-step-2';

  const DECORATION_SLOTS = [
    {
      root: '.section-text',
      selector: '.section-text__decoration',
      className: 'section-text__decoration',
      mount(root, svg) {
        const section = root.querySelector('.section');
        const inner = section?.querySelector('.section__inner');
        if (!section) return;
        if (inner) section.insertBefore(svg, inner);
        else section.prepend(svg);
      }
    },
    {
      root: '.section-statement',
      selector: '.section-statement__decoration',
      className: 'section-statement__decoration',
      mount(root, svg) {
        root.querySelector('.section__inner')?.append(svg);
      }
    },
    {
      root: '.section-process',
      selector: '.section-process__decoration',
      className: 'section-process__decoration',
      mount(root, svg) {
        const split = root.querySelector('.section-process__split');
        if (!split) return;
        const timeline = split.querySelector('.section-process__timeline');
        if (timeline) split.insertBefore(svg, timeline);
        else split.prepend(svg);
      }
    },
    {
      root: '.section-services',
      selector: '.section-services__decoration',
      className: 'section-services__decoration',
      mount(root, svg) {
        const section = root.querySelector('.section');
        const inner = section?.querySelector('.section__inner');
        if (!section) return;
        if (inner) section.insertBefore(svg, inner);
        else section.prepend(svg);
      }
    }
  ];

  const cloneDecoration = value => {
    if (!decorationBank || !value) return null;
    const tpl = [...decorationBank.querySelectorAll('template')].find(
      t => t.getAttribute('data-value') === value
    );
    if (!tpl) return null;
    return tpl.content.firstElementChild?.cloneNode(true) || null;
  };

  const applyDecoration = value => {
    if (!demos || !decorationSelect) return;

    DECORATION_SLOTS.forEach(slot => {
      demos.querySelectorAll(slot.root).forEach(root => {
        root.querySelectorAll(slot.selector).forEach(el => el.remove());
        if (!value) {
          root.removeAttribute('data-decoration');
          return;
        }
        const svg = cloneDecoration(value);
        if (!svg) return;
        if (slot.className) svg.classList.add(slot.className);
        svg.setAttribute('aria-hidden', 'true');
        slot.mount(root, svg);
        root.setAttribute('data-decoration', value);
      });
    });
  };

  const applyDecorationAccent = value => {
    if (!demos || !decorationAccentSelect) return;
    demos.querySelectorAll('.section-process').forEach(root => {
      if (value) root.setAttribute('data-section-decoration', value);
      else root.removeAttribute('data-section-decoration');
    });
  };

  const clonePresetPicture = value => {
    if (!presetBank || !value) return null;
    const tpl = [...presetBank.querySelectorAll('template')].find(
      t => t.getAttribute('data-value') === value
    );
    if (!tpl) return null;
    return tpl.content.firstElementChild?.cloneNode(true) || null;
  };

  const mediaRoots = () => {
    if (!demos) return [];
    return demos.querySelectorAll('.custom-hero, .section-cta.page-header, .page-header');
  };

  const applyPresetImage = value => {
    if (!demos || !presetImageSelect) return;
    mediaRoots().forEach(root => {
      if (root.getAttribute('data-hero-media') === 'video') return;
      const oldPic = root.querySelector(':scope > picture');
      if (!value) {
        oldPic?.remove();
        if (root.classList.contains('custom-hero')) {
          root.setAttribute('data-hero-media', 'none');
        } else {
          root.removeAttribute('data-hero-background');
        }
        return;
      }
      const clone = clonePresetPicture(value);
      if (!clone) return;
      if (oldPic) oldPic.replaceWith(clone);
      else {
        const sep = root.querySelector(':scope > .seperator, :scope > .svg-divider, :scope > svg.seperator');
        if (sep) sep.after(clone);
        else root.prepend(clone);
      }
      if (root.classList.contains('custom-hero')) {
        root.setAttribute('data-hero-media', 'image');
      }
      const bg = mediaBgSelect?.value || root.getAttribute('data-hero-background') || 'teal-800';
      root.setAttribute('data-hero-background', bg);
    });
  };

  const applyMediaBackground = value => {
    if (!demos || !mediaBgSelect || !value) return;
    mediaRoots().forEach(el => {
      const hasMedia = el.classList.contains('custom-hero') || el.querySelector(':scope > picture');
      if (!hasMedia) return;
      el.setAttribute('data-hero-background', value);
    });
  };

  const cloneDividerSvg = value => {
    if (!dividerBank || !value) return null;
    const tpl = [...dividerBank.querySelectorAll('template')].find(
      t => t.getAttribute('data-value') === value
    );
    if (!tpl) return null;
    const svg = tpl.content.firstElementChild?.cloneNode(true);
    if (!svg) return null;
    svg.setAttribute('aria-hidden', 'true');
    return svg;
  };

  const applyDividers = () => {
    if (!demos || (!dividerSelect && !dividerTopSelect)) return;
    const sizeClass = dividerSizeSelect?.value || '';

    demos.querySelectorAll('.custom-hero').forEach(root => {
      if (!dividerSelect) return;
      root.querySelectorAll(':scope > .seperator').forEach(el => el.remove());
      const value = dividerSelect.value || '';
      if (!value) return;
      const svg = cloneDividerSvg(value);
      if (!svg) return;
      svg.classList.add('seperator');
      if (sizeClass) svg.classList.add(sizeClass);
      root.prepend(svg);
    });

    demos.querySelectorAll('.section-cta.page-header, .page-header.section-cta').forEach(root => {
      root.querySelectorAll(':scope > .seperator').forEach(el => el.remove());
      const topVal = dividerTopSelect?.value || '';
      const bottomVal = dividerSelect?.value || '';
      if (topVal) {
        const svg = cloneDividerSvg(topVal);
        if (svg) {
          svg.classList.add('seperator', 'seperator--top');
          if (sizeClass) svg.classList.add(sizeClass);
          root.prepend(svg);
        }
      }
      if (bottomVal) {
        const svg = cloneDividerSvg(bottomVal);
        if (svg) {
          svg.classList.add('seperator', 'seperator--bottom');
          if (sizeClass) svg.classList.add(sizeClass);
          root.append(svg);
        }
      }
    });
  };

  const applyFeatureAppearance = () => {
    if (!demos) return;
    const root = demos.querySelector('.section-feature');
    if (!root) return;
    if (mediaSideSelect) {
      root.setAttribute('data-media-side', mediaSideSelect.value || 'right');
    }
    if (widthSelect) {
      const width = widthSelect.value === 'full' ? 'full' : 'feature';
      root.setAttribute('data-feature-width', width);
      // Live full/feature toggle needs a rebuild; attribute alone only styles full markup.
      // When demo was rendered as feature, flipping to full won't create breakout children.
      // Prefer attribute-driven CSS for feature grid order; for width, reload-like rebuild:
      const section = root.querySelector('.full.wrapper.section');
      if (!section) return;
      const copy = root.querySelector('.section-feature__copy');
      const media = root.querySelector('.section-feature__media');
      if (!copy || !media) return;

      if (width === 'full') {
        const inner = root.querySelector('.section__inner');
        const grid = root.querySelector('.section-feature__grid');
        if (grid) {
          section.append(copy, media);
          inner?.remove();
        }
      } else {
        let inner = root.querySelector('.section__inner');
        let grid = root.querySelector('.section-feature__grid');
        if (!grid) {
          inner = document.createElement('div');
          inner.className = 'feature | section__inner region';
          grid = document.createElement('div');
          grid.className = 'section-feature__grid';
          grid.append(copy, media);
          inner.append(grid);
          section.append(inner);
        }
      }
    }
  };

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
      const block = hero.getAttribute('data-hero-content-block');
      const inline = hero.getAttribute('data-hero-content-inline');
      if (heightSelect && h) heightSelect.value = h;
      if (mediaBgSelect && bg) mediaBgSelect.value = bg;
      if (vAlignSelect && block) vAlignSelect.value = block;
      if (inline && alignSelect && [...alignSelect.options].some(o => o.value === inline)) {
        alignSelect.value = inline;
      }
    }
    const cta = demos.querySelector('.section-cta, .page-header');
    if (cta && mediaBgSelect) {
      const bg = cta.getAttribute('data-hero-background');
      if (bg && [...mediaBgSelect.options].some(o => o.value === bg)) {
        mediaBgSelect.value = bg;
      }
    }
    if (presetImageSelect) {
      const pic =
        demos.querySelector(
          '.custom-hero > picture img, .section-cta > picture img, .page-header > picture img'
        ) || demos.querySelector('.custom-hero img, .section-cta img, .page-header img');
      // Match option by filename in generated src (name-650w.jpeg → jellyfish-hr)
      const src = pic?.getAttribute('src') || '';
      const match = [...presetImageSelect.options].find(o => {
        if (!o.value) return false;
        const base = o.value
          .split('/')
          .pop()
          ?.replace(/\.[^.]+$/, '');
        return base && src.includes(base);
      });
      if (match) presetImageSelect.value = match.value;
      else if (
        demos.querySelector('.custom-hero, .section-cta, .page-header')?.querySelector(':scope > picture')
      ) {
        /* keep first non-empty if we can't match */
      } else {
        presetImageSelect.value = '';
      }
    }
    const inner = demos.querySelector('.section__inner');
    if (inner && widthSelect) {
      const w = WIDTH_CLASSES.find(c => inner.classList.contains(c));
      if (w && [...widthSelect.options].some(o => o.value === w)) widthSelect.value = w;
    }
    const body = demos.querySelector('.section-text .text-step-1, .section-text .text-step-0');
    if (body && bodySizeSelect && [...bodySizeSelect.options].some(o => o.value === 'large')) {
      bodySizeSelect.value = body.classList.contains('text-step-1') ? 'large' : 'default';
    }
    const support = demos.querySelector('.section-statement__support');
    if (support && bodySizeSelect && [...bodySizeSelect.options].some(o => o.value === 'small')) {
      bodySizeSelect.value = support.classList.contains('text-step-min-1') ? 'small' : 'default';
    }
    const title = demos.querySelector('.section-text h2');
    if (title && titleSizeSelect) {
      titleSizeSelect.value = title.classList.contains(TITLE_SIZE_CLASS) ? 'small' : 'default';
    }
    const btn = demos.querySelector('.button:not([data-small-button]):not([data-pill-button])');
    const variant =
      demos.querySelector('[data-section-accent]')?.getAttribute('data-section-accent') ||
      btn?.getAttribute('data-button-variant');
    if (variant && accentSelect && [...accentSelect.options].some(o => o.value === variant)) {
      accentSelect.value = variant;
    }
    if (decorationSelect) {
      const deco = demos.querySelector('[data-decoration]')?.getAttribute('data-decoration') || '';
      if (!deco || [...decorationSelect.options].some(o => o.value === deco)) {
        decorationSelect.value = deco;
      }
    }
    if (decorationAccentSelect) {
      const decoAccent =
        demos.querySelector('.section-process')?.getAttribute('data-section-decoration') || 'teal';
      if ([...decorationAccentSelect.options].some(o => o.value === decoAccent)) {
        decorationAccentSelect.value = decoAccent;
      }
    }
    const featureRoot = demos.querySelector('.section-feature');
    if (featureRoot) {
      const side = featureRoot.getAttribute('data-media-side');
      if (mediaSideSelect && side && [...mediaSideSelect.options].some(o => o.value === side)) {
        mediaSideSelect.value = side;
      }
      const fw = featureRoot.getAttribute('data-feature-width');
      if (widthSelect && fw && [...widthSelect.options].some(o => o.value === fw)) {
        widthSelect.value = fw;
      }
    }
    const listRoot = demos.querySelector('.section-list');
    if (listRoot) {
      const lv = listRoot.getAttribute('data-list-variant');
      if (listVariantSelect && lv && [...listVariantSelect.options].some(o => o.value === lv)) {
        listVariantSelect.value = lv;
      }
      if (listChecksSelect) {
        listChecksSelect.value = listRoot.getAttribute('data-list-checks') === 'false' ? 'off' : 'on';
      }
      if (listBorderedSelect) {
        listBorderedSelect.value = listRoot.getAttribute('data-list-bordered') === 'false' ? 'off' : 'on';
      }
      if (listHighlightSelect) {
        listHighlightSelect.value =
          listRoot.getAttribute('data-list-highlight-header') === 'true' ? 'on' : 'off';
      }
    }
  };

  const defaults = {};
  const captureDefaults = () => {
    defaults.theme = themeSelect.value;
    defaults.accent = accentSelect.value;
    if (widthSelect) defaults.width = widthSelect.value;
    if (alignSelect) defaults.align = alignSelect.value;
    if (bodySizeSelect) defaults.bodySize = bodySizeSelect.value;
    if (titleSizeSelect) defaults.titleSize = titleSizeSelect.value;
    if (heightSelect) defaults.height = heightSelect.value;
    if (mediaBgSelect) defaults.mediaBg = mediaBgSelect.value;
    if (presetImageSelect) defaults.presetImage = presetImageSelect.value;
    if (dividerSelect) defaults.divider = dividerSelect.value;
    if (dividerTopSelect) defaults.dividerTop = dividerTopSelect.value;
    if (dividerSizeSelect) defaults.dividerSize = dividerSizeSelect.value;
    if (vAlignSelect) defaults.vAlign = vAlignSelect.value;
    if (decorationSelect) defaults.decoration = decorationSelect.value;
    if (decorationAccentSelect) defaults.decorationAccent = decorationAccentSelect.value;
    if (mediaSideSelect) defaults.mediaSide = mediaSideSelect.value;
    if (listVariantSelect) defaults.listVariant = listVariantSelect.value;
    if (listChecksSelect) defaults.listChecks = listChecksSelect.value;
    if (listBorderedSelect) defaults.listBordered = listBorderedSelect.value;
    if (listHighlightSelect) defaults.listHighlight = listHighlightSelect.value;
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
    bodySize: bodySizeSelect?.value,
    titleSize: titleSizeSelect?.value,
    height: heightSelect?.value,
    mediaBg: mediaBgSelect?.value,
    presetImage: presetImageSelect?.value,
    divider: dividerSelect?.value,
    dividerTop: dividerTopSelect?.value,
    dividerSize: dividerSizeSelect?.value,
    vAlign: vAlignSelect?.value,
    decoration: decorationSelect?.value,
    decorationAccent: decorationAccentSelect?.value,
    mediaSide: mediaSideSelect?.value,
    listVariant: listVariantSelect?.value,
    listChecks: listChecksSelect?.value,
    listBordered: listBorderedSelect?.value,
    listHighlight: listHighlightSelect?.value
  });

  const writeStored = state => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  };

  const restore = () => {
    const stored = readStored();
    if (stored.theme) themeSelect.value = stored.theme;
    if (stored.accent) accentSelect.value = stored.accent;
    if (stored.width && widthSelect && [...widthSelect.options].some(o => o.value === stored.width)) {
      widthSelect.value = stored.width;
    }
    if (stored.align && alignSelect) alignSelect.value = stored.align;
    if (
      stored.bodySize &&
      bodySizeSelect &&
      [...bodySizeSelect.options].some(o => o.value === stored.bodySize)
    ) {
      bodySizeSelect.value = stored.bodySize;
    }
    if (stored.titleSize && titleSizeSelect) titleSizeSelect.value = stored.titleSize;
    if (stored.height && heightSelect) heightSelect.value = stored.height;
    if (stored.mediaBg && mediaBgSelect) mediaBgSelect.value = stored.mediaBg;
    if (
      stored.presetImage != null &&
      presetImageSelect &&
      [...presetImageSelect.options].some(o => o.value === stored.presetImage)
    ) {
      presetImageSelect.value = stored.presetImage;
    }
    if (
      stored.divider != null &&
      dividerSelect &&
      [...dividerSelect.options].some(o => o.value === stored.divider)
    ) {
      dividerSelect.value = stored.divider;
    }
    if (
      stored.dividerTop != null &&
      dividerTopSelect &&
      [...dividerTopSelect.options].some(o => o.value === stored.dividerTop)
    ) {
      dividerTopSelect.value = stored.dividerTop;
    }
    if (
      stored.dividerSize != null &&
      dividerSizeSelect &&
      [...dividerSizeSelect.options].some(o => o.value === stored.dividerSize)
    ) {
      dividerSizeSelect.value = stored.dividerSize;
    }
    if (stored.vAlign && vAlignSelect) vAlignSelect.value = stored.vAlign;
    if (
      stored.decoration != null &&
      decorationSelect &&
      [...decorationSelect.options].some(o => o.value === stored.decoration)
    ) {
      decorationSelect.value = stored.decoration;
    }
    if (
      stored.decorationAccent &&
      decorationAccentSelect &&
      [...decorationAccentSelect.options].some(o => o.value === stored.decorationAccent)
    ) {
      decorationAccentSelect.value = stored.decorationAccent;
    }
    if (
      stored.mediaSide &&
      mediaSideSelect &&
      [...mediaSideSelect.options].some(o => o.value === stored.mediaSide)
    ) {
      mediaSideSelect.value = stored.mediaSide;
    }
    if (
      stored.listVariant &&
      listVariantSelect &&
      [...listVariantSelect.options].some(o => o.value === stored.listVariant)
    ) {
      listVariantSelect.value = stored.listVariant;
    }
    if (stored.listChecks && listChecksSelect) listChecksSelect.value = stored.listChecks;
    if (stored.listBordered && listBorderedSelect) listBorderedSelect.value = stored.listBordered;
    if (stored.listHighlight && listHighlightSelect) listHighlightSelect.value = stored.listHighlight;
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

  const applyTextAlign = align => {
    if (!demos) return;
    demos
      .querySelectorAll('.section-text .section-text__title, .section-text .section-text__content')
      .forEach(el => {
        el.classList.remove(...ALIGN_CLASSES);
        if (align === 'center') el.classList.add('text-center');
      });
  };

  const applyAlign = align => {
    if (!demos || !align) return;
    const targets = demos.querySelectorAll(
      '.section__inner, .section__inner .prose, .section__inner header, .section-form__header, .custom-hero .wrapper, .section-cta .wrapper'
    );
    targets.forEach(el => {
      if (el.classList.contains('section__inner') && el.closest('.section-form')) {
        el.classList.remove(...ALIGN_CLASSES);
        return;
      }
      if (el.closest('.section-text')) {
        el.classList.remove(...ALIGN_CLASSES);
        return;
      }
      el.classList.remove(...ALIGN_CLASSES);
      if (align === 'center') el.classList.add('text-center');
    });
    applyTextAlign(align);
    demos.querySelectorAll('.custom-hero').forEach(el => {
      el.setAttribute('data-hero-content-inline', align || 'left');
    });
  };

  const applyBodySize = size => {
    if (!demos || !bodySizeSelect) return;
    if ([...bodySizeSelect.options].some(o => o.value === 'large')) {
      const cls = size === 'large' ? 'text-step-1' : 'text-step-0';
      demos.querySelectorAll('.section-text .text-step-0, .section-text .text-step-1').forEach(el => {
        el.classList.remove(...BODY_SIZE_CLASSES);
        el.classList.add(cls);
      });
    }
    demos.querySelectorAll('.section-statement__support').forEach(el => {
      el.classList.toggle('text-step-min-1', size === 'small');
    });
  };

  const applyTitleSize = size => {
    if (!demos || !titleSizeSelect) return;
    demos.querySelectorAll('.section-text h2').forEach(el => {
      el.classList.toggle(TITLE_SIZE_CLASS, size === 'small');
    });
  };

  const readListItems = listRoot => {
    const items = [];
    listRoot.querySelectorAll('.section-list__item').forEach(li => {
      const title = li.querySelector('.section-list__item-title')?.textContent?.trim() || '';
      const content = li.querySelector('.section-list__item-content')?.textContent?.trim() || '';
      if (title || content) items.push({title, content});
    });
    return items;
  };

  const cloneListCheck = () => {
    const tpl = listCheckBank?.querySelector('template');
    return tpl?.content.firstElementChild?.cloneNode(true) || null;
  };

  const applyListAppearance = () => {
    if (!demos || (!listVariantSelect && !listChecksSelect && !listBorderedSelect)) return;
    const listRoot = demos.querySelector('.section-list');
    if (!listRoot) return;

    let variant = listVariantSelect?.value || listRoot.getAttribute('data-list-variant') || 'definition';
    if (variant === 'checklist') variant = 'stack';
    const checksOn = (listChecksSelect?.value || 'on') === 'on';
    const borderedOn = (listBorderedSelect?.value || 'on') === 'on';
    const items = readListItems(listRoot);
    if (!items.length) return;

    const inner = listRoot.querySelector('.section__inner');
    if (!inner) return;
    inner.querySelectorAll('.section-list__items').forEach(el => el.remove());

    listRoot.setAttribute('data-list-variant', variant);
    listRoot.setAttribute('data-list-checks', checksOn ? 'true' : 'false');
    listRoot.setAttribute('data-list-bordered', borderedOn ? 'true' : 'false');

    const appendItemBody = (parent, item, asDefinition) => {
      const body = document.createElement('div');
      body.className = 'section-list__item-body | flow flow-space-3xs';
      if (item.title) {
        const title = document.createElement(asDefinition ? 'dt' : 'span');
        title.className = 'section-list__item-title';
        title.textContent = item.title;
        body.append(title);
      }
      if (item.content) {
        const content = document.createElement(asDefinition ? 'dd' : 'div');
        content.className = 'section-list__item-content';
        content.textContent = item.content;
        body.append(content);
      }
      parent.append(body);
    };

    if (variant === 'stack') {
      const ul = document.createElement('ul');
      ul.className = 'section-list__items | grid mt-l';
      ul.setAttribute('data-layout', '50-50');
      ul.setAttribute('role', 'list');
      items.forEach(item => {
        const li = document.createElement('li');
        li.className = `section-list__item${borderedOn ? ' section-list__item--bordered' : ''}`;
        if (checksOn) {
          const check = cloneListCheck();
          if (check) li.append(check);
        }
        appendItemBody(li, item, false);
        ul.append(li);
      });
      inner.append(ul);
    } else {
      const dl = document.createElement('dl');
      dl.className = 'section-list__items section-list__definition | grid mt-l';
      dl.setAttribute('data-layout', '50-50');
      items.forEach(item => {
        const row = document.createElement('div');
        row.className = `section-list__item${borderedOn ? ' section-list__item--bordered' : ''}`;
        if (checksOn) {
          const check = cloneListCheck();
          if (check) row.append(check);
        }
        appendItemBody(row, item, true);
        dl.append(row);
      });
      inner.append(dl);
    }

    if (listChecksSelect) listChecksSelect.disabled = false;
    if (listBorderedSelect) listBorderedSelect.disabled = false;
  };

  const applyListHighlightHeader = () => {
    if (!demos) return;
    const listRoot = demos.querySelector('.section-list');
    if (!listRoot) return;
    const header = listRoot.querySelector('.section-list__header');
    const h2 = header?.querySelector('h2');
    const on =
      listHighlightSelect?.value === 'on' ||
      (!listHighlightSelect && listRoot.getAttribute('data-list-highlight-header') === 'true');
    listRoot.setAttribute('data-list-highlight-header', on ? 'true' : 'false');
    header?.classList.toggle('section-list__header--highlight', on);
    h2?.classList.toggle('heading-line', on);
  };

  const apply = () => {
    const theme = themeSelect.value;
    const accent = accentSelect.value;
    const width = widthSelect?.value;
    const align = alignSelect?.value;
    const bodySize = bodySizeSelect?.value;
    const titleSize = titleSizeSelect?.value;
    const height = heightSelect?.value;
    const mediaBg = mediaBgSelect?.value;
    const presetImage = presetImageSelect?.value;
    const vAlign = vAlignSelect?.value;
    const decoration = decorationSelect?.value;
    const decorationAccent = decorationAccentSelect?.value;

    writeStored(currentState());
    if (!demos) return;

    demos.dataset.previewTheme = theme;
    demos.dataset.previewAccent = accent;

    sectionRoots().forEach(el => {
      el.setAttribute('data-section-theme', theme || 'background-default');
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
      el.setAttribute('data-section-theme', theme || 'background-default');
      if (height) el.setAttribute('data-hero-height', height);
      if (vAlign) el.setAttribute('data-hero-content-block', vAlign);
    });

    if (presetImageSelect) applyPresetImage(presetImage || '');
    applyMediaBackground(mediaBg);
    applyDividers();

    demos.querySelectorAll('.button:not([data-small-button]):not([data-pill-button])').forEach(btn => {
      if (accent && accent !== 'default') {
        btn.setAttribute('data-button-variant', accent);
      } else {
        btn.removeAttribute('data-button-variant');
      }
      btn.removeAttribute('data-ghost-button');
    });

    if (width) {
      if (demos.querySelector('.section-feature')) {
        applyFeatureAppearance();
      } else {
        applyWidth(width);
      }
    } else if (mediaSideSelect && demos.querySelector('.section-feature')) {
      applyFeatureAppearance();
    }
    if (align) applyAlign(align);
    if (bodySize) applyBodySize(bodySize);
    if (titleSize) applyTitleSize(titleSize);
    if (decorationSelect) applyDecoration(decoration || '');
    if (decorationAccentSelect) applyDecorationAccent(decorationAccent || 'teal');
    applyListAppearance();
    applyListHighlightHeader();
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
  bodySizeSelect?.addEventListener('change', onChange);
  titleSizeSelect?.addEventListener('change', onChange);
  heightSelect?.addEventListener('change', onChange);
  mediaBgSelect?.addEventListener('change', onChange);
  presetImageSelect?.addEventListener('change', onChange);
  dividerSelect?.addEventListener('change', onChange);
  dividerTopSelect?.addEventListener('change', onChange);
  dividerSizeSelect?.addEventListener('change', onChange);
  vAlignSelect?.addEventListener('change', onChange);
  decorationSelect?.addEventListener('change', onChange);
  decorationAccentSelect?.addEventListener('change', onChange);
  mediaSideSelect?.addEventListener('change', onChange);
  listVariantSelect?.addEventListener('change', onChange);
  listChecksSelect?.addEventListener('change', onChange);
  listBorderedSelect?.addEventListener('change', onChange);
  listHighlightSelect?.addEventListener('change', onChange);
  resetBtn?.addEventListener('click', () => {
    sessionStorage.removeItem(STORAGE_KEY);
    themeSelect.value = defaults.theme;
    accentSelect.value = defaults.accent;
    if (widthSelect && defaults.width != null) widthSelect.value = defaults.width;
    if (alignSelect && defaults.align != null) alignSelect.value = defaults.align;
    if (bodySizeSelect && defaults.bodySize != null) bodySizeSelect.value = defaults.bodySize;
    if (titleSizeSelect && defaults.titleSize != null) titleSizeSelect.value = defaults.titleSize;
    if (heightSelect && defaults.height != null) heightSelect.value = defaults.height;
    if (mediaBgSelect && defaults.mediaBg != null) mediaBgSelect.value = defaults.mediaBg;
    if (presetImageSelect && defaults.presetImage != null) {
      presetImageSelect.value = defaults.presetImage;
    }
    if (dividerSelect && defaults.divider != null) dividerSelect.value = defaults.divider;
    if (dividerTopSelect && defaults.dividerTop != null) {
      dividerTopSelect.value = defaults.dividerTop;
    }
    if (dividerSizeSelect && defaults.dividerSize != null) {
      dividerSizeSelect.value = defaults.dividerSize;
    }
    if (vAlignSelect && defaults.vAlign != null) vAlignSelect.value = defaults.vAlign;
    if (decorationSelect && defaults.decoration != null) decorationSelect.value = defaults.decoration;
    if (decorationAccentSelect && defaults.decorationAccent != null) {
      decorationAccentSelect.value = defaults.decorationAccent;
    }
    if (mediaSideSelect && defaults.mediaSide != null) mediaSideSelect.value = defaults.mediaSide;
    if (listVariantSelect && defaults.listVariant != null) listVariantSelect.value = defaults.listVariant;
    if (listChecksSelect && defaults.listChecks != null) listChecksSelect.value = defaults.listChecks;
    if (listBorderedSelect && defaults.listBordered != null) {
      listBorderedSelect.value = defaults.listBordered;
    }
    if (listHighlightSelect && defaults.listHighlight != null) {
      listHighlightSelect.value = defaults.listHighlight;
    }
    apply();
  });
})();
