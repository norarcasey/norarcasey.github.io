import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import { ExternalLink } from "../components/ExternalLink";
import { usePageMeta } from "../hooks/usePageMeta";

export function DuckArmageddonPage(): React.ReactElement {
  usePageMeta(
    "Duck Armageddon",
    "Duck Armageddon — a playful browser game experiment in color matching by Nora Casey."
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
            <Typography variant="h3">Duck Armageddon</Typography>
            <Typography variant="body1">
              There is a Youtube show called{" "}
              <ExternalLink
                url={"https://www.youtube.com/@Drawfee"}
                label="Drawfee"
              />{" "}
              that I adore and watch new episodes every Tuesday and Thursday. In
              one{" "}
              <ExternalLink
                url="https://www.youtube.com/watch?v=HLG09i1izNQ&t=1597s"
                label="episode"
              />
              , the prompt was to design games based on the random name they
              got. I highly recommend checking them out!
            </Typography>
            <Typography variant="body1">
              Duck Armageddon was a silly experiment to try out color matching
              by embedding HTML elements that match the artwork.
            </Typography>
            <p>
              The code for Duck Armageddon is hosted on{" "}
              <ExternalLink
                url="https://github.com/norarcasey/duck-armageddon"
                label="Github"
              />
              .
            </p>
          </Box>
        </section>
      </Grid>
      <Grid
        sx={{ display: { xs: "none", md: "block" } }}
        size={{
          xs: 12,
          md: 8,
          lg: 6,
        }}
      >
        <iframe
          title="Duck Armageddon game"
          src="https://duck-armageddon.stackblitz.io/"
          style={{
            border: "none",
            overflow: "hidden",
            height: "550px",
            width: "700px",
          }}
        />
      </Grid>
      <Grid
        sx={{ display: { xs: "block", md: "none" } }}
        size={{
          xs: 12,
          md: 8,
          lg: 6,
        }}
      >
        <iframe
          title="Duck Armageddon game"
          src="https://duck-armageddon.stackblitz.io/"
          style={{
            border: "none",
            overflow: "hidden",
            height: "600px",
            width: "450px",
          }}
        />
      </Grid>
    </Grid>
  );
}
