import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ExternalLink } from "../components/ExternalLink";

export function PianoPage(): React.ReactElement {
  return (
    <Grid container display="flex" flexDirection="column" alignItems="center">
      <Grid item xs={12} md={8} lg={6}>
        <section className="tile">
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h3">Piano</Typography>
          </Box>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="body1">
              At a previous job, we had a design interview question that was to
              build a piano. I had only talked about it hypothetically and never
              actually built one. My gut told me this really isn't a good design
              interview question. I thought it was only fair to the interviewers
              I was shadowing and interviewees that were receiving this question
              to actually build one myself. And see what building this in
              practice actually looks like.{" "}
              <ExternalLink
                url="https://noracasey.com/keyboard/"
                label="Can you play the piano?"
              />
            </Typography>
            <Typography variant="body1">
              I needed a test track to play while wiring this up to tone.js. I
              chose Alex f and there is still an Easter Egg in the app if you
              click the play button without recording any notes.
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
              If you want to build something with tone.js, here is a link this
              their documentation.{" "}
              <ExternalLink url="https://tonejs.github.io/" label="Tone.js" />
            </Typography>
          </Box>
        </section>
      </Grid>
      <Grid></Grid>
    </Grid>
  );
}
