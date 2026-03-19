// Eleventy
import { EleventyHtmlBasePlugin, EleventyRenderPlugin } from '@11ty/eleventy';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import rss from '@11ty/eleventy-plugin-rss';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import webc from '@11ty/eleventy-plugin-webc';

// custom
import { drafts } from './plugins/drafts.js';
import { markdownLib } from './plugins/markdown.js';

// Custom transforms
import { htmlConfig } from './plugins/html-config.js';
export default {
  EleventyRenderPlugin,
  EleventyHtmlBasePlugin,
  rss,
  syntaxHighlight,
  webc,
  eleventyImageTransformPlugin,
  markdownLib,
  drafts,
  htmlConfig
};
