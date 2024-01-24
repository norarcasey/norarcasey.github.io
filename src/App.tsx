import React from "react";
import { Link } from "react-router-dom";

import MineSweeper, { Difficulty } from "@norarcasey/mine-sweeper";
import "./App.css";

function App() {
  return (
    <section className="tiles">
      <section className="tile">
        <h2>About</h2>
        <article
          style={{
            maxWidth: 400,
            marginTop: 10,
            marginBottom: 10,
            display: "flex",
            flexDirection: "column",
            gap: 15,
            lineHeight: "1.5rem",
          }}
        >
          <p>
            My mission is to collaborate with my team and stakeholders on
            challenging and complex frontend and full stack issues, and to
            deliver solutions that are right for the customer, reliable, and
            user-friendly.
          </p>
          <p>
            I mentor junior engineers and share my knowledge and best practices
            with others.
          </p>
          <p>
            In my spare time, I create indoor and outdoor stock photography.
            Check out my work on{" "}
            <a
              href="https://www.gettyimages.com/search/photographer?photographer=Nora%20Casey&assettype=image&sort=mostpopular&family=creative"
              target="_blank"
              rel="noreferrer"
            >
              Getty Images
            </a>
          </p>
        </article>
      </section>

      <section className="tile">
        <h2>Projects</h2>
        <Link to="/mine-sweeper">
          <h3>Mine Sweeper</h3>
        </Link>
        <article>
          <a
            href="https://www.npmjs.com/package/@norarcasey/mine-sweeper"
            target="_blank"
            rel="noreferrer"
          >
            NPM
          </a>
          <br />
          <a
            href="https://github.com/norarcasey/mine-sweeper"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </article>
        <MineSweeper difficulty={Difficulty.Beginner} />
      </section>
    </section>
  );
}

export default App;
