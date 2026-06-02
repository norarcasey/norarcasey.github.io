import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { StarSiege } from "@norarcasey/star-siege-nora";
import { ExternalLink } from "../components/ExternalLink";
import { usePageMeta } from "../hooks/usePageMeta";

export function SpaceInvadersPage(): React.ReactElement {
  usePageMeta(
    "Star Siege",
    "Star Siege — a retro arcade space-shooter by Nora Casey, published as a React component on npm and playable in the browser."
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
            <Typography variant="h3">Star Siege</Typography>

            <Box>
              <a
                href="https://www.npmjs.com/package/@norarcasey/star-siege-nora"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View the Star Siege package on npm"
              >
                <img
                  src="https://img.shields.io/npm/v/@norarcasey/star-siege-nora?logo=npm&label=star-siege-nora"
                  alt="Star Siege npm version"
                />
              </a>
            </Box>

            <Typography variant="body1">
              Star Siege is my take on the classic arcade space-shooter — waves
              of invaders marching down the screen while you fire back from a
              moving ship. I built it in TypeScript to play with game loops and
              canvas rendering in the browser.
            </Typography>
            <Typography variant="body1">
              It's published as a React component on npm — dropped straight into
              this page. Grab it from{" "}
              <ExternalLink
                url="https://www.npmjs.com/package/@norarcasey/star-siege-nora"
                label="npm"
              />
              .
            </Typography>
            <Typography variant="body1">
              Arrow keys move your ship; space or up fires; P to pause.
            </Typography>
          </Box>
        </section>
      </Grid>
      <Grid
        sx={{ display: { xs: "none", md: "block" }, pb: 4 }}
        size={{
          xs: 12,
          md: 8,
          lg: 6,
        }}
        justifyContent="center"
      >
        <StarSiege
          cellSize={28}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        />
      </Grid>
    </Grid>
  );
}
