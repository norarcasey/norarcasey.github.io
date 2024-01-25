import React from "react";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { About } from "./components/About";

import "./App.css";

function App() {
  return (
    <section className="tiles">
      <Grid container display="flex" flexDirection="column" alignItems="center">
        <Grid item xs={12} md={8} lg={6}>
          <About />
        </Grid>
        <Grid item xs={12} md={8} lg={6} width="100%">
          <section className="tile">
            <Typography variant="h3">Projects</Typography>
            <Typography variant="h5">
              <Link to="/mine-sweeper">Mine Sweeper</Link>
            </Typography>
            <Typography variant="h5">
              <Link to="/duck-armageddon">Duck Armageddon</Link>
            </Typography>
          </section>
        </Grid>
      </Grid>
    </section>
  );
}

export default App;
