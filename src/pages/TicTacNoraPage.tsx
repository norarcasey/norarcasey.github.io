import React from "react";
import { Box, Typography } from "@mui/material";
import { TicTacNora } from "@norarcasey/tic-tac-nora";
import "@norarcasey/tic-tac-nora/style.css";

import { ExternalLink } from "../components/ExternalLink";
import { MinimaxDiagram } from "../components/MinimaxDiagram";
import { NpmBadge } from "../components/NpmBadge";
import {
  ProjectShowcase,
  ShowcaseDetails,
  ShowcaseGame,
  ShowcaseHeader,
  ShowcaseSummary,
} from "../components/ProjectShowcase";
import { StackFacts } from "../components/StackFacts";
import { COMPONENT_LIBRARY_FACTS } from "../data/projectStack";
import { useRouteMeta } from "../hooks/usePageMeta";

export function TicTacNoraPage(): React.ReactElement {
  useRouteMeta("/tic-tac-nora");

  return (
    <ProjectShowcase>
      <ShowcaseHeader title="Tic Tac Nora" />

      <ShowcaseSummary>
        <NpmBadge npmPackage="@norarcasey/tic-tac-nora" title="Tic Tac Nora" />
        <Typography variant="body1">
          Tic Tac Nora is my spin on tic-tac-toe. You play X and go first, and
          Nora plays O. Behind the scenes she runs a minimax search, so she
          always takes a win, always blocks yours, and never loses a game she
          could draw. The best you can do is force a tie.
        </Typography>
        <Typography variant="body1">
          It's published as a React component on npm, dropped straight into this
          page. Grab it from{" "}
          <ExternalLink
            url="https://www.npmjs.com/package/@norarcasey/tic-tac-nora"
            label="npm"
          />
          .
        </Typography>
        <Typography variant="body1">
          Click any open square to make your move; press New Game to start over.
        </Typography>
      </ShowcaseSummary>

      <ShowcaseGame>
        <TicTacNora difficulty="smart" />
      </ShowcaseGame>

      <ShowcaseDetails>
        <MinimaxDiagram />
        <Box sx={{ mt: 4 }}>
          <StackFacts
            facts={[
              {
                label: "Opponent",
                value:
                  "Nora's moves come from a minimax search over the game tree. The search is a pure function of the board: given the same position she plays the same move every time, so tests assert the exact move for a given position.",
              },
              {
                label: "Configurable",
                value:
                  "Difficulty is a prop on the component, so a host app can mount a beatable opponent or the unbeatable one. This page mounts the smart setting.",
              },
              ...COMPONENT_LIBRARY_FACTS,
            ]}
          />
        </Box>
      </ShowcaseDetails>
    </ProjectShowcase>
  );
}
