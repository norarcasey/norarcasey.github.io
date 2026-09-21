import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { BlogIndexPage } from "./BlogIndexPage";
import type { BlogSummary, BlogTag } from "../data/blog";

function tag(name: string): BlogTag {
  return { name, color: "#000", category: null };
}

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

/** The index file as the build writes it, or a failure to serve it. */
function respondWith(posts: BlogSummary[] | "error" | "never") {
  vi.stubGlobal(
    "fetch",
    vi.fn(() => {
      if (posts === "never") return new Promise<Response>(() => {});
      if (posts === "error")
        return Promise.resolve(new Response("no", { status: 500 }));
      return Promise.resolve(
        new Response(JSON.stringify(posts), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      );
    })
  );
}

function renderPage() {
  return render(
    <MemoryRouter>
      <BlogIndexPage />
    </MemoryRouter>
  );
}

/** Let the index fetch resolve, so an absence is an absence and not a delay. */
async function settle() {
  await vi.waitFor(() => expect(fetch).toHaveBeenCalled());
  await act(async () => {});
}

function listedTitles(): string[] {
  return screen
    .getAllByRole("heading", { level: 2 })
    .map((heading) => heading.textContent ?? "");
}

describe("BlogIndexPage", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("says it is loading while the index is in flight", () => {
    respondWith("never");

    renderPage();

    expect(screen.getByRole("status")).toHaveTextContent("Loading posts…");
  });

  it("says so when the index cannot be loaded", async () => {
    respondWith("error");

    renderPage();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "The posts couldn't be loaded."
    );
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("invites the reader back when there are no posts yet", async () => {
    respondWith([]);

    renderPage();

    await settle();
    expect(
      screen.getByText("No posts yet. Check back soon.")
    ).toBeInTheDocument();
    // No posts means no tags to filter by, so the whole filter group is gone
    // rather than left as a lone "All" button that does nothing.
    expect(
      screen.queryByRole("group", { name: "Filter posts by tag" })
    ).not.toBeInTheDocument();
  });

  it("lists posts newest first, each linking to its own page", async () => {
    respondWith([
      summary({ slug: "older", title: "Older", publishedAt: "2026-01-01" }),
      summary({
        slug: "newer",
        title: "Newer",
        excerpt: "The one that should lead.",
        publishedAt: "2026-03-18T00:00:00Z",
      }),
    ]);

    renderPage();

    expect(await screen.findByRole("link", { name: "Newer" })).toHaveAttribute(
      "href",
      "/blog/newer"
    );
    expect(listedTitles()).toEqual(["Newer", "Older"]);
    expect(screen.getByText("The one that should lead.")).toBeInTheDocument();
    expect(screen.getByText(/March 18, 2026/)).toBeInTheDocument();
  });

  describe("the tag chips", () => {
    async function renderTagged() {
      respondWith([
        summary({
          slug: "typed",
          title: "A typed post",
          tags: [tag("TypeScript")],
          publishedAt: "2026-03-01",
        }),
        summary({
          slug: "drawn",
          title: "A drawn post",
          tags: [tag("Design")],
          publishedAt: "2026-02-01",
        }),
      ]);

      renderPage();
      await screen.findByRole("link", { name: "A typed post" });
      return within(screen.getByRole("group", { name: "Filter posts by tag" }));
    }

    it("narrows the list, and clears it when pressed again", async () => {
      const chips = await renderTagged();
      const typeScript = chips.getByRole("button", { name: "TypeScript" });

      await userEvent.click(typeScript);

      expect(listedTitles()).toEqual(["A typed post"]);
      expect(typeScript).toHaveAttribute("aria-pressed", "true");
      expect(chips.getByRole("button", { name: "All" })).toHaveAttribute(
        "aria-pressed",
        "false"
      );

      await userEvent.click(typeScript);

      expect(listedTitles()).toEqual(["A typed post", "A drawn post"]);
      expect(typeScript).toHaveAttribute("aria-pressed", "false");
      expect(chips.getByRole("button", { name: "All" })).toHaveAttribute(
        "aria-pressed",
        "true"
      );
    });

    it("offers one chip per distinct tag, alphabetically, after All", async () => {
      const chips = await renderTagged();

      expect(
        chips.getAllByRole("button").map((chip) => chip.textContent)
      ).toEqual(["All", "Design", "TypeScript"]);
    });

    it("All returns to the whole list from any tag", async () => {
      const chips = await renderTagged();

      await userEvent.click(chips.getByRole("button", { name: "Design" }));
      expect(listedTitles()).toEqual(["A drawn post"]);

      await userEvent.click(chips.getByRole("button", { name: "All" }));
      expect(listedTitles()).toEqual(["A typed post", "A drawn post"]);
    });
  });
});
