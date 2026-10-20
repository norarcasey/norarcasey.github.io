import { act, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import Home from "./HomePage";
import type { BlogSummary } from "../data/blog";
import { GAMES, PRODUCTS } from "../data/projects";

function summary(slug: string, title: string, publishedAt: string) {
  return {
    slug,
    title,
    excerpt: `About ${title}.`,
    tags: [],
    publishedAt,
    updatedAt: publishedAt,
  } satisfies BlogSummary;
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

/**
 * Let the index fetch resolve and React re-render. Without this, a test that
 * asserts the blog is absent would pass while the response was still in
 * flight, and so would pass even if it were about to appear.
 */
async function settle() {
  await vi.waitFor(() => expect(fetch).toHaveBeenCalled());
  await act(async () => {});
}

describe("HomePage blog", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  function renderHome() {
    return render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  }

  it("leads with the newest post under the hero and lists the next three in Writing", async () => {
    // Out of order on purpose: the home page sorts, not the file.
    respondWith([
      summary("third", "Third", "2026-01-01"),
      summary("fifth", "Fifth", "2025-11-01"),
      summary("newest", "The newest post", "2026-03-18T00:00:00Z"),
      summary("fourth", "Fourth", "2025-12-01"),
      summary("second", "Second", "2026-02-01"),
    ]);

    renderHome();

    const well = await screen.findByRole("region", {
      name: "The newest post",
    });
    expect(
      within(well).getByRole("link", { name: "The newest post" })
    ).toHaveAttribute("href", "/blog/newest");

    // The well sits between the hero and Work, and the newest post is not
    // repeated in Writing.
    expect(
      screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)
    ).toEqual(["The newest post", "Work", "Writing", "About"]);
    expect(
      screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)
    ).toEqual(expect.arrayContaining(["Second", "Third", "Fourth"]));
    expect(screen.queryByText("Fifth")).not.toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "The newest post" })
    ).toHaveLength(1);
  });

  it("with one post, shows the well and no Writing section", async () => {
    respondWith([summary("only", "The only post", "2026-03-18")]);

    renderHome();

    await screen.findByRole("region", { name: "The only post" });
    expect(
      screen.queryByRole("heading", { level: 2, name: "Writing" })
    ).not.toBeInTheDocument();
  });

  it.each([
    ["can't be loaded", null],
    ["is empty", []],
  ])("shows neither when the index %s", async (_, posts) => {
    respondWith(posts);

    renderHome();

    await settle();
    expect(
      screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)
    ).toEqual(["Work", "About"]);
  });
});

describe("HomePage", () => {
  function renderHome() {
    return render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  }

  it("leads with what she does rather than a job title", () => {
    renderHome();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /I'm passionate about helping people, and I build software/,
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View résumé" })).toHaveAttribute(
      "href",
      "/resume"
    );
  });

  it("has the four sections the canvas draws, and no more", () => {
    renderHome();

    // Writing is absent here: it renders nothing until the blog index has
    // been fetched, which is its own test.
    const sections = screen
      .getAllByRole("heading", { level: 2 })
      .map((heading) => heading.textContent);
    expect(sections).toEqual(["Work", "About"]);
  });

  it("no longer carries the chip row, the skills matrix, or the spotlight", () => {
    renderHome();

    // The chips and the matrix said the same things as the three facts and
    // the résumé's Skills section; the spotlight band is now a card in Work.
    expect(screen.queryByText("Across the stack")).not.toBeInTheDocument();
    expect(screen.queryByText("More projects")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Latest personal passion project")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("About me")).not.toBeInTheDocument();
  });

  it("lists every product as a card and every game in the strip", () => {
    renderHome();

    for (const project of PRODUCTS) {
      expect(screen.getByRole("link", { name: project.name })).toHaveAttribute(
        "href",
        project.path
      );
      expect(screen.getByText(project.blurb)).toBeInTheDocument();
      expect(screen.getByText(project.stack!)).toBeInTheDocument();
    }

    for (const project of GAMES) {
      const link = screen.getByRole("link", {
        name: new RegExp(project.name),
      });
      expect(link).toHaveAttribute("href", project.path);
      expect(screen.getByText(project.npmPackage!)).toBeInTheDocument();
    }
  });
});
