import {
  openExternalLinksInNewTab,
  summarize,
  toBlogPost,
} from "./blogContent";

const row = {
  slug: "rls-performance",
  title: "  Debugging RLS performance  ",
  body_html: "<p>Postgres re-evaluated auth.uid() per row.</p>",
  body_text: "Postgres re-evaluated auth.uid() per row.",
  tags: [{ name: "postgres", color: "#6B6454", category: "topic" }],
  published_at: "2026-03-18T12:00:00Z",
  updated_at: "2026-03-19T12:00:00Z",
};

describe("toBlogPost", () => {
  it("maps a snapshot row onto the site's own shape", () => {
    const post = toBlogPost(row);
    expect(post.slug).toBe("rls-performance");
    expect(post.title).toBe("Debugging RLS performance");
    expect(post.bodyHtml).toBe(row.body_html);
    expect(post.publishedAt).toBe(row.published_at);
    expect(post.updatedAt).toBe(row.updated_at);
  });

  it("derives the excerpt from the body text", () => {
    expect(toBlogPost(row).excerpt).toBe(
      "Postgres re-evaluated auth.uid() per row."
    );
  });

  it("falls back to a placeholder title rather than rendering an empty h1", () => {
    expect(toBlogPost({ ...row, title: null }).title).toBe("Untitled");
    expect(toBlogPost({ ...row, title: "   " }).title).toBe("Untitled");
  });

  it("tolerates a snapshot with no tags", () => {
    // Rows published before the tags column existed default to [], but a null
    // would still be a crash in every .map over them.
    expect(toBlogPost({ ...row, tags: null }).tags).toEqual([]);
  });
});

describe("summarize", () => {
  it("drops the body, which the listing must not ship", () => {
    const summary = summarize(toBlogPost(row));
    expect(summary).not.toHaveProperty("bodyHtml");
    expect(summary.title).toBe("Debugging RLS performance");
  });
});

describe("openExternalLinksInNewTab", () => {
  const note = '<span class="visually-hidden"> (opens in a new tab)</span>';

  it("opens a link to another site in a new tab and says so", () => {
    // What the studio actually emits: rel="noreferrer" and no target.
    const html =
      '<a href="https://platform.claude.com/docs" rel="noreferrer">Docs</a>';
    expect(openExternalLinksInNewTab(html)).toBe(
      '<a href="https://platform.claude.com/docs" rel="noreferrer noopener" target="_blank">Docs' +
        note +
        "</a>"
    );
  });

  it("adds rel when the studio gave none", () => {
    expect(
      openExternalLinksInNewTab('<a href="http://example.com">x</a>')
    ).toBe(
      '<a href="http://example.com" target="_blank" rel="noopener noreferrer">x' +
        note +
        "</a>"
    );
  });

  it("leaves same-page links, mail links, and links to this site alone", () => {
    for (const html of [
      '<sup class="citation"><a href="#ref-1">[1]</a></sup>',
      '<a class="reference-backlink" href="#cite-1-1" aria-label="Back to citation 1">^</a>',
      '<a href="mailto:noracasey@duck.com">write</a>',
      '<a href="https://noracasey.com/blog">the blog</a>',
      '<a href="https://www.noracasey.com/">home</a>',
    ]) {
      expect(openExternalLinksInNewTab(html)).toBe(html);
    }
  });

  it("is idempotent", () => {
    const once = openExternalLinksInNewTab(
      '<a href="https://example.com">x</a>'
    );
    expect(openExternalLinksInNewTab(once)).toBe(once);
  });

  it("handles the reference list as published", () => {
    const html =
      '<ol class="references"><li id="ref-1"><a class="reference-backlink" href="#cite-1-1" aria-label="Back to citation 1">^</a> <a href="https://example.com/a" rel="noreferrer">A</a></li></ol>';
    const out = openExternalLinksInNewTab(html);
    // The backlink is untouched; the reference itself opens in a new tab.
    expect(out).toContain(
      '<a class="reference-backlink" href="#cite-1-1" aria-label="Back to citation 1">^</a>'
    );
    expect(out).toContain('target="_blank"');
    expect(out.match(/target="_blank"/g)).toHaveLength(1);
  });

  it("is applied when a row becomes a post", () => {
    const post = toBlogPost({
      ...row,
      body_html: '<p><a href="https://example.com">x</a></p>',
    });
    expect(post.bodyHtml).toContain('target="_blank"');
  });
});
