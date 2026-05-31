import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ExternalLink } from "../components/ExternalLink";

export function SpaceInvadersPage(): React.ReactElement {
  return (
    <Grid container display="flex" flexDirection="column" alignItems="center">
      <Grid item xs={12} md={8} lg={6}>
        <section className="tile">
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h3">Space Invaders</Typography>
            <Typography variant="body1">
              Space Invaders is the classic arcade game — waves of aliens
              marching down the screen while you fire back from a moving cannon.
              I built this version in TypeScript as a way to play with game
              loops and rendering in the browser.
            </Typography>
            <Typography variant="body1">
              The playable build is embedded below on wider screens. On a phone
              you can play it full screen over on{" "}
              <ExternalLink
                url="https://typescript-dg8ddk.stackblitz.io/"
                label="StackBlitz"
              />
              .
            </Typography>
          </Box>
        </section>
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        lg={6}
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <iframe
          title="Space Invaders game"
          src="https://typescript-dg8ddk.stackblitz.io/"
          style={{
            border: "none",
            overflow: "hidden",
            height: "400px",
            width: "400px",
          }}
        />
      </Grid>
    </Grid>
  );
}
