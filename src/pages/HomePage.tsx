import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { About } from "../components/About";

function Home() {
  return (
    <section className="tiles">
      <Grid container display="flex" flexDirection="column" alignItems="center">
        <Grid item xs={12} md={10} lg={8} xl={7}>
          <About />
        </Grid>
        <Grid item xs={12} md={10} lg={8} xl={7} width="100%">
          <section className="tile">
            <Typography variant="h3">Projects</Typography>
            <Box display="flex" justifyContent="start" flexWrap="wrap" gap={2}>
              <Box className="project-box">
                <Typography variant="h5">
                  <Link to="/mine-sweeper">Mine Sweeper</Link>
                </Typography>
              </Box>
              <Box className="project-box">
                <Typography variant="h5">
                  <Link to="/duck-armageddon">Duck Armageddon</Link>
                </Typography>
              </Box>
              <Box className="project-box">
                <Typography variant="h5">
                  <Link to="/">tbd 1</Link>
                </Typography>
              </Box>
              <Box className="project-box">
                <Typography variant="h5">
                  <Link to="/">tbd 2</Link>
                </Typography>
              </Box>
            </Box>
          </section>
        </Grid>
      </Grid>
    </section>
  );
}

export default Home;
