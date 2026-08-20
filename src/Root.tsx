import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, ThemeProvider } from "@mui/material";
import { Outlet, Routes, Route, Link, useLocation } from "react-router-dom";

import {
  BlogIcon,
  EmailIcon,
  LinkedInIcon,
  GithubIcon,
  NpmIcon,
  ResumeIcon,
} from "./icons";
import Home from "./pages/HomePage";
import { theme } from "./theme";

export function Root(): React.ReactElement {
  // On client-side navigation, move focus to the main region and announce the
  // new page via a polite live region, so screen-reader and keyboard users are
  // told the page changed instead of being left where they clicked.
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);
  const [routeAnnouncement, setRouteAnnouncement] = useState("");

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    mainRef.current?.focus();
    // Child route effects set document.title before this parent effect runs.
    setRouteAnnouncement(`${document.title} loaded`);
  }, [location.pathname]);

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
   */

  return (
    <ThemeProvider theme={theme}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Box component="header" className="page-header">
        <Box>
          <Link to="/" aria-label="Nora Casey, home">
            {/* Not a heading: the site name repeats on every page, so making it
                the h1 left each page's own subject as an h2 and told search
                engines that every page was about the same thing. The pages own
                their h1 now; this is just the wordmark in the banner. */}
            <Typography
              component="p"
              className="root-title"
              aria-label="Nora Casey"
              sx={{
                typography: { sm: "h2", xs: "h3" },
                letterSpacing: 0.01,
              }}
            >
              {`[\\n]ora casey`}
            </Typography>
          </Link>
        </Box>
        <Box display="flex" justifyContent="end" alignItems="center">
          <Link to="/blog" className="header-action" aria-label="Blog">
            <BlogIcon />
          </Link>
          <Link to="/resume" className="header-action" aria-label="Résumé">
            <ResumeIcon />
          </Link>
          <Link
            to="/contact-me"
            className="header-action"
            aria-label="Contact me"
          >
            <EmailIcon />
          </Link>
          <a
            className="header-action"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn (opens in a new tab)"
            href="https://www.linkedin.com/in/nora-casey/"
          >
            <LinkedInIcon />
          </a>
          <a
            className="header-action"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (opens in a new tab)"
            href="https://github.com/norarcasey"
          >
            <GithubIcon />
          </a>
          <a
            className="header-action"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="npm (opens in a new tab)"
            href="https://www.npmjs.com/org/norarcasey"
          >
            <NpmIcon />
          </a>
        </Box>
      </Box>
      <main id="main-content" className="page-body" tabIndex={-1} ref={mainRef}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Outlet />
      </main>
      <footer className="page-footer">
        <div className="copyright">
          Copyright &copy; {new Date().getFullYear()} Nora Casey. All rights
          reserved.
        </div>
      </footer>
      <div role="status" aria-live="polite" className="visually-hidden">
        {routeAnnouncement}
      </div>
    </ThemeProvider>
  );
}
