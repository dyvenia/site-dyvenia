import {slugifyString} from './filters/slugify.js';

/** ------------------------ regular post collections ------------------------ */
export const getAllPosts = collection => {
  return collection.getFilteredByGlob('./src/posts/**/*.md').reverse();
};

export const getAllCaseStudies = collection => {
  return collection.getFilteredByGlob('./src/case_studies/**/*.md').reverse();
};

/** ------------------------ tags ------------------------ */
const EXCLUDED_TAGS = ['posts', 'case-studies', 'all', 'pages', 'team_members'];

/** Prefer labels with more title-cased words; keep first seen on tie. */
const titleCaseScore = label => label.split(/\s+/).filter(word => /^[A-Z]/.test(word)).length;

const pickCanonicalLabel = (current, candidate) => {
  if (!current) return candidate;
  const currentScore = titleCaseScore(current);
  const candidateScore = titleCaseScore(candidate);
  return candidateScore > currentScore ? candidate : current;
};

export const collectCanonicalTags = collection => {
  const tagsBySlug = new Map();

  collection.getAll().forEach(item => {
    if (!item.data.tags) return;
    item.data.tags
      .filter(tag => !EXCLUDED_TAGS.includes(tag))
      .forEach(tag => {
        const slug = slugifyString(tag);
        tagsBySlug.set(slug, pickCanonicalLabel(tagsBySlug.get(slug), tag));
      });
  });

  return Array.from(tagsBySlug.values()).sort();
};

/** canonical tags with their posts */
export const tagPages = collection => {
  const allPosts = collection.getFilteredByGlob('./src/posts/**/*.md').reverse();

  return collectCanonicalTags(collection).map(tag => ({
    tag,
    posts: allPosts.filter(item => item.data.tags?.some(t => slugifyString(t) === slugifyString(tag)))
  }));
};

/** All tags from all posts as a collection, excluding custom collections */
export const tagList = collection => collectCanonicalTags(collection);

/** ------------------------ sitemap ------------------------ */
export const sitemapPages = collection => {
  const pages = collection
    .getFilteredByGlob('./src/**/*.{md,njk}')
    .filter(page => page.data?.excludeFromSitemap !== true);

  const tagItems = collectCanonicalTags(collection).map(tag => ({
    url: `/tags/${slugifyString(tag)}/`,
    date: new Date(),
    data: {changeFreq: 'monthly'}
  }));

  return [...pages, ...tagItems];
};
