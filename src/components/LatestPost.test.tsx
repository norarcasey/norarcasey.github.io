import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { LatestPost } from "./LatestPost";
import type { BlogSummary } from "../data/blog";

const POST: BlogSummary = {
  slug: "my-vpn-wasnt-blocking-github",
  title: "My VPN wasn't blocking GitHub",
  excerpt: "After a thorough local verification step…",
  tags: [
    { name: "GitHub", color: "#000", category: null },
    { name: "workflow", color: "#000", category: null },
  ],
  publishedAt: "2026-10-19T19:57:00Z",
  updatedAt: "2026-10-19T20:04:06Z",
};

function renderWell(post: BlogSummary | undefined, loading = false) {
  return render(
    <MemoryRouter>
      <LatestPost post={post} loading={loading} />
    </MemoryRouter>
  );
}

describe("LatestPost", () => {
  it("leads with the post: date, title linking to it, tags, excerpt", () => {
    renderWell(POST);

    const region = screen.getByRole("region", {
      name: "My VPN wasn't blocking GitHub",
    });
    expect(region).toHaveTextContent(/Latest post · October 19, 2026/);
    expect(
      screen.getByRole("link", { name: "My VPN wasn't blocking GitHub" })
    ).toHaveAttribute("href", "/blog/my-vpn-wasnt-blocking-github");
    expect(screen.getByText("GitHub · workflow")).toBeInTheDocument();
    expect(
      screen.getByText("After a thorough local verification step…")
    ).toBeInTheDocument();

    // One link: "Read the post" is a label over the stretched title link,
    // not a second stop for the keyboard and the screen reader.
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("leaves out the tag line when the post has no tags", () => {
    renderWell({ ...POST, tags: [] });

    expect(screen.queryByText(/·.*·/)).not.toBeInTheDocument();
    expect(document.querySelectorAll(".meta")).toHaveLength(0);
  });

  it("holds the well's space while loading, hidden from assistive tech", () => {
    renderWell(undefined, true);

    const skeleton = screen.getByTestId("latest-post-skeleton");
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
    expect(skeleton).toHaveClass("card");
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders nothing once loaded with no post", () => {
    const { container } = renderWell(undefined);

    expect(container).toBeEmptyDOMElement();
  });

  it.each([
    ["the post", false],
    ["the skeleton", true],
  ])("has no axe violations in %s", async (_, loading) => {
    const { container } = renderWell(loading ? undefined : POST, loading);

    expect(await axe(container)).toHaveNoViolations();
  });
});
