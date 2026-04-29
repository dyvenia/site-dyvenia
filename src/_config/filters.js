import {toISOString, formatDate} from './filters/dates.js';
import {markdownFormat, markdownInline} from './filters/markdown-format.js';
import {shuffleArray} from './filters/sort-random.js';
import {sortAlphabetically} from './filters/sort-alphabetic.js';
import {splitlines} from './filters/splitlines.js';
import {striptags} from './filters/striptags.js';
import {slugifyString} from './filters/slugify.js';
import {sortByOrderIndex} from './filters/sort-team-members.js';

export default {
  toISOString,
  formatDate,
  markdownFormat,
  markdownInline,
  splitlines,
  striptags,
  shuffleArray,
  sortAlphabetically,
  slugifyString,
  sortByOrderIndex
};
