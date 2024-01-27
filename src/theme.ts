import { createTheme } from "@mui/material/styles";

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

export { theme };
