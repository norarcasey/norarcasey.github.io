import { blogIndexUrl, blogUrl, type BlogSummary } from "./blog";
import { HEADLINE_TITLE } from "./resume";
import {
  SITE_NAME,
  SITE_ROUTES,
  SITE_URL,
  canonicalUrl,
  type SiteRoutePath,
} from "./siteRoutes";

// JSON-LD for each page, baked into the served HTML by the prerender. Meta
// tags say how a page should be displayed; this says what it is and how the
// pages relate, which is what a search engine builds an entity out of: one
// person, who authored these applications, reachable at these profiles.
//
// Kept to types and properties the pages actually back up. Nothing here claims
// a rating, a price, or a download count the site cannot show.

/** Stable id for the person the whole site is about, so every page's author
 *  and creator point at one node rather than repeating a copy of it. */
const PERSON_ID = `${SITE_URL}/#nora`;

const PROFILES = [
  "https://github.com/norarcasey",
  "https://www.linkedin.com/in/nora-casey/",
  "https://www.npmjs.com/org/norarcasey",
];

/** The npm-published game components, which are software in their own right. */
const NPM_PACKAGES: Partial<Record<SiteRoutePath, string>> = {
  "/mine-sweeper": "@norarcasey/mine-sweeper",
  "/tic-tac-nora": "@norarcasey/tic-tac-nora",
  "/space-invaders": "@norarcasey/star-siege-nora",
  "/pianora": "@norarcasey/pianora",
  "/anoraconda": "@norarcasey/anoraconda",
  "/arkanora": "@norarcasey/arkanora",
};

/** Projects that live on their own domain rather than as a package. */
const HOSTED_AT: Partial<Record<SiteRoutePath, string>> = {
  "/crucinora": "https://crucinora.com",
  "/legends-of-noragon": "https://www.legendsofnoragon.com",
};

type JsonLd = Record<string, unknown>;

function person(): JsonLd {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    jobTitle: HEADLINE_TITLE,
    sameAs: PROFILES,
  };
}

/** A page's own node: what this URL is, and who made what it describes. */
function pageNode(path: SiteRoutePath): JsonLd {
  const { title, description } = SITE_ROUTES[path];
  const url = canonicalUrl(path);
  const packageName = NPM_PACKAGES[path];
  const hostedAt = HOSTED_AT[path];

  if (packageName || hostedAt) {
    return {
      "@type": "SoftwareApplication",
      name: title,
      description,
      url: hostedAt ?? url,
      applicationCategory: packageName ? "GameApplication" : "WebApplication",
      operatingSystem: "Web browser",
      author: { "@id": PERSON_ID },
      ...(packageName
        ? {
            softwareHelp: `https://www.npmjs.com/package/${packageName}`,
            isAccessibleForFree: true,
          }
        : {}),
    };
  }

  return {
    "@type": path === "/contact-me" ? "ContactPage" : "WebPage",
    name: title,
    description,
    url,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": PERSON_ID },
  };
}

/**
 * The JSON-LD graph for one route: the person, the site, and the page itself.
 * A graph rather than three separate blocks, so the nodes can reference each
 * other by id instead of being three unrelated things that happen to share a
 * name.
 */
export function structuredDataFor(path: SiteRoutePath): JsonLd {
  const graph: JsonLd[] = [
    person(),
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: SITE_ROUTES["/"].description,
      publisher: { "@id": PERSON_ID },
    },
  ];

  // The home page is the person's own page, so it needs no separate WebPage
  // node saying the same thing a second time.
  if (path !== "/") graph.push(pageNode(path));

  return { "@context": "https://schema.org", "@graph": graph };
}

/**
 * The JSON-LD graph for one blog post: a BlogPosting, authored by the same
 * person node the rest of the site points at, sitting inside the blog.
 *
 * Separate from structuredDataFor because posts aren't in SITE_ROUTES — they
 * come from the database, so their metadata is per-post rather than per-route.
 */
export function blogPostStructuredData(post: BlogSummary): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      person(),
      {
        "@type": "Blog",
        "@id": `${blogIndexUrl()}#blog`,
        url: blogIndexUrl(),
        name: `${SITE_NAME} — Blog`,
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "BlogPosting",
        "@id": blogUrl(post.slug),
        url: blogUrl(post.slug),
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: { "@id": PERSON_ID },
        // The post's tags, which are the subjects it actually covers.
        keywords: post.tags.map((tag) => tag.name),
        isPartOf: { "@id": `${blogIndexUrl()}#blog` },
        mainEntityOfPage: blogUrl(post.slug),
      },
    ],
  };
}
