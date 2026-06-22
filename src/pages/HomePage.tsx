import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import { About } from "../components/About";
import { ProjectBox } from "../components/ProjectBox";
import { usePageMeta } from "../hooks/usePageMeta";

import mineSweeperScreen from "../assets/screens/mine-sweeper.png";
import starSiegeScreen from "../assets/screens/star-siege.png";
import ticTacNoraScreen from "../assets/screens/tic-tac-nora.png";
import anoracondaScreen from "../assets/screens/anoraconda.png";
import arkanoraScreen from "../assets/screens/arkanora.png";
import pianoraScreen from "../assets/screens/pianora.png";
import legendsOfNoragonScreen from "../assets/screens/legends-of-noragon.png";

function Home() {
  usePageMeta(
    "Nora Casey",
    "Nora Casey — software engineer building frontend and full-stack tools that empower people. Browse my projects, résumé, and ways to get in touch."
  );

  return (
    <section className="tiles">
      <Grid container display="flex" flexDirection="column" alignItems="center">
        <Grid
          size={{
            xs: 12,
            sm: 12,
            md: 11,
            lg: 10,
            xl: 9,
          }}
        >
          <About />
        </Grid>
        <Grid
          width="100%"
          size={{
            xs: 12,
            sm: 12,
            md: 11,
            lg: 10,
            xl: 9,
          }}
        >
          <section className="tile">
            <Typography variant="h3">Projects</Typography>
            <Box display="flex" justifyContent="start" flexWrap="wrap" gap={2}>
              <ProjectBox
                title="Mine Sweeper"
                url="/mine-sweeper"
                image={mineSweeperScreen}
                description="The classic flag-the-bombs puzzle — clear the board without detonating a mine."
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
                description="A quick, friendly twist on tic-tac-toe — line up three to win."
              />
              <ProjectBox
                title="Anoraconda"
                url="/anoraconda"
                image={anoracondaScreen}
                description="Guide the growing snake to eat and survive without biting your own tail."
              />
              <ProjectBox
                title="Arkanora"
                url="/arkanora"
                image={arkanoraScreen}
                description="A brick-breaker in the Arkanoid tradition — bounce the ball to smash every block."
              />
              <ProjectBox
                title="Pianora"
                url="/pianora"
                image={pianoraScreen}
                description="A playable browser piano — tap or type to make music in your key of choice."
              />
              <ProjectBox
                title="Legends of Noragon"
                url="https://www.legendsofnoragon.com/"
                image={legendsOfNoragonScreen}
                description="A standalone adventure with its own world and website — step into the legends of Noragon."
              />
            </Box>
          </section>
        </Grid>
      </Grid>
    </section>
  );
}

export default Home;
