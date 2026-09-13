import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { LatestPost } from "./LatestPost";
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
      <LatestPost />
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

describe("LatestPost", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows the newest post, whatever order the index arrives in", async () => {
    respondWith([
      summary({
        slug: "older",
        title: "The older post",
        publishedAt: "2026-02-01T00:00:00Z",
      }),
      summary({
        slug: "newest",
        title: "The newest post",
        excerpt: "The one that should show.",
        tags: [{ name: "TypeScript", color: "#000", category: null }],
        publishedAt: "2026-03-18T00:00:00Z",
      }),
    ]);

    renderCard();

    expect(
      await screen.findByRole("link", { name: "The newest post" })
    ).toHaveAttribute("href", "/blog/newest");
    expect(screen.getByText("The one that should show.")).toBeInTheDocument();
    expect(screen.getByText(/March 18, 2026/)).toBeInTheDocument();
    expect(screen.getByText(/TypeScript/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Read the post" })).toHaveAttribute(
      "href",
      "/blog/newest"
    );
    expect(screen.getByRole("link", { name: "All posts" })).toHaveAttribute(
      "href",
      "/blog"
    );
    expect(screen.queryByText("The older post")).not.toBeInTheDocument();
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
