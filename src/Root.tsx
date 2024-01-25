import React from "react";
import { Typography, ThemeProvider, createTheme } from "@mui/material";
import { Outlet, Routes, Route, Link } from "react-router-dom";
import App from "./App";

const theme = createTheme({
  typography: {
    fontFamily: [
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
      <header className="page-header">
        <Link to="/">
          <Typography variant="h2">Nora Casey</Typography>
        </Link>
        <Typography variant="body1" className="resume-link">
          <Link to="/resume">Resume</Link>
        </Typography>
      </header>
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
