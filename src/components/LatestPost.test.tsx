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

function renderWell(post: BlogSummary | undefined) {
  return render(
    <MemoryRouter>
      <LatestPost post={post} />
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

  it("renders nothing until there is a post", () => {
    const { container } = renderWell(undefined);

    expect(container).toBeEmptyDOMElement();
  });

  it("has no axe violations", async () => {
    const { container } = renderWell(POST);

    expect(await axe(container)).toHaveNoViolations();
  });
});
