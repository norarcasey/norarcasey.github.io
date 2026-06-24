import React from "react";
import { Typography } from "@mui/material";
import { Arkanora } from "@norarcasey/arkanora";
import "@norarcasey/arkanora/style.css";

import { ExternalLink } from "../components/ExternalLink";
import { ProjectShowcase } from "../components/ProjectShowcase";
import { usePageMeta } from "../hooks/usePageMeta";

export function ArkanoraPage(): React.ReactElement {
  usePageMeta(
    "Arkanora",
    "Arkanora, a browser take on the classic brick-breaker by Nora Casey, published as a React component on npm. Steer the paddle with the arrow keys and clear every brick."
  );

  return (
    <ProjectShowcase
      title="Arkanora"
      npmPackage="@norarcasey/arkanora"
      game={<Arkanora title={null} />}
    >
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
    </ProjectShowcase>
  );
}
