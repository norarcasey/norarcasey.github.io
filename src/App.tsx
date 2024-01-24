import React from "react";
import { Grid } from "@mui/material";
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
            <h2>Projects</h2>
            <Link to="/mine-sweeper">
              <h3>Mine Sweeper</h3>
            </Link>
          </section>
        </Grid>
      </Grid>
    </section>
  );
}

export default App;
