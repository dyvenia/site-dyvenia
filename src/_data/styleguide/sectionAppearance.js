/** Shared section appearance options — single source for styleguide + docs.
 *  CMS configs keep the same values (edit both when changing lists).
 *  themeLabels: CMS / fixture display names.
 *  previewByType: which fixture controls to show on each section styleguide page.
 *    width: 'measure' = content|feature; 'full' = content|feature|full; omit = no width
 */
export default {
  themes: ['background-default', 'background-accent', 'gray-dark', 'teal', 'teal-dark', 'purple', 'navy'],
  themeLabels: {
    'background-default': 'Background',
    'background-accent': 'Background accent',
    'gray-dark': 'gray-dark',
    teal: 'teal',
    'teal-dark': 'teal-dark',
    purple: 'purple',
    navy: 'navy'
  },
  accents: ['default', 'neutral', 'teal', 'purple', 'navy'],
  decorationAccents: ['teal', 'purple', 'navy', 'neutral'],
  widths: ['content', 'feature', 'full'],
  widthsMeasure: ['content', 'feature'],
  widthsFeature: ['content', 'feature', 'full'],
  mediaSides: ['left', 'right', 'bottom'],
  aligns: ['left', 'center'],
  textBodySizes: ['default', 'large'],
  textTitleSizes: ['default', 'small'],
  statementBodySizes: ['default', 'small'],
  listVariants: ['definition', 'stack'],
  listBooleans: ['on', 'off'],
  heroHeights: ['default', 'tall', 'cover'],
  heroBackgrounds: [
    'teal-800',
    'teal-600',
    'purple-800',
    'navy-dark',
    'navy',
    'gray-900',
    'gray-800',
    'gray-200',
    'gray-100',
    'white'
  ],
  verticalAligns: ['top', 'center', 'bottom'],
  previewByType: {
    hero: {
      align: true,
      height: true,
      background: true,
      content_block: true,
      preset_image: true
    },
    text: {
      align: true,
      width: 'measure',
      title_size: true,
      body_size: true,
      decoration: true
    },
    statement: {
      align: true,
      width: 'measure',
      decoration: true,
      body_size: 'statement'
    },
    list: {
      align: true,
      width: 'measure',
      list_variant: true,
      list_checks: true,
      list_bordered: true
    },
    process: {
      decoration: true,
      decoration_accent: true
    },
    feature: {
      width: 'feature',
      media_side: true
    },
    accordion: {
      align: true,
      width: 'measure'
    },
    posts: {
      align: true,
      width: 'full'
    },
    team: {},
    form: {
      align: true,
      width: 'full'
    },
    services: {
      align: true,
      decoration: true
    },
    tabs: {
      align: true,
      width: 'full'
    },
    cases: {
      align: true,
      width: 'full'
    },
    gallery: {
      align: true,
      width: 'measure'
    },
    cta: {
      align: true,
      background: true,
      preset_image: true
    }
  }
};
