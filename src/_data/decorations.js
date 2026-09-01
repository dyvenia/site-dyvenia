/**
 * Decorative brand SVGs for sections (statement, process, text, services).
 * Scans src/assets/svg/brand — excludes header/favicon logos.
 * Values are paths for {% svg %}, e.g. brand/waves.
 */
import fs from 'node:fs';
import path from 'node:path';

const brandDir = path.join(process.cwd(), 'src/assets/svg/brand');

/** Header / favicon / wordmarks — not offered as section decorations */
const EXCLUDE = new Set([
  'logo',
  'logo-line',
  'logo-type',
  'logo-spaced',
  'dyvenia',
  'symbol',
  'symbol-spaced'
]);

const LABELS = {
  'medusa-organic': 'Medusa organic',
  arrow: 'Arrow',
  arrows: 'Arrows'
};

function labelFor(slug) {
  if (LABELS[slug]) return LABELS[slug];
  return slug
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

const names = fs
  .readdirSync(brandDir)
  .filter(file => file.endsWith('.svg'))
  .map(file => file.slice(0, -4))
  .filter(name => !EXCLUDE.has(name))
  .sort((a, b) => a.localeCompare(b));

const options = names.map(name => ({
  label: labelFor(name),
  value: `brand/${name}`
}));

export default {
  /** CMS / styleguide select options */
  options,
  /** Path strings only */
  values: options.map(o => o.value)
};
