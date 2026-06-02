import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { MineSweeper, Difficulty } from "@norarcasey/mine-sweeper";

import { usePageMeta } from "../hooks/usePageMeta";

export function MineSweeperPage(): React.ReactElement {
  usePageMeta(
    "Mine Sweeper",
    "A React Mine Sweeper game by Nora Casey, also published as the @norarcasey/mine-sweeper npm package."
  );

  const [difficulty, setDifficulty] = useState(Difficulty.Beginner);

  return (
    <Grid container display="flex" flexDirection="column" alignItems="center">
      <Grid
        size={{
          xs: 12,
          md: 8,
          lg: 6,
        }}
      >
        <section className="tile">
          <Typography variant="h3">Mine Sweeper</Typography>

          <Box mb={2}>
            <a
              href="https://www.npmjs.com/package/@norarcasey/mine-sweeper"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View the Mine Sweeper package on npm"
            >
              <img
                src="https://img.shields.io/npm/v/@norarcasey/mine-sweeper?logo=npm&label=mine-sweeper"
                alt="Mine Sweeper npm version"
              />
            </a>
          </Box>

          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="body1">
              Mine Sweeper started as a whiteboard prompt in a 2018 interview:
              "build the popular Windows game Mine Sweeper." The interview was
              over in an hour, but the problem stuck with me — so I went home
              and actually built it in React and Redux.
            </Typography>

            <Typography variant="body1">
              That first version was bare bones, just the beginner level. I kept
              coming back to it over the years, extending it into the
              multi-difficulty game you can play here and packaging it as a
              reusable library along the way.
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              If you don't see the level selector try a larger screen size.
              Currently only Beginner is enabled in small screen sizes.
            </Typography>

            <Typography variant="body1">
              If you are interested in using Mine Sweeper in your own work, it
              is in a public{" "}
              <a
                href="https://www.npmjs.com/package/@norarcasey/mine-sweeper"
                target="_blank"
                rel="noreferrer"
              >
                NPM
              </a>{" "}
              package. The source code for Mine Sweeper is on{" "}
              <a
                href="https://github.com/norarcasey/mine-sweeper"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
              . I am still actively developing features for minesweeper.
            </Typography>
          </Box>
        </section>
      </Grid>
      <Grid
        container
        display="flex"
        flexDirection="column"
        alignItems="center"
        size={{
          xs: 12,
          md: 8,
          lg: 6,
        }}
      >
        <Grid
          display="flex"
          gap={2}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <input
            type="radio"
            id="beginner"
            name="difficulty"
            value={Difficulty.Beginner}
            checked={difficulty === Difficulty.Beginner}
            onChange={() => setDifficulty(Difficulty.Beginner)}
          />
          <label htmlFor="beginner">Beginner</label>

          <input
            type="radio"
            id="intermediate"
            name="difficulty"
            value={Difficulty.Intermediate}
            checked={difficulty === Difficulty.Intermediate}
            onChange={() => setDifficulty(Difficulty.Intermediate)}
          />
          <label htmlFor="intermediate">Intermediate</label>
          <input
            type="radio"
            id="expert"
            name="difficulty"
            value={Difficulty.Expert}
            checked={difficulty === Difficulty.Expert}
            onChange={() => setDifficulty(Difficulty.Expert)}
          />
          <label htmlFor="expert">Expert</label>
        </Grid>
        <Grid sx={{ display: { xs: "none", md: "flex" } }}>
          {difficulty === 10 && <MineSweeper difficulty={difficulty} />}
          {difficulty === 40 && <MineSweeper difficulty={difficulty} />}
          {difficulty === 99 && <MineSweeper difficulty={difficulty} />}
        </Grid>
        <Grid sx={{ display: { xs: "flex", md: "none" } }}>
          <MineSweeper difficulty={Difficulty.Beginner} />
        </Grid>
      </Grid>
    </Grid>
  );
}
