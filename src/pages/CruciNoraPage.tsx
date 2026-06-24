import React from "react";
import { Box, Button, Typography } from "@mui/material";

import { usePageMeta } from "../hooks/usePageMeta";
import crucinoraScreen from "../assets/screens/crucinora.png";

const VISIT_URL = "https://crucinora.com";

export function CruciNoraPage(): React.ReactElement {
  usePageMeta(
    "CruciNora",
    "CruciNora — an AI-assisted crossword construction app by Nora Casey. Design an NYT-style grid, auto-fill it with a backtracking solver, and clue it with Claude's help."
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
      <Box sx={{ width: { xs: "100%", lg: "auto" }, maxWidth: "100%" }}>
        {/* Header spanning both columns */}
        <Box className="tile" sx={{ mb: 0, pb: 0 }}>
          <Typography variant="h3">CruciNora</Typography>
        </Box>

        {/* Body: screenshot + visit link beside the write-up on large screens */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: { xs: "center", lg: "flex-start" },
            gap: { xs: 0, lg: 4 },
            mt: { xs: 2, lg: 7 },
          }}
        >
          {/* Screenshot + Visit button */}
          <Box
            sx={{
              width: { xs: "100%", lg: 480 },
              maxWidth: 560,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              component="img"
              src={crucinoraScreen}
              alt="The CruciNora crossword builder"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 1,
                display: "block",
              }}
            />
            <Button
              variant="contained"
              href={VISIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                backgroundColor: "#df6695",
                "&:hover": { backgroundColor: "#c7507e" },
                fontWeight: 600,
              }}
            >
              Visit CruciNora
            </Button>
          </Box>

          {/* Write-up */}
          <Box
            sx={{
              width: { xs: "100%", lg: 400 },
              maxWidth: { xs: 640, lg: 400 },
              flexShrink: 0,
            }}
          >
            <section className="tile">
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="body1">
                  CruciNora is an AI-assisted crossword construction app. You
                  design an NYT-style grid, enter the long "theme" answers, let
                  a solver auto-fill the rest with valid words, then write a
                  clue for every entry with Claude's help — accepting the AI's
                  suggestions or overriding them. It's hosted at{" "}
                  <a href={VISIT_URL} target="_blank" rel="noopener noreferrer">
                    crucinora.com
                  </a>
                  .
                </Typography>

                <Typography variant="h6" sx={{ color: "#4b9ae7" }}>
                  How it's built
                </Typography>
                <Typography variant="body1">
                  The crossword engine is plain TypeScript with no React or DOM
                  — the grid, the live NYT rule checks, the word list, and the
                  solver all live in a framework-free core that's unit-tested in
                  isolation. Around it sits a Vite + React app backed by
                  Supabase (magic-link auth with a single-admin allowlist), and
                  a Vercel serverless function proxies Claude so the API key
                  never reaches the browser.
                </Typography>

                <Typography variant="h6" sx={{ color: "#4b9ae7" }}>
                  Fun challenges
                </Typography>
                <Typography variant="body1">
                  The trick is splitting the work by what each tool is actually
                  good at. Filling a grid is a constraint-satisfaction problem
                  where every crossing must form a valid word — something LLMs
                  do unreliably — so it's handled by a backtracking solver
                  (most-constrained-variable plus forward checking) over a
                  scored word list, which fills a real 15×15 grid in well under
                  a second. Writing clues, which AI is genuinely good at, goes
                  to Claude: every non-theme entry gets three Monday-difficulty
                  suggestions to accept or replace.
                </Typography>
              </Box>
            </section>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
