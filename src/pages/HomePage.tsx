import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { About } from "../components/About";
import { Hero, HOME_BAND_MAX_WIDTH } from "../components/Hero";
import { FeaturedProject } from "../components/FeaturedProject";
import { LatestPost } from "../components/LatestPost";
import { ProjectBox } from "../components/ProjectBox";
import { OTHER_PROJECTS } from "../data/projects";
import { useRouteMeta } from "../hooks/usePageMeta";
import {
  ACCENT_BLUE,
  ACCENT_PINK,
  ACCENT_PINK_HOVER,
  DECORATIVE_PINK,
} from "../colors";

function Home() {
  useRouteMeta("/");

  return (
    <section className="tiles">
      {/* Top row: the pitch beside a recruiter call to action */}
      <Grid
        container
        alignItems="stretch"
        sx={{ width: "100%", maxWidth: HOME_BAND_MAX_WIDTH, mx: "auto" }}
      >
        <Grid size={{ xs: 12, md: 8 }} sx={{ display: "flex" }}>
          <Hero />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex" }}>
          <Box
            component="section"
            className="tile"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              borderLeft: { md: `dashed 1px ${DECORATIVE_PINK}` },
              pl: { md: 4 },
              justifyContent: "center",
            }}
          >
            <Typography variant="h3" component="h2">
              Let&apos;s work together
            </Typography>
            <Typography variant="body1" sx={{ color: "#4a4f57", mt: 2, mb: 2 }}>
              I&apos;m looking for my next staff or leadership role, somewhere I
              can own problems end to end and shape the technology and direction
              of the team while staying close to the code. If that sounds like a
              fit, I&apos;d love to talk.
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1.5} mt={1}>
              <Button
                variant="contained"
                component={Link}
                to="/resume"
                sx={{
                  backgroundColor: ACCENT_PINK,
                  "&:hover": { backgroundColor: ACCENT_PINK_HOVER },
                  fontWeight: 600,
                }}
              >
                View résumé
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to="/contact-me"
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
                Get in touch
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Newest writing, then the project spotlight, then the stack pitch */}
      <LatestPost />

      <FeaturedProject />

      {/* About me (2) beside projects (1) */}
      <Grid
        container
        sx={{
          width: "100%",
          maxWidth: HOME_BAND_MAX_WIDTH,
          mx: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid size={{ xs: 12, md: 7 }}>
          <About />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <section className="tile">
            <Typography variant="h3" component="h2">
              More projects
            </Typography>
            <Box
              display="flex"
              justifyContent="start"
              flexWrap="wrap"
              gap={2}
              mt={2}
            >
              {OTHER_PROJECTS.map((project, index) => (
                <ProjectBox
                  key={project.path}
                  title={project.name}
                  url={project.path}
                  image={project.screenshot}
                  description={project.blurb}
                  divider={index < OTHER_PROJECTS.length - 1}
                />
              ))}
            </Box>
          </section>
        </Grid>
      </Grid>
    </section>
  );
}

export default Home;
