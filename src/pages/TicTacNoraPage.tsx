import React from "react";
import { Typography } from "@mui/material";
import { TicTacNora } from "@norarcasey/tic-tac-nora";
import "@norarcasey/tic-tac-nora/style.css";

import { ExternalLink } from "../components/ExternalLink";
import { ProjectShowcase } from "../components/ProjectShowcase";
import { usePageMeta } from "../hooks/usePageMeta";

export function TicTacNoraPage(): React.ReactElement {
  usePageMeta(
    "Tic Tac Nora",
    "Tic Tac Nora — a tic-tac-toe game by Nora Casey, published as a React component on npm and playable in the browser. Try to beat Nora's minimax AI."
  );

  return (
    <ProjectShowcase
      title="Tic Tac Nora"
      npmPackage="@norarcasey/tic-tac-nora"
      game={<TicTacNora difficulty="smart" />}
    >
      <Typography variant="body1">
        Tic Tac Nora is my spin on tic-tac-toe — you play X and go first, and
        Nora plays O. Behind the scenes she runs a minimax search, so she always
        takes a win, always blocks yours, and never loses a game she could draw.
        The best you can do is force a tie.
      </Typography>
      <Typography variant="body1">
        It's published as a React component on npm — dropped straight into this
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
    </ProjectShowcase>
  );
}
