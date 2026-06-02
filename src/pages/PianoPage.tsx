import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ExternalLink } from "../components/ExternalLink";
import { usePageMeta } from "../hooks/usePageMeta";

export function PianoPage(): React.ReactElement {
  usePageMeta(
    "Piano",
    "A playable browser piano built with tone.js by Nora Casey."
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
            <Typography variant="h3">Piano</Typography>
          </Box>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="body1">
              At a previous job, one of our design interview questions was
              "build a piano." I'd been part of asking it — shadowing interviews
              and talking through it in the abstract — but I'd never actually
              built one myself. It didn't feel fair to ask candidates to design
              something I hadn't tried in practice, so I built it. It turns out
              there's a lot more to a piano than the whiteboard version lets on.{" "}
              <ExternalLink
                url="https://noracasey.com/keyboard/"
                label="Can you play the piano?"
              />
            </Typography>
            <Typography variant="body1">
              I needed a test track while wiring it up to tone.js, so I used
              "Axel F" — and there's still an Easter egg in the app if you click
              the play button without recording any notes.
            </Typography>

            <Typography variant="body1">
              The piano code is hosted on{" "}
              <ExternalLink
                url={"https://github.com/norarcasey/keyboard/"}
                label="Github"
              />
              .
            </Typography>

            <Typography variant="body1">
              If you want to build something with tone.js yourself, here are
              their docs:{" "}
              <ExternalLink url="https://tonejs.github.io/" label="Tone.js" />
            </Typography>
          </Box>
        </section>
      </Grid>
    </Grid>
  );
}
