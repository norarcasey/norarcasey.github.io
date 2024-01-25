import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { ExternalLink } from "./ExternalLink";

export function About(): React.ReactElement {
  return (
    <section className="tile">
      <Typography variant="h3">About</Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="body1">
          My primary aim is to deliver software that people <b>use</b> and
          improves their quality of life or work by making what they do easier
          and faster to do, with consistent and measureable value in their
          results. I enjoy collaborating with teams and stakeholders on
          challenging and complex frontend and full stack issues. I work to
          deliver solutions that are right for the customer, reliable, and
          user-friendly.
        </Typography>

        <Typography variant="body1">
          Check me out on{" "}
          <ExternalLink
            url="https://www.linkedin.com/in/nora-casey/"
            label="linkedin"
          />{" "}
          or <ExternalLink url="https://github.com/norarcasey" label="github" />
          .
        </Typography>

        <Typography variant="body1">
          I love to mentor other engineers. I apply a mix of listening, goal
          setting, leading by example, and offering ideas to help others achieve
          their goals.
        </Typography>
        <Typography variant="body1">
          In my spare time, I create indoor and outdoor stock photography. Check
          out my work on{" "}
          <a
            href="https://www.gettyimages.com/search/photographer?photographer=Nora%20Casey&assettype=image&sort=mostpopular&family=creative"
            target="_blank"
            rel="noreferrer"
          >
            Getty Images
          </a>
          , I am a member of the Seattle{" "}
          <ExternalLink
            url="https://www.seattleguitar.org/"
            label="Classical Guitar Society"
          />
          , and I am in the last semester of Graduate School at Georgia Tech.
        </Typography>
      </Box>
    </section>
  );
}
