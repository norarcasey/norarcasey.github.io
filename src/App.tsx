import React from "react";
import { Link } from "react-router-dom";

import { About } from "./components/About";

import "./App.css";

function App() {
  return (
    <section className="tiles">
      <About />

      <section className="tile">
        <h2>Projects</h2>
        <Link to="/mine-sweeper">
          <h3>Mine Sweeper</h3>
        </Link>
      </section>
    </section>
  );
}

export default App;
