import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { WritingSection } from "./WritingSection";
import type { BlogSummary } from "../data/blog";

function summary(overrides: Partial<BlogSummary>): BlogSummary {
  return {
    slug: "a-post",
    title: "A post",
    excerpt: "What it is about.",
    tags: [],
    publishedAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

function respondWith(posts: BlogSummary[] | null) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () =>
      posts === null
        ? new Response("no", { status: 500 })
        : new Response(JSON.stringify(posts), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          })
    )
  );
}

function renderCard() {
  return render(
    <MemoryRouter>
      <WritingSection />
    </MemoryRouter>
  );
}

/**
 * Let the index fetch resolve and React re-render. Without this, a test that
 * asserts the card is absent would pass while the response was still in
 * flight, and so would pass even if the card were about to appear.
 */
async function settle() {
  await vi.waitFor(() => expect(fetch).toHaveBeenCalled());
  await act(async () => {});
}

describe("WritingSection", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows the newest three, newest first, whatever order they arrive in", async () => {
    respondWith([
      summary({ slug: "third", title: "Third", publishedAt: "2026-01-01" }),
      summary({ slug: "fourth", title: "Fourth", publishedAt: "2025-12-01" }),
      summary({
        slug: "newest",
        title: "The newest post",
        excerpt: "The one that should lead.",
        tags: [{ name: "TypeScript", color: "#000", category: null }],
        publishedAt: "2026-03-18T00:00:00Z",
      }),
      summary({ slug: "second", title: "Second", publishedAt: "2026-02-01" }),
    ]);

    renderCard();

    expect(
      await screen.findByRole("link", { name: "The newest post" })
    ).toHaveAttribute("href", "/blog/newest");
    expect(screen.getByText("The one that should lead.")).toBeInTheDocument();
    expect(screen.getByText(/March 18, 2026/)).toBeInTheDocument();
    expect(screen.getByText(/TypeScript/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "All posts" })).toHaveAttribute(
      "href",
      "/blog"
    );

    // Three, in order, and the fourth is not on the home page.
    const headings = screen
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    expect(headings).toEqual(["The newest post", "Second", "Third"]);
    expect(screen.queryByText("Fourth")).not.toBeInTheDocument();
  });

  it("renders nothing when the index can't be loaded", async () => {
    respondWith(null);

    const { container } = renderCard();

    await settle();
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when there are no posts yet", async () => {
    respondWith([]);

    const { container } = renderCard();

    await settle();
    expect(container).toBeEmptyDOMElement();
  });
});
