import React from "react";
import { Typography } from "@mui/material";
import { StarSiege } from "@norarcasey/star-siege-nora";
import { ExternalLink } from "../components/ExternalLink";
import { ProjectShowcase } from "../components/ProjectShowcase";
import { usePageMeta } from "../hooks/usePageMeta";

export function SpaceInvadersPage(): React.ReactElement {
  usePageMeta(
    "Star Siege",
    "Star Siege — a retro arcade space-shooter by Nora Casey, published as a React component on npm and playable in the browser."
  );

  return (
    <ProjectShowcase
      title="Star Siege"
      npmPackage="@norarcasey/star-siege-nora"
      hideGameOnMobile
      game={
        <StarSiege
          cellSize={28}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        />
      }
    >
      <Typography variant="body1">
        Star Siege is my take on the classic arcade space-shooter — waves of
        invaders marching down the screen while you fire back from a moving
        ship. I built it in TypeScript to play with game loops and canvas
        rendering in the browser.
      </Typography>
      <Typography variant="body1">
        It's published as a React component on npm — dropped straight into this
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
    </ProjectShowcase>
  );
}
