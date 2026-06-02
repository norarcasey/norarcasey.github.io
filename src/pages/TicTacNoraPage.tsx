import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { TicTacNora } from "@norarcasey/tic-tac-nora";
import "@norarcasey/tic-tac-nora/style.css";

import { ExternalLink } from "../components/ExternalLink";
import { usePageMeta } from "../hooks/usePageMeta";

export function TicTacNoraPage(): React.ReactElement {
  usePageMeta(
    "Tic Tac Nora",
    "Tic Tac Nora — a tic-tac-toe game by Nora Casey, published as a React component on npm and playable in the browser. Try to beat Nora's minimax AI."
  );

  return (
    <Grid container display="flex" flexDirection="column" alignItems="center">
      <Grid
        size={{
          xs: 12,
          md: 8,
          lg: 6,
        }}
      >
        <section className="tile">
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h3">Tic Tac Nora</Typography>

            <Box>
              <a
                href="https://www.npmjs.com/package/@norarcasey/tic-tac-nora"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View the Tic Tac Nora package on npm"
              >
                <img
                  src="https://img.shields.io/npm/v/@norarcasey/tic-tac-nora?logo=npm&label=tic-tac-nora"
                  alt="Tic Tac Nora npm version"
                />
              </a>
            </Box>

            <Typography variant="body1">
              Tic Tac Nora is my spin on tic-tac-toe — you play X and go first,
              and Nora plays O. Behind the scenes she runs a minimax search, so
              she always takes a win, always blocks yours, and never loses a
              game she could draw. The best you can do is force a tie.
            </Typography>
            <Typography variant="body1">
              It's published as a React component on npm — dropped straight into
              this page. Grab it from{" "}
              <ExternalLink
                url="https://www.npmjs.com/package/@norarcasey/tic-tac-nora"
                label="npm"
              />
              .
            </Typography>
            <Typography variant="body1">
              Click any open square to make your move; press New Game to start
              over.
            </Typography>
          </Box>
        </section>
      </Grid>
      <Grid
        sx={{ pb: 4 }}
        size={{
          xs: 12,
          md: 8,
          lg: 6,
        }}
        display="flex"
        justifyContent="center"
      >
        <TicTacNora difficulty="smart" />
      </Grid>
    </Grid>
  );
}
