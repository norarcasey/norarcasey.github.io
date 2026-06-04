import React from "react";
import { Typography } from "@mui/material";
import { Pianora } from "@norarcasey/pianora";
import "@norarcasey/pianora/style.css";

import { ExternalLink } from "../components/ExternalLink";
import { ProjectShowcase } from "../components/ProjectShowcase";
import { usePageMeta } from "../hooks/usePageMeta";

export function PianoraPage(): React.ReactElement {
  usePageMeta(
    "Pianora",
    "Pianora — a playable browser piano built with Tone.js by Nora Casey, published as a React component on npm. Play with your mouse or computer keyboard, record a melody, and play it back."
  );

  return (
    <ProjectShowcase
      title="Pianora"
      npmPackage="@norarcasey/pianora"
      game={<Pianora title={null} />}
    >
      <Typography variant="body1">
        At a previous job, one of our design interview questions was "build a
        piano." I'd been part of asking it — shadowing interviews and talking
        through it in the abstract — but I'd never actually built one myself. It
        didn't feel fair to ask candidates to design something I hadn't tried in
        practice, so I built it. It turns out there's a lot more to a piano than
        the whiteboard version lets on.
      </Typography>
      <Typography variant="body1">
        I needed a test track while wiring it up to Tone.js, so I used "Axel F"
        — and there's still an Easter egg if you hit play without recording any
        notes first.
      </Typography>
      <Typography variant="body1">
        It's now published as a React component on npm — dropped straight into
        this page. Grab it from{" "}
        <ExternalLink
          url="https://www.npmjs.com/package/@norarcasey/pianora"
          label="npm"
        />
        , and the source is on{" "}
        <ExternalLink
          url="https://github.com/norarcasey/keyboard/"
          label="Github"
        />
        .
      </Typography>
      <Typography variant="body1">
        Click the keys or use your computer keyboard to play; record a melody
        and play it back. If you want to build something with Tone.js yourself,
        here are their docs:{" "}
        <ExternalLink url="https://tonejs.github.io/" label="Tone.js" />
      </Typography>
    </ProjectShowcase>
  );
}
