// Single source of truth for the site header, mobile menu, footer and the
// SEO AEO tools list. After editing, run `npm run build` to stamp the markup
// into every HTML page, then `npm run check:links` before deploying.
//
// Every internal href must be the final canonical URL that returns 200 on
// Hostinger (no .html, no redirecting trailing slash). Directory indexes such
// as /learn/ keep their trailing slash because Apache redirects /learn to /learn/.

export const SITE_ORIGIN = 'https://harpsdigital.com';

// `match` decides which link is marked active for a given page path.
export const NAV_LINKS = [
  { label: 'Home', href: '/', match: (p) => p === '/' },
  { label: 'Services', href: '/services', match: (p) => p === '/services' },
  { label: 'AEO Leaderboard', href: '/aeo-leaderboard', match: (p) => p === '/aeo-leaderboard' },
  { label: 'SEO AEO Tools', href: '/seo-aeo-tools', match: (p) => p === '/seo-aeo-tools' || p.startsWith('/seo-aeo-tools/') },
  { label: 'Learn', href: '/learn/', match: (p) => p.startsWith('/learn/') },
];

export const CTA = { label: "Let's Talk", href: '/contact', match: (p) => p === '/contact' };

export const FOOTER_LINKS = [
  ...NAV_LINKS,
  CTA,
  { label: 'Newsletter', href: 'https://seoespresso.com', external: true },
];

export const TOOLS_HUB = {
  name: 'Free SEO and AEO Tools',
  path: '/seo-aeo-tools',
};

// Drives the hub page cards and the "More free tools" section on every tool page.
export const TOOLS = [
  {
    name: 'Schema Markup Generator',
    slug: 'schema-markup-generator',
    description: 'Pick a schema type, fill in the fields and copy clean JSON-LD for your page.',
  },
  {
    name: 'Robots.txt Generator',
    slug: 'robots-txt-generator',
    description: 'Build a robots.txt file with presets and per bot controls for AI crawlers.',
  },
  {
    name: 'llms.txt Generator',
    slug: 'llms-txt-generator',
    description: 'Create a valid llms.txt file, with an honest note on what it can and cannot do.',
  },
  {
    name: 'Meta Title and Description Previewer',
    slug: 'meta-title-previewer',
    description: 'Check title and description length in pixels and preview the search snippet.',
  },
  {
    name: 'UTM Builder',
    slug: 'utm-builder',
    description: 'Tag campaign links with clean, consistent UTM parameters, one at a time or in bulk.',
  },
  {
    name: 'Hreflang Generator and Validator',
    slug: 'hreflang-generator',
    description: 'Generate hreflang tags in three formats and validate the ones you already have.',
  },
  {
    name: 'Redirect Map Generator',
    slug: 'redirect-map-generator',
    description: 'Turn old to new URL lists into server rules and test regex redirect patterns.',
  },
];

export const toolPath = (t) => `${TOOLS_HUB.path}/${t.slug}`;
