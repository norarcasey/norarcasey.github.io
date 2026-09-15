import React, { useCallback, useEffect, useRef, useState } from "react";
import { ThemeProvider } from "@mui/material";
import { Outlet, Link, useLocation } from "react-router-dom";

import { theme } from "./theme";

/**
 * LOGO:
 *
 * Square brackets ( ) in regular expressions,
 * also known as metacharacters, have a special meaning.
 * Brackets indicate a set of characters to match.
 * Any character between the brackets matches,
 * and a hyphen can be used to define a set.
 *
 * In regular expressions (regex),
 * the character \n matches a newline character.
 * The backslash escape character, `\`,
 * gives special meaning to the character following it.
 * For example, the combination \n stands for the newline,
 * which is a control character.
 *
 * It is the one monospace element on the site, and it takes the flag pair as
 * its colour: the brackets in the AA blue, the escape in the AA pink. The
 * visible text is a regex, so it is hidden from the accessibility tree and the
 * link carries the name instead.
 */
function Wordmark(): React.ReactElement {
  return (
    <Link to="/" className="wordmark" aria-label="Nora Casey, home">
      <span aria-hidden="true">
        <span className="wordmark__bracket">[</span>
        <span className="wordmark__escape">{"\\n"}</span>
        <span className="wordmark__bracket">]</span>
        ora casey
      </span>
    </Link>
  );
}

/** The three page links, as one list: a row in the bar, or the phone's panel. */
const NAV_LINKS = [
  // Work is the home page until UI-16 gives its Work section an id to land on.
  { to: "/", label: "Work" },
  { to: "/blog", label: "Writing" },
  { to: "/resume", label: "Résumé" },
];

/**
 * The footer carries what the six hand-drawn header icons used to, as text.
 * `route` says which are pages this app routes to: the feed is a file the
 * prerender writes, so it has to be a real request rather than a client-side
 * navigation that the catch-all rewrite would answer with the app.
 */
const FOOTER_LINKS = [
  { href: "/contact-me", label: "Email", route: true, newTab: false },
  {
    href: "https://www.linkedin.com/in/nora-casey/",
    label: "LinkedIn",
    route: false,
    newTab: true,
  },
  {
    href: "https://github.com/norarcasey",
    label: "GitHub",
    route: false,
    newTab: true,
  },
  {
    href: "https://www.npmjs.com/org/norarcasey",
    label: "npm",
    route: false,
    newTab: true,
  },
  { href: "/blog/feed.xml", label: "RSS", route: false, newTab: false },
];

export function Root(): React.ReactElement {
  // On client-side navigation, move focus to the main region and announce the
  // new page via a polite live region, so screen-reader and keyboard users are
  // told the page changed instead of being left where they clicked.
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);
  const [routeAnnouncement, setRouteAnnouncement] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    mainRef.current?.focus();
    // Child route effects set document.title before this parent effect runs.
    setRouteAnnouncement(`${document.title} loaded`);
  }, [location.pathname]);

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") setMenuOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <ThemeProvider theme={theme}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="page-header">
        <div className="header-bar">
          {/* Not a heading: the site name repeats on every page, so making it
              the h1 left each page's own subject as an h2 and told search
              engines that every page was about the same thing. The pages own
              their h1; this is just the wordmark in the banner. */}
          <Wordmark />
          <div className="header-actions">
            <nav aria-label="Primary">
              <ul
                className="header-links"
                id="site-menu"
                data-open={menuOpen ? "true" : "false"}
              >
                {NAV_LINKS.map(({ to, label }) => (
                  <li key={label}>
                    {/* The panel is a disclosure: following a link is what
                        ends it, so each link closes it on the way out. */}
                    <Link
                      to={to}
                      className="navlink"
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              to="/contact-me"
              className="btn btn-pink"
              onClick={() => setMenuOpen(false)}
            >
              Get in touch
            </Link>
            <button
              type="button"
              className="header-toggle"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label="Menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
        <div className="stripe" aria-hidden="true" />
      </header>
      <main id="main-content" className="page-body" tabIndex={-1} ref={mainRef}>
        <Outlet />
      </main>
      <footer className="page-footer">
        <div className="stripe" aria-hidden="true" />
        <div className="footer-bar">
          <div className="footer-top">
            <Wordmark />
            <nav aria-label="Elsewhere">
              <ul className="footer-links">
                {FOOTER_LINKS.map(({ href, label, route, newTab }) => (
                  <li key={label}>
                    {route ? (
                      <Link className="navlink" to={href}>
                        {label}
                      </Link>
                    ) : (
                      <a
                        className="navlink"
                        href={href}
                        {...(newTab
                          ? {
                              target: "_blank",
                              rel: "noopener noreferrer",
                              "aria-label": `${label} (opens in a new tab)`,
                            }
                          : {})}
                      >
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <p className="meta">
            Copyright &copy; {new Date().getFullYear()} Nora Casey. All rights
            reserved.
          </p>
        </div>
      </footer>
      <div role="status" aria-live="polite" className="visually-hidden">
        {routeAnnouncement}
      </div>
    </ThemeProvider>
  );
}
