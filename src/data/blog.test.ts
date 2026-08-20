import {
  blogPath,
  blogUrl,
  collectTags,
  excerptFrom,
  filterByTag,
  formatPostDate,
  sortByNewest,
  type BlogSummary,
} from "./blog";

function post(overrides: Partial<BlogSummary> = {}): BlogSummary {
  return {
    slug: "a-post",
    title: "A Post",
    excerpt: "About something.",
    tags: [],
    publishedAt: "2026-03-18T12:00:00Z",
    updatedAt: "2026-03-18T12:00:00Z",
    ...overrides,
  };
}

const tag = (name: string) => ({ name, color: "#6B6454", category: "topic" });

describe("excerptFrom", () => {
  it("returns short text unchanged, with no ellipsis", () => {
    expect(excerptFrom("Short and done.")).toBe("Short and done.");
  });

  it("collapses whitespace so multi-paragraph text reads as one line", () => {
    expect(excerptFrom("One.\n\n  Two.")).toBe("One. Two.");
  });

  it("cuts at a word boundary rather than mid-word", () => {
    const excerpt = excerptFrom("alpha bravo charlie delta", 14);
    expect(excerpt).toBe("alpha bravo…");
    expect(excerpt).not.toContain("charl");
  });

  it("does not leave dangling punctuation before the ellipsis", () => {
    expect(excerptFrom("Done here, and more follows", 11)).toBe("Done here…");
  });

  it("falls back to a hard cut when there is no space to break at", () => {
    expect(excerptFrom("supercalifragilistic", 8)).toBe("supercal…");
  });
});

describe("collectTags", () => {
  it("returns each distinct tag once, alphabetically", () => {
    const posts = [
      post({ tags: [tag("react"), tag("postgres")] }),
      post({ tags: [tag("react")] }),
    ];
    expect(collectTags(posts).map((t) => t.name)).toEqual([
      "postgres",
      "react",
    ]);
  });

  it("returns nothing when no post is tagged", () => {
    expect(collectTags([post()])).toEqual([]);
  });
});

describe("filterByTag", () => {
  const posts = [
    post({ slug: "a", tags: [tag("react")] }),
    post({ slug: "b", tags: [tag("postgres")] }),
  ];

  it("keeps only posts carrying the tag", () => {
    expect(filterByTag(posts, "react").map((p) => p.slug)).toEqual(["a"]);
  });

  it("returns everything when no tag is selected", () => {
    expect(filterByTag(posts, null)).toHaveLength(2);
  });

  it("returns nothing for a tag no post carries", () => {
    expect(filterByTag(posts, "rust")).toEqual([]);
  });
});

describe("sortByNewest", () => {
  it("orders by published date, newest first", () => {
    const posts = [
      post({ slug: "old", publishedAt: "2026-01-01T00:00:00Z" }),
      post({ slug: "new", publishedAt: "2026-06-01T00:00:00Z" }),
    ];
    expect(sortByNewest(posts).map((p) => p.slug)).toEqual(["new", "old"]);
  });

  it("does not mutate the array it is given", () => {
    const posts = [
      post({ slug: "old", publishedAt: "2026-01-01T00:00:00Z" }),
      post({ slug: "new", publishedAt: "2026-06-01T00:00:00Z" }),
    ];
    sortByNewest(posts);
    expect(posts.map((p) => p.slug)).toEqual(["old", "new"]);
  });
});

describe("urls", () => {
  it("builds the in-app path and the canonical URL for a post", () => {
    expect(blogPath("rls-performance")).toBe("/blog/rls-performance");
    // Trailing slash, matching the rest of the site's canonical URLs.
    expect(blogUrl("rls-performance")).toBe(
      "https://noracasey.com/blog/rls-performance/"
    );
  });
});

describe("formatPostDate", () => {
  it("formats in UTC, so the date doesn't shift by the reader's timezone", () => {
    expect(formatPostDate("2026-03-18T02:00:00Z")).toBe("March 18, 2026");
  });

  it("returns an empty string for an unparseable date", () => {
    expect(formatPostDate("not a date")).toBe("");
  });
});
