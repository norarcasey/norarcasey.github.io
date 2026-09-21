import { act, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { BlogPostPage } from "./BlogPostPage";
import type { BlogPost } from "../data/blog";

function post(overrides: Partial<BlogPost> = {}): BlogPost {
  return {
    slug: "the-meter-showed-up",
    title: "The meter showed up",
    excerpt: "What it is about.",
    bodyHtml: "<p>The first paragraph.</p>",
    tags: [],
    publishedAt: "2026-03-18T00:00:00Z",
    updatedAt: "2026-03-18T00:00:00Z",
    ...overrides,
  };
}

/** Serve one post file; every other path 404s, as static hosting would. */
function serve(posts: BlogPost[]) {
  const byUrl = new Map(posts.map((p) => [`/blog/posts/${p.slug}.json`, p]));
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      const found = byUrl.get(url);
      if (!found) return new Response("nope", { status: 404 });
      return new Response(JSON.stringify(found), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    })
  );
}

/** The page only ever renders under /blog/:slug, so the test mounts it there. */
function renderAt(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </MemoryRouter>
  );
}

async function settle() {
  await vi.waitFor(() => expect(fetch).toHaveBeenCalled());
  await act(async () => {});
}

describe("BlogPostPage", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the post's title, date, tags, and body", async () => {
    serve([
      post({
        tags: [
          { name: "TypeScript", color: "#000", category: null },
          { name: "Testing", color: "#000", category: null },
        ],
      }),
    ]);

    const { container } = renderAt("the-meter-showed-up");

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "The meter showed up",
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/March 18, 2026/)).toBeInTheDocument();
    expect(screen.getByText(/TypeScript, Testing/)).toBeInTheDocument();
    // The body is trusted HTML from my own studio, so it is set as markup and
    // has to arrive as markup: a <p>, not an escaped string.
    expect(container.querySelector(".blog-body")?.innerHTML).toBe(
      "<p>The first paragraph.</p>"
    );
    expect(document.title).toContain("The meter showed up");
  });

  it("links back to the listing whatever the post's state", async () => {
    serve([]);

    renderAt("withdrawn");

    await settle();
    expect(screen.getByRole("link", { name: "← All posts" })).toHaveAttribute(
      "href",
      "/blog"
    );
  });

  // A link to an unpublished post is the case this page exists to handle
  // gracefully: the address is fine, the post is gone.
  it("says the post is not found when its file has gone", async () => {
    serve([]);

    renderAt("withdrawn");

    expect(
      await screen.findByRole("heading", { level: 1, name: "Post not found" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/There's no post at this address/)
    ).toBeInTheDocument();
    // "Not found" is not "broken": the error copy must stay away.
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("says so when the post cannot be loaded at all", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("no", { status: 500 }))
    );

    renderAt("the-meter-showed-up");

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "This post couldn't be loaded."
    );
    expect(
      screen.queryByRole("heading", { level: 1, name: "Post not found" })
    ).not.toBeInTheDocument();
  });

  it("shows a loading line while the post is in flight", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise<Response>(() => {}))
    );

    renderAt("the-meter-showed-up");

    expect(screen.getByRole("status")).toHaveTextContent("Loading…");
  });
});
