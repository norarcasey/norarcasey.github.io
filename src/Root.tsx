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
import App from "./App";

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
            <Typography variant="h2">{`Nora Casey`}</Typography>
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
        {/* <Typography variant="h4" className="resume-link">
          <Link to="/resume">Resume</Link>
        </Typography> */}
      </Box>
      <main className="page-body">
        <Routes>
          <Route path="/" element={<App />} />
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
