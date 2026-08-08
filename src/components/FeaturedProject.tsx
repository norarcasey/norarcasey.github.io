import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { HOME_BAND_MAX_WIDTH } from "./Hero";
import { ACCENT_BLUE, ACCENT_PINK, ACCENT_PINK_HOVER } from "../colors";
import crucinoraScreen from "../assets/screens/crucinora.webp";

const VISIT_URL = "https://crucinora.com";

/**
 * Spotlight for the newest, most substantial project (CruciNora): a large
 * screenshot beside an elevator pitch and two calls to action. Sits at the top
 * of the home page so the strongest work is the first thing visitors see.
 */
export function FeaturedProject(): React.ReactElement {
  return (
    <Box
      component="section"
      className="tile"
      sx={{ width: "100%", maxWidth: HOME_BAND_MAX_WIDTH, mx: "auto" }}
    >
      <Typography variant="h3" component="h2">
        Latest personal passion project
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "center" },
          gap: { xs: 2, md: 4 },
          mt: 2,
        }}
      >
        {/* Screenshot */}
        <Box
          component={Link}
          to="/crucinora"
          sx={{
            display: "block",
            flexShrink: 0,
            width: { xs: "100%", sm: 260, md: 280 },
            maxWidth: "100%",
            borderRadius: 1,
            overflow: "hidden",
            border: `dashed 1px ${ACCENT_BLUE}`,
          }}
        >
          <Box
            component="img"
            src={crucinoraScreen}
            alt="The CruciNora crossword builder"
            decoding="async"
            sx={{
              width: "100%",
              height: "auto",
              display: "block",
              aspectRatio: "560 / 562",
            }}
          />
        </Box>

        {/* Pitch */}
        <Box display="flex" flexDirection="column" gap={1.5}>
          <Typography
            variant="h4"
            component="h3"
            sx={{ color: ACCENT_BLUE, borderBottom: "none" }}
          >
            CruciNora
          </Typography>
          <Typography variant="body1" sx={{ color: "#4a4f57" }}>
            An AI-assisted crossword construction app. Design an NYT-style grid,
            auto-fill it in under a second with a backtracking solver, then clue
            every entry with Claude's help. A full-stack product: a
            framework-free TypeScript engine, a Vite and React front end,
            Supabase auth, and a Vercel serverless proxy that keeps the API key
            off the client.
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1.5} mt={0.5}>
            <Button
              variant="contained"
              href={VISIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                backgroundColor: ACCENT_PINK,
                "&:hover": { backgroundColor: ACCENT_PINK_HOVER },
                fontWeight: 600,
              }}
            >
              Visit CruciNora
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to="/crucinora"
              sx={{
                color: ACCENT_BLUE,
                borderColor: ACCENT_BLUE,
                "&:hover": {
                  borderColor: ACCENT_BLUE,
                  backgroundColor: "rgba(31, 120, 194, 0.08)",
                },
                fontWeight: 600,
              }}
            >
              How it's built
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
