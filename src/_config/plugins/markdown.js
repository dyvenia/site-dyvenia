import markdownItClass from '@toycode/markdown-it-class';
import markdownIt from 'markdown-it';
import markdownitAbbr from 'markdown-it-abbr';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItAttrs from 'markdown-it-attrs';
import {full as markdownItEmoji} from 'markdown-it-emoji';
import markdownItFootnote from 'markdown-it-footnote';
import markdownItLinkAttributes from 'markdown-it-link-attributes';
import markdownitMark from 'markdown-it-mark';
import markdownItPrism from 'markdown-it-prism';
import markdownItTocDoneRight from 'markdown-it-toc-done-right';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import {optimize} from 'svgo';
import {slugifyString} from '../filters/slugify.js';

let imageIndex = 0;

const isInsideLink = (tokens, idx) => {
  let depth = 0;
  for (let i = idx - 1; i >= 0; i--) {
    if (tokens[i].type === 'link_close') depth++;
    if (tokens[i].type === 'link_open') {
      if (depth === 0) return true;
      depth--;
    }
  }
  return false;
};

const isLinkedImage = (tokens, linkOpenIdx) => {
  const imageToken = tokens[linkOpenIdx + 1];
  const closeToken = tokens[linkOpenIdx + 2];
  return imageToken?.type === 'image' && closeToken?.type === 'link_close';
};

const buildImgTag = (src, alt, attributes) => {
  const attributesString = attributes
    .filter(([key]) => key !== 'src' && key !== 'alt')
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');
  return `<img src="${src}" alt="${alt}"${attributesString ? ` ${attributesString}` : ''}>`;
};

const buildCaption = (text, href) => {
  if (!text) return '';
  if (href) {
    const rel = /^https?:\/\//.test(href) ? ' rel="noopener"' : '';
    return `<figcaption><a href="${href}"${rel}>${text}</a></figcaption>`;
  }
  return `<figcaption>${text}</figcaption>`;
};

const buildFigure = (imgTag, caption, href) =>
  caption ? `<figure>${imgTag}${buildCaption(caption, href)}</figure>` : imgTag;

const buildLightbox = (imgTag, caption, captionHref = null) => {
  imageIndex++;

  return `
          <is-land on:idle>
            <dialog class="flow modal${imageIndex}">
              <button class="button" autofocus>Close</button>
              ${caption ? `<figure>${imgTag}</figure>` : imgTag}
            </dialog>
            ${
              captionHref
                ? `<figure><button data-index="${imageIndex}">${imgTag}</button>${buildCaption(caption, captionHref)}</figure>`
                : `<button data-index="${imageIndex}">${buildFigure(imgTag, caption)}</button>`
            }
          </is-land>
        `;
};

export const markdownLib = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
})
  .disable('code')
  .use(markdownItAttrs)
  .use(markdownItPrism, {
    defaultLanguage: 'plaintext'
  })
  .use(markdownItAnchor, {
    slugify: slugifyString,
    tabIndex: false,
    permalink: markdownItAnchor.permalink.headerLink({
      class: 'heading-anchor'
    })
  })
  .use(markdownItClass, {
    ol: 'list',
    ul: 'list'
  })
  .use(markdownItLinkAttributes, [
    {
      // match external links
      matcher(href) {
        return href.match(/^https?:\/\//);
      },
      attrs: {
        rel: 'noopener'
      }
    }
  ])
  .use(markdownItEmoji)
  .use(markdownItFootnote)
  .use(markdownitMark)
  .use(markdownitAbbr)
  .use(md => {
    md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
      if (isLinkedImage(tokens, idx)) {
        env.suppressLinkedImageAnchor = true;
        return '';
      }
      return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
      if (env.suppressLinkedImageAnchor) {
        env.suppressLinkedImageAnchor = undefined;
        return '';
      }
      return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules.image = (tokens, idx) => {
      const token = tokens[idx];
      let src = token.attrGet('src');
      const alt = token.content || '';
      const caption = token.attrGet('title');
      const linked = isInsideLink(tokens, idx);

      // CMS image paths
      if (src.startsWith('/src/')) {
        src = src.replace(/^\/src\//, '/');
      }

      // SVG separately
      if (path.extname(src).toLowerCase() === '.svg') {
        const svgData = readFileSync(src, 'utf8');
        const {data: optimizedSvg} = optimize(svgData, {
          plugins: [{name: 'removeDimensions', params: {enableViewBox: true}}]
        });

        const svgWithAttrs = alt
          ? optimizedSvg.replace('<svg', `<svg class="svg-image" aria-label="${alt}"`)
          : optimizedSvg.replace('<svg', '<svg class="svg-image" role="presentation" aria-hidden="true"');

        return caption
          ? `<figure class="flow">${svgWithAttrs}<figcaption>${caption}</figcaption></figure>`
          : svgWithAttrs;
      }

      // Collect attributes
      const attributes = token.attrs || [];
      const hasEleventyWidths = attributes.some(([key]) => key === 'eleventy:widths');
      if (!hasEleventyWidths) {
        attributes.push(['eleventy:widths', '960,1600']);
      }

      const imgTag = buildImgTag(src, alt, attributes);
      const captionHref = linked ? tokens[idx - 1].attrGet('href') : null;

      return buildLightbox(imgTag, caption, captionHref);
    };
  })

  .use(markdownItTocDoneRight, {
    placeholder: `{:toc}`,
    slugify: slugifyString,
    containerId: 'toc',
    containerClass: 'table-of-contents prose',
    itemClass: 'flow',
    listType: 'ol'
  });

const originalRender = markdownLib.render.bind(markdownLib);

markdownLib.render = (content, env = {}) => {
  const addToc = env.toc !== false;

  const tocBeforeContent = addToc
    ? `{:toc}\n<span class="visually-hidden" id="toc-skipped"></span><div class="flow prose">\n\n${content} </div>`
    : content;

  return originalRender(tocBeforeContent, env);
};
