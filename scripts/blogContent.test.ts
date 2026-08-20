import { summarize, toBlogPost } from "./blogContent";

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
