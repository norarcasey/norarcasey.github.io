import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { MineSweeper, Difficulty } from "@norarcasey/mine-sweeper";

import { NpmBadge } from "../components/NpmBadge";
import {
  ProjectShowcase,
  ShowcaseDetails,
  ShowcaseGame,
  ShowcaseHeader,
  ShowcaseSummary,
} from "../components/ProjectShowcase";
import { StackFacts } from "../components/StackFacts";
import { usePageMeta } from "../hooks/usePageMeta";

export function MineSweeperPage(): React.ReactElement {
  usePageMeta(
    "Mine Sweeper",
    "A React Mine Sweeper game by Nora Casey, also published as the @norarcasey/mine-sweeper npm package."
  );

  const [difficulty, setDifficulty] = useState(Difficulty.Beginner);

  const board = (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Box display="flex" gap={2} sx={{ display: { xs: "none", md: "flex" } }}>
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
      </Box>

      {/* Desktop: the selected difficulty (keyed renders force a fresh board) */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        {difficulty === Difficulty.Beginner && (
          <MineSweeper difficulty={difficulty} />
        )}
        {difficulty === Difficulty.Intermediate && (
          <MineSweeper difficulty={difficulty} />
        )}
        {difficulty === Difficulty.Expert && (
          <MineSweeper difficulty={difficulty} />
        )}
      </Box>

      {/* Mobile: Beginner only — the larger boards don't fit small screens */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <MineSweeper difficulty={Difficulty.Beginner} />
      </Box>
    </Box>
  );

  return (
    <ProjectShowcase>
      <ShowcaseHeader title="Mine Sweeper" />

      <ShowcaseSummary>
        <NpmBadge npmPackage="@norarcasey/mine-sweeper" title="Mine Sweeper" />
        <Typography variant="body1">
          Mine Sweeper started as a whiteboard prompt in a 2018 interview:
          "build the popular Windows game Mine Sweeper." The interview was over
          in an hour, but the problem stuck with me, so I went home and actually
          built it in React and Redux.
        </Typography>
        <Typography variant="body1">
          That first version was bare bones, just the beginner level. I kept
          coming back to it over the years, extending it into the
          multi-difficulty game you can play here and packaging it as a reusable
          library along the way.
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          If you don't see the level selector try a larger screen size.
          Currently only Beginner is enabled in small screen sizes.
        </Typography>
        <Typography variant="body1">
          It's published as a React component on npm, dropped straight into this
          page. Grab it from{" "}
          <a
            href="https://www.npmjs.com/package/@norarcasey/mine-sweeper"
            target="_blank"
            rel="noreferrer"
          >
            npm
          </a>
          , and the source is on{" "}
          <a
            href="https://github.com/norarcasey/mine-sweeper"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          . I am still actively developing features for Mine Sweeper.
        </Typography>
      </ShowcaseSummary>

      {/* The board grows with difficulty, so the column is sized by content. */}
      <ShowcaseGame width="fit-content">{board}</ShowcaseGame>

      <ShowcaseDetails>
        <StackFacts
          facts={[
            {
              label: "Game core",
              value:
                "Board and scoreboard state live in React context, with generation, the cascading reveal of empty cells, flagging, and win/loss detection factored into helpers beside it so the components stay presentational. Difficulty is a single prop that drives board size and mine count.",
            },
            {
              label: "Documented",
              value:
                "Storybook drives the component in isolation across difficulties and board states, and serves as the reference for anyone installing it.",
            },
            {
              label: "Tested",
              value:
                "Vitest and React Testing Library with coverage reporting, run by GitHub Actions on every push and pull request alongside lint and a typecheck.",
            },
            {
              label: "Released",
              value:
                "Published to npm behind a prepublishOnly gate that runs lint, typecheck, tests, and the library build, so a broken build cannot reach the registry.",
            },
            {
              label: "Running here",
              value:
                "This site installs the package from npm and renders it on this page, so what you are playing is the published artifact.",
            },
          ]}
        />
      </ShowcaseDetails>
    </ProjectShowcase>
  );
}
