/**
 * Stock background images for hero and CTA sections.
 * Scans src/assets/images/backgrounds — label is the file name.
 * Values match frontmatter paths used with {% image %}.
 */
import fs from 'node:fs';
import path from 'node:path';

const backgroundsDir = path.join(process.cwd(), 'src/assets/images/backgrounds');

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;

const files = fs
  .readdirSync(backgroundsDir)
  .filter(file => IMAGE_EXT.test(file))
  .sort((a, b) => a.localeCompare(b));

const options = [
  { label: '— none —', value: '' },
  ...files.map(file => ({
    label: file,
    value: `./src/assets/images/backgrounds/${file}`
  }))
];

export default {
  options,
  values: options.map(o => o.value).filter(Boolean)
};
