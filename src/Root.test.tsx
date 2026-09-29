import React, { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { Root } from "./Root";

/** A stand-in page that does what a real one does: name itself in the tab. */
function StubPage({ title }: { title: string }): React.ReactElement {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return <h1>{title}</h1>;
}

/** The shell with two pages under it, shaped like the router in index.tsx. */
function renderShell() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route
            index
            element={
              <>
                <StubPage title="Home" />
                <section id="work" tabIndex={-1} aria-label="Work" />
              </>
            }
          />
          <Route path="resume" element={<StubPage title="Résumé" />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe("Root", () => {
  it("points the skip link at the main region it is meant to skip to", () => {
    const { container } = renderShell();

    const skipLink = screen.getByRole("link", { name: "Skip to content" });
    const main = container.querySelector("main");

    expect(main).not.toBeNull();
    expect(skipLink).toHaveAttribute("href", `#${main?.id}`);
  });

  it("announces the page a client-side navigation landed on", async () => {
    renderShell();
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("");

    await userEvent.click(screen.getByRole("link", { name: "Résumé" }));

    // The child route sets document.title first; the shell reads it back.
    expect(status).toHaveTextContent("Résumé loaded");
  });

  it("opens the phone's link panel and closes it on the way out", async () => {
    renderShell();
    const toggle = screen.getByRole("button", { name: "Menu" });
    const panel = document.getElementById("site-menu");

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(panel).toHaveAttribute("data-open", "false");

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(panel).toHaveAttribute("data-open", "true");

    // Following a link is what ends a disclosure, so it must not stay open
    // over the page it navigated to.
    await userEvent.click(screen.getByRole("link", { name: "Writing" }));
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the panel on Escape", async () => {
    renderShell();
    const toggle = screen.getByRole("button", { name: "Menu" });

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    await userEvent.keyboard("{Escape}");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("lands the header's Work link on the Work section, even from home", async () => {
    // jsdom has no layout, so it has no scrollIntoView either.
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    renderShell();

    const work = screen.getByRole("link", { name: "Work" });
    expect(work).toHaveAttribute("href", "/#work");

    await userEvent.click(work);
    const section = screen.getByRole("region", { name: "Work" });
    expect(section).toHaveFocus();
    expect(scrollIntoView).toHaveBeenCalledTimes(1);

    // A second click, after scrolling away, has to land again.
    await userEvent.click(work);
    expect(scrollIntoView).toHaveBeenCalledTimes(2);
  });

  it("sends the feed link at a real request rather than through the router", () => {
    renderShell();

    // The feed is a file the prerender writes. As a <Link> the catch-all
    // rewrite would answer it with the app instead of the XML.
    const rss = screen.getByRole("link", { name: "RSS" });
    expect(rss).toHaveAttribute("href", "/blog/feed.xml");
    expect(rss.tagName).toBe("A");
    expect(rss).not.toHaveAttribute("target");
  });
});
