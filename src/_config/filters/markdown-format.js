// by Chris Burnell: https://chrisburnell.com/article/some-eleventy-filters/#markdown-format

import markdownParser from 'markdown-it';

const markdown = markdownParser();

export const markdownFormat = string => {
  if (string == null || string === '') return '';
  return markdown.render(String(string));
};

export const markdownInline = string => {
  if (string == null || string === '') return '';
  return markdown.renderInline(String(string));
};
