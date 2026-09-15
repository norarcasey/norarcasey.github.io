import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1c2229",
    },
    secondary: {
      main: "#1f78c2",
    },
  },
  typography: {
    h3: {
      fontSize: "24px",
    },
    body1: {
      fontSize: "16px",
    },
    // Sans only, and the same stack index.css gives everything else, so MUI
    // components and raw markup cannot disagree about the typeface. The
    // wordmark is the one thing set in a mono, and it says so itself in
    // Root.tsx. This whole theme goes in UI-19; until then it is what the
    // pages still render through.
    fontFamily: [
      '"Atkinson Hyperlegible Next"',
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      '"Segoe UI"',
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export { theme };
