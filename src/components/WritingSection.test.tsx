import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

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

function renderSection(posts: BlogSummary[]) {
  return render(
    <MemoryRouter>
      <WritingSection posts={posts} />
    </MemoryRouter>
  );
}

// Which posts it gets, and in what order, is the home page's to decide; see
// HomePage.test.tsx. This is what it does with them.
describe("WritingSection", () => {
  it("lists the first three it is given, in the order given", () => {
    renderSection([
      summary({
        slug: "second",
        title: "Second",
        excerpt: "The one that should lead here.",
        tags: [{ name: "TypeScript", color: "#000", category: null }],
        publishedAt: "2026-03-18T00:00:00Z",
      }),
      summary({ slug: "third", title: "Third" }),
      summary({ slug: "fourth", title: "Fourth" }),
      summary({ slug: "fifth", title: "Fifth" }),
    ]);

    expect(screen.getByRole("link", { name: "Second" })).toHaveAttribute(
      "href",
      "/blog/second"
    );
    expect(
      screen.getByText("The one that should lead here.")
    ).toBeInTheDocument();
    expect(screen.getByText(/March 18, 2026/)).toBeInTheDocument();
    expect(screen.getByText(/TypeScript/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "All posts" })).toHaveAttribute(
      "href",
      "/blog"
    );

    const headings = screen
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    expect(headings).toEqual(["Second", "Third", "Fourth"]);
    expect(screen.queryByText("Fifth")).not.toBeInTheDocument();
  });

  it("renders nothing when it is given no posts", () => {
    const { container } = renderSection([]);

    expect(container).toBeEmptyDOMElement();
  });
});
