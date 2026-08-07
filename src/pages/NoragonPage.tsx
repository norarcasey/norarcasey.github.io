import React from "react";
import { Box, Button, Typography } from "@mui/material";

import { ExternalLink } from "../components/ExternalLink";
import {
  ProjectShowcase,
  ShowcaseDetails,
  ShowcaseGame,
  ShowcaseHeader,
  ShowcaseSummary,
} from "../components/ProjectShowcase";
import { useRouteMeta } from "../hooks/usePageMeta";
import { ACCENT_BLUE, ACCENT_PINK, ACCENT_PINK_HOVER } from "../colors";
import noragonScreen from "../assets/screens/legends-of-noragon.png";

const PLAY_URL = "https://www.legendsofnoragon.com/";

export function NoragonPage(): React.ReactElement {
  useRouteMeta("/legends-of-noragon");

  return (
    <ProjectShowcase>
      <ShowcaseHeader title="Legends of Noragon" />

      <ShowcaseSummary>
        <Typography variant="body1">
          Legends of Noragon is a turn-based, top-down dungeon crawler built in
          React and TypeScript. You move the hero one tile at a time (arrow keys
          or WASD), bumping foes to fight them, clearing each room, and taking
          the stairs down into a deeper, tougher level. It's an endless descent:
          slay bats through trolls, disarm traps, trade at the merchant, level
          up, and see how far down you can get before you die. It lives on its
          own at <ExternalLink url={PLAY_URL} label="legendsofnoragon.com" />.
        </Typography>
      </ShowcaseSummary>

      {/* The game lives on its own site rather than as an npm component, so the
          visual column carries a screenshot and the link out to it. */}
      <ShowcaseGame width={480}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 560,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            component="img"
            src={noragonScreen}
            alt="A procedurally generated dungeon in Legends of Noragon"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 1,
              display: "block",
            }}
          />
          <Button
            variant="contained"
            href={PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              backgroundColor: ACCENT_PINK,
              "&:hover": { backgroundColor: ACCENT_PINK_HOVER },
              fontWeight: 600,
            }}
          >
            Play Legends of Noragon
          </Button>
        </Box>
      </ShowcaseGame>

      <ShowcaseDetails>
        {/* The two write-ups read as a pair, so they sit side by side on wide
            screens. Grid rather than flex: equal columns that stay equal, and
            `minmax(0, 1fr)` lets a column shrink below its longest word. */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              md: "repeat(2, minmax(0, 1fr))",
            },
            gap: 4,
          }}
        >
          {/* maxWidth, not width: the column caps the measure for readability
              on a wide band but still narrows when the grid does. */}
          <Box sx={{ maxWidth: "72ch" }}>
            <Typography variant="h6" component="h3" sx={{ color: ACCENT_BLUE }}>
              How it's built
            </Typography>
            <Typography variant="body1">
              The game rules are plain TypeScript. Dungeon generation, line of
              sight, enemy movement, combat, and leveling are pure functions in
              src/game, each with its own unit tests. React's job is holding the
              state and rendering it: a useReducer inside the useNoragon hook,
              where every turn (the hero's step plus every enemy's response) is
              a single transition. That keeps the game identical under React
              StrictMode and easy to drive headlessly in tests. Each dungeon is
              built from a seed, so any run can be replayed exactly. It's
              bundled with Vite and covered by Vitest and React Testing Library.
            </Typography>
          </Box>

          <Box sx={{ maxWidth: "72ch" }}>
            <Typography variant="h6" component="h3" sx={{ color: ACCENT_BLUE }}>
              Fun challenges
            </Typography>
            <Typography variant="body1">
              The fun is in the systems. Procedural generation has to make
              dungeons that are always connected and beatable while still
              feeling irregular: L-shaped maps, cramped closets beside open
              halls, corridors twisting through the dark. Traps spring on foes
              too, so a hazard between you and a charging monster becomes a
              weapon. And the difficulty has to climb honestly: every enemy kind
              has a minimum spawn depth and stiffens as you descend, keeping the
              heavy hitters off the early floors.
            </Typography>
          </Box>
        </Box>
      </ShowcaseDetails>
    </ProjectShowcase>
  );
}
