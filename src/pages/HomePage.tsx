import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import { About } from "../components/About";
import { ProjectBox } from "../components/ProjectBox";

function Home() {
  return (
    <section className="tiles">
      <Grid container display="flex" flexDirection="column" alignItems="center">
        <Grid item xs={12} sm={12} md={11} lg={10} xl={9}>
          <About />
        </Grid>
        <Grid item xs={12} sm={12} md={11} lg={10} xl={9} width="100%">
          <section className="tile">
            <Typography variant="h3">Projects</Typography>
            <Box display="flex" justifyContent="start" flexWrap="wrap" gap={2}>
              <ProjectBox title="Mine Sweeper" url="/mine-sweeper" />
              <ProjectBox title="Duck Armageddon" url="/duck-armageddon" />
              <ProjectBox title="Space Invaders" url="/space-invaders" />
              <ProjectBox title="Piano" url="/piano" />
            </Box>
          </section>
        </Grid>
      </Grid>
    </section>
  );
}

export default Home;
