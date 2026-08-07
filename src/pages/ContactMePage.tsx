import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLink } from "@fortawesome/free-solid-svg-icons";
import { ExternalLink } from "../components/ExternalLink";
import { useRouteMeta } from "../hooks/usePageMeta";

export function ContactMePage(): React.ReactElement {
  useRouteMeta("/contact-me");

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
            <Typography variant="h3" component="h2">
              Contact Me
            </Typography>
            <Typography variant="body1">
              The best way to reach me is by email, or find me on the links
              below.
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body1">
                <FontAwesomeIcon icon={faEnvelope} />{" "}
                <a className="inline-link" href="mailto:noracasey@duck.com">
                  noracasey@duck.com
                </a>
              </Typography>
              <Typography variant="body1">
                <FontAwesomeIcon icon={faLink} />{" "}
                <ExternalLink
                  url="https://www.linkedin.com/in/nora-casey/"
                  label="LinkedIn"
                />
              </Typography>
              <Typography variant="body1">
                <FontAwesomeIcon icon={faLink} />{" "}
                <ExternalLink
                  url="https://github.com/norarcasey"
                  label="GitHub"
                />
              </Typography>
            </Box>
          </Box>
        </section>
      </Grid>
    </Grid>
  );
}
