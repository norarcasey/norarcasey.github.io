import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import { About } from "../components/About";
import { ProjectBox } from "../components/ProjectBox";

function Home() {
  return (
    <section className="tiles">
      <Grid container display="flex" flexDirection="column" alignItems="center">
        <Grid item xs={12} md={10} lg={9} xl={8}>
          <About />
        </Grid>
        <Grid item xs={12} md={10} lg={9} xl={8} width="100%">
          <section className="tile">
            <Typography variant="h3">Projects</Typography>
            <Box display="flex" justifyContent="start" flexWrap="wrap" gap={2}>
              <ProjectBox title="Mine Sweeper" url="/mine-sweeper" />
              <ProjectBox title="Duck Armageddon" url="/duck-armageddon" />
            </Box>
          </section>
        </Grid>
      </Grid>
    </section>
  );
}

export default Home;
