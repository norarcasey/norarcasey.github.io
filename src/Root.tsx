import React from "react";
import {
  Box,
  Typography,
  ThemeProvider,
  createTheme,
  Button,
} from "@mui/material";
import { Outlet, Routes, Route, Link } from "react-router-dom";

import { LinkedInIcon, GithubIcon, ResumeIcon } from "./icons";
import Home from "./pages/HomePage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#363435",
    },
    secondary: {
      main: "#363435",
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
      '"Roboto Mono"',
      "Menlo",
      "Monaco",
      '"Courier New"',
      "monospace",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
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
  return (
    <ThemeProvider theme={theme}>
      <Box component="header" className="page-header">
        <Box>
          <Link to="/">
            <Typography variant="h2">{`[\\]ora Casey`}</Typography>
          </Link>
        </Box>
        <Box display="flex" justifyContent="end" gap={2} alignItems="center">
          <Link to="/resume">
            <ResumeIcon />
          </Link>
          <Button
            target="_blank"
            href="https://www.linkedin.com/in/nora-casey/"
            startIcon={<LinkedInIcon />}
          />
          <Box width="100%">
            <Button
              size="small"
              target="_blank"
              href="https://github.com/norarcasey"
              startIcon={<GithubIcon />}
            />
          </Box>
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
