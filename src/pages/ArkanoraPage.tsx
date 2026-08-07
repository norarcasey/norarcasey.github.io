import React from "react";
import { Typography } from "@mui/material";
import { Arkanora } from "@norarcasey/arkanora";
import "@norarcasey/arkanora/style.css";

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
import { useRouteMeta } from "../hooks/usePageMeta";

export function ArkanoraPage(): React.ReactElement {
  useRouteMeta("/arkanora");

  return (
    <ProjectShowcase>
      <ShowcaseHeader title="Arkanora" />

      <ShowcaseSummary>
        <NpmBadge npmPackage="@norarcasey/arkanora" title="Arkanora" />
        <Typography variant="body1">
          Arkanora is my take on the classic brick-breaker. Bounce the ball off
          your paddle to chip away at the wall of bricks, and don't let it slip
          past you. I built it in TypeScript to play with real-time collision
          physics and a steady tick loop in the browser.
        </Typography>
        <Typography variant="body1">
          It's published as a React component on npm, dropped straight into this
          page. Grab it from{" "}
          <ExternalLink
            url="https://www.npmjs.com/package/@norarcasey/arkanora"
            label="npm"
          />
          .
        </Typography>
        <Typography variant="body1">
          Press Start, then steer the paddle with the arrow keys or A and D.
        </Typography>
      </ShowcaseSummary>

      <ShowcaseGame>
        <Arkanora title={null} />
      </ShowcaseGame>

      <ShowcaseDetails>
        <StackFacts
          facts={[
            {
              label: "Game core",
              value:
                "Ball physics, paddle deflection, brick collisions, and level state are handled by a pure reducer in src/game: one transition per tick, with the React components rendering whatever it returns.",
            },
            ...COMPONENT_LIBRARY_FACTS,
          ]}
        />
      </ShowcaseDetails>
    </ProjectShowcase>
  );
}
