import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import { About } from "../components/About";
import { ProjectBox } from "../components/ProjectBox";
import { usePageMeta } from "../hooks/usePageMeta";

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
              <ProjectBox title="Mine Sweeper" url="/mine-sweeper" />
              <ProjectBox title="Star Siege" url="/space-invaders" />
              <ProjectBox title="Tic Tac Nora" url="/tic-tac-nora" />
              <ProjectBox title="Anoraconda" url="/anoraconda" />
              <ProjectBox title="Arkanora" url="/arkanora" />
              <ProjectBox title="Pianora" url="/pianora" />
            </Box>
          </section>
        </Grid>
      </Grid>
    </section>
  );
}

export default Home;
