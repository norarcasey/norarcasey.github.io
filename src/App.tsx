import React from "react";

import MineSweeper, { Difficulty } from "@norarcasey/mine-sweeper";

import "./App.css";

function App() {
  return (
    <div className="App">
      <section className="page">
        <header>
          <h1>Nora Casey</h1>
        </header>
        <section className="tiles">
          <section className="tile">
            <h2>About</h2>
            <p>I'm a software engineer based in Seattle, WA.</p>
            <p>I write web applications in React & Typescript.</p>
          </section>

          <section className="tile">
            <h2>Resume</h2>
          </section>

          <section className="tile">
            <h2>Projects</h2>
            <MineSweeper difficulty={Difficulty.Beginner} />
          </section>
        </section>
      </section>
    </div>
  );
}

export default App;
