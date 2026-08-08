import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { About } from "../components/About";
import { Hero, HOME_BAND_MAX_WIDTH } from "../components/Hero";
import { FeaturedProject } from "../components/FeaturedProject";
import { ProjectBox } from "../components/ProjectBox";
import { SkillsMatrix } from "../components/SkillsMatrix";
import { useRouteMeta } from "../hooks/usePageMeta";
import {
  ACCENT_BLUE,
  ACCENT_PINK,
  ACCENT_PINK_HOVER,
  DECORATIVE_PINK,
} from "../colors";

import mineSweeperScreen from "../assets/screens/mine-sweeper.webp";
import starSiegeScreen from "../assets/screens/star-siege.webp";
import ticTacNoraScreen from "../assets/screens/tic-tac-nora.webp";
import anoracondaScreen from "../assets/screens/anoraconda.webp";
import arkanoraScreen from "../assets/screens/arkanora.webp";
import pianoraScreen from "../assets/screens/pianora.webp";
import legendsOfNoragonScreen from "../assets/screens/legends-of-noragon.webp";

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

      {/* Full-stack range, layer by layer, before the project spotlight */}
      <Box sx={{ width: "100%", maxWidth: HOME_BAND_MAX_WIDTH, mx: "auto" }}>
        <SkillsMatrix intro="I have shipped production work at each of these layers. Each project page has a write-up of how that project is built." />
      </Box>

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
              <ProjectBox
                title="Legends of Noragon"
                url="/legends-of-noragon"
                image={legendsOfNoragonScreen}
                description="A dungeon crawler with procedurally generated dungeons. No two descents into Noragon are the same."
              />
              <ProjectBox
                title="Mine Sweeper"
                url="/mine-sweeper"
                image={mineSweeperScreen}
                description="The classic flag-the-bombs puzzle. Clear the board without detonating a mine."
              />
              <ProjectBox
                title="Pianora"
                url="/pianora"
                image={pianoraScreen}
                description="A playable browser piano. Tap or type to make music in your key of choice."
              />
              <ProjectBox
                title="Arkanora"
                url="/arkanora"
                image={arkanoraScreen}
                description="A brick-breaker in the Arkanoid tradition. Bounce the ball to smash every block."
              />
              <ProjectBox
                title="Anoraconda"
                url="/anoraconda"
                image={anoracondaScreen}
                description="Guide the growing snake to eat and survive without biting your own tail."
              />

              <ProjectBox
                title="Star Siege"
                url="/space-invaders"
                image={starSiegeScreen}
                description="A retro arcade shooter: blast waves of descending invaders before they reach you."
              />
              <ProjectBox
                title="Tic Tac Nora"
                url="/tic-tac-nora"
                image={ticTacNoraScreen}
                description="A quick, friendly twist on tic-tac-toe. Line up three to win."
                divider={false}
              />
            </Box>
          </section>
        </Grid>
      </Grid>
    </section>
  );
}

export default Home;
