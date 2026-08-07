import React from "react";
import { Typography } from "@mui/material";
import { StarSiege } from "@norarcasey/star-siege-nora";
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

export function SpaceInvadersPage(): React.ReactElement {
  useRouteMeta("/space-invaders");

  return (
    <ProjectShowcase>
      <ShowcaseHeader title="Star Siege" />

      <ShowcaseSummary>
        <NpmBadge npmPackage="@norarcasey/star-siege-nora" title="Star Siege" />
        <Typography variant="body1">
          Star Siege is my take on the classic arcade space-shooter: waves of
          invaders marching down the screen while you fire back from a moving
          ship. I built it in TypeScript to play with game loops and canvas
          rendering in the browser.
        </Typography>
        <Typography variant="body1">
          It's published as a React component on npm, dropped straight into this
          page. Grab it from{" "}
          <ExternalLink
            url="https://www.npmjs.com/package/@norarcasey/star-siege-nora"
            label="npm"
          />
          .
        </Typography>
        <Typography variant="body1">
          Arrow keys move your ship; space or up fires; P to pause.
        </Typography>
      </ShowcaseSummary>

      <ShowcaseGame hideOnMobile>
        <StarSiege
          cellSize={28}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        />
      </ShowcaseGame>

      <ShowcaseDetails>
        <StackFacts
          facts={[
            {
              label: "Game core",
              value:
                "The repo splits into src/engine and src/react: waves, movement, firing, and collisions are plain TypeScript, and the React layer feeds it input and renders what comes back. The same engine drives the demo, the tests, and the published component.",
            },
            ...COMPONENT_LIBRARY_FACTS,
          ]}
        />
      </ShowcaseDetails>
    </ProjectShowcase>
  );
}
