import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#363435",
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
    // Sans only. Menlo and Monaco used to sit ahead of the system fonts here,
    // which was harmless while Roboto Flex loaded and the whole design while it
    // did not: index.html never loaded it, so the site rendered in Menlo for
    // two years. The wordmark is the one thing set in a mono, and it says so
    // itself in Root.tsx.
    fontFamily: [
      '"Roboto Flex"',
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

export { theme };
