import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { MineSweeper, Difficulty } from "@norarcasey/mine-sweeper";

export function MineSweeperPage(): React.ReactElement {
  const [difficulty, setDifficulty] = useState(Difficulty.Beginner);

  return (
    <Grid container display="flex" flexDirection="column" alignItems="center">
      <Grid item xs={12} md={8} lg={6}>
        <section className="tile">
          <Typography variant="h3">Mine Sweeper</Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="body1">
              Mine sweeper was inspired by a interview I did back in 2018. The
              prompt was on the white board, "build the popular Windows game
              Mine sweeper".
            </Typography>

            <Typography variant="body1">
              After the interview, I went home and built a version using React
              with Redux. I built a very bare bones example that was just the
              beginner level and have always wanted to go back and extend the
              project to have the different difficulty levels.
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
        item
        xs={12}
        md={8}
        lg={6}
      >
        <Grid
          item
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
        <Grid item sx={{ display: { xs: "none", md: "flex" } }}>
          {difficulty === 10 && <MineSweeper difficulty={difficulty} />}
          {difficulty === 40 && <MineSweeper difficulty={difficulty} />}
          {difficulty === 99 && <MineSweeper difficulty={difficulty} />}
        </Grid>
        <Grid item sx={{ display: { xs: "flex", md: "none" } }}>
          <MineSweeper difficulty={Difficulty.Beginner} />
        </Grid>
      </Grid>
    </Grid>
  );
}
