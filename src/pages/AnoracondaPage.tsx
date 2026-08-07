import React from "react";
import { Typography } from "@mui/material";
import { Anoraconda } from "@norarcasey/anoraconda";
import "@norarcasey/anoraconda/style.css";

import { ExternalLink } from "../components/ExternalLink";
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
import { usePageMeta } from "../hooks/usePageMeta";

export function AnoracondaPage(): React.ReactElement {
  usePageMeta(
    "Anoraconda",
    "Anoraconda, a browser take on the classic Snake game by Nora Casey, published as a React component on npm. Steer with the arrow keys or WASD and chase the apples."
  );

  return (
    <ProjectShowcase>
      <ShowcaseHeader title="Anoraconda" />

      <ShowcaseSummary>
        <NpmBadge npmPackage="@norarcasey/anoraconda" title="Anoraconda" />
        <Typography variant="body1">
          Anoraconda is my take on the classic Snake game. Guide the snake
          around the board to eat apples, growing a little longer with each one,
          and try not to run into the walls or your own tail. I built it in
          TypeScript to play with grid-based game state and a steady tick loop
          in the browser.
        </Typography>
        <Typography variant="body1">
          It's published as a React component on npm, dropped straight into this
          page. Grab it from{" "}
          <ExternalLink
            url="https://www.npmjs.com/package/@norarcasey/anoraconda"
            label="npm"
          />
          .
        </Typography>
        <Typography variant="body1">
          Press Start, then steer with the arrow keys or WASD.
        </Typography>
      </ShowcaseSummary>

      <ShowcaseGame>
        <Anoraconda title={null} />
      </ShowcaseGame>

      <ShowcaseDetails>
        <StackFacts
          facts={[
            {
              label: "Game core",
              value:
                "The board is a grid of cells advanced by a fixed tick, so each tick is a single state transition covering movement, growth, apple placement, and the wall or tail collision that ends the run. The tick is the only clock, so the game behaves the same regardless of frame rate.",
            },
            ...COMPONENT_LIBRARY_FACTS,
          ]}
        />
      </ShowcaseDetails>
    </ProjectShowcase>
  );
}
