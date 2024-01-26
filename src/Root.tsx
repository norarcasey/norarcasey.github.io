import React from "react";
import { Box, Typography, ThemeProvider, createTheme } from "@mui/material";
import { Outlet, Routes, Route, Link } from "react-router-dom";

import { LinkedInIcon, GithubIcon, ResumeIcon } from "./icons";
import Home from "./pages/HomePage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#363435",
    },
    secondary: {
      main: "#4b9ae7",
    },
  },
  typography: {
    h3: {
      fontSize: "24px",
    },
    body1: {
      fontSize: "16px",
    },
    fontFamily: [
      '"Roboto Flex"',
      "Menlo",
      "Monaco",
      '"Courier New"',
      "monospace",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export function Root(): React.ReactElement {
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
      <Box component="header" className="page-header">
        <Box>
          <Link to="/">
            <Typography
              className="root-title"
              sx={{
                typography: { sm: "h2", xs: "h3" },
                letterSpacing: 0.01,
              }}
            >
              <strong>{`[\\n]`}</strong>
              {`ora casey`}
            </Typography>
          </Link>
        </Box>
        <Box display="flex" justifyContent="end" gap={2} alignItems="center">
          <Link to="/resume" className="button-link">
            <ResumeIcon />
          </Link>
          <a target="_blank" href="https://www.linkedin.com/in/nora-casey/">
            <LinkedInIcon />
          </a>
          <a target="_blank" href="https://github.com/norarcasey">
            <GithubIcon />
          </a>
        </Box>
      </Box>
      <main className="page-body">
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
    </ThemeProvider>
  );
}
