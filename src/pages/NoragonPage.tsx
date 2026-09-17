import React from "react";

import { ExternalLink } from "../components/ExternalLink";
import {
  ProjectShowcase,
  ShowcaseDetails,
  ShowcaseGame,
  ShowcaseHeader,
  ShowcaseSummary,
} from "../components/ProjectShowcase";
import { useRouteMeta } from "../hooks/usePageMeta";
import noragonScreen from "../assets/screens/legends-of-noragon.webp";

const PLAY_URL = "https://www.legendsofnoragon.com/";

export function NoragonPage(): React.ReactElement {
  useRouteMeta("/legends-of-noragon");

  return (
    <ProjectShowcase>
      <ShowcaseHeader title="Legends of Noragon" />

      <ShowcaseSummary>
        <p className="copy">
          Legends of Noragon is a turn-based, top-down dungeon crawler built in
          React and TypeScript. You move the hero one tile at a time (arrow keys
          or WASD), bumping foes to fight them, clearing each room, and taking
          the stairs down into a deeper, tougher level. It's an endless descent:
          slay bats through trolls, disarm traps, trade at the merchant, level
          up, and see how far down you can get before you die. It lives on its
          own at <ExternalLink url={PLAY_URL} label="legendsofnoragon.com" />.
        </p>
      </ShowcaseSummary>

      {/* The game lives on its own site rather than as an npm component, so the
          visual column carries a screenshot and the link out to it. */}
      <ShowcaseGame width={480}>
        <div className="flex w-full max-w-[560px] flex-col items-center gap-4">
          <img
            src={noragonScreen}
            alt="A procedurally generated dungeon in Legends of Noragon"
            decoding="async"
            // Reserves the box before the file lands, so the page doesn't
            // reflow around it.
            className="block aspect-[558/562] w-full rounded-lg"
          />
          <a
            className="btn btn-pink"
            href={PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Play Legends of Noragon
          </a>
        </div>
      </ShowcaseGame>

      <ShowcaseDetails>
        {/* The two write-ups read as a pair, so they sit side by side on wide
            screens. Grid rather than flex: equal columns that stay equal, and
            Tailwind's grid-cols-2 is repeat(2, minmax(0, 1fr)), which lets a
            column shrink below its longest word. */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* max-width, not width: the column caps the measure for readability
              on a wide band but still narrows when the grid does. */}
          <div className="flex max-w-[72ch] flex-col gap-2">
            <h2 className="h3">How it is built</h2>
            <p className="copy">
              The game rules are plain TypeScript. Dungeon generation, line of
              sight, enemy movement, combat, and leveling are pure functions in
              src/game, each with its own unit tests. React's job is holding the
              state and rendering it: a useReducer inside the useNoragon hook,
              where every turn (the hero's step plus every enemy's response) is
              a single transition. That keeps the game identical under React
              StrictMode and easy to drive headlessly in tests. Each dungeon is
              built from a seed, so any run can be replayed exactly. It's
              bundled with Vite and covered by Vitest and React Testing Library.
            </p>
          </div>

          <div className="flex max-w-[72ch] flex-col gap-2">
            <h2 className="h3">Fun challenges</h2>
            <p className="copy">
              The fun is in the systems. Procedural generation has to make
              dungeons that are always connected and beatable while still
              feeling irregular: L-shaped maps, cramped closets beside open
              halls, corridors twisting through the dark. Traps spring on foes
              too, so a hazard between you and a charging monster becomes a
              weapon. And the difficulty has to climb honestly: every enemy kind
              has a minimum spawn depth and stiffens as you descend, keeping the
              heavy hitters off the early floors.
            </p>
          </div>
        </div>
      </ShowcaseDetails>
    </ProjectShowcase>
  );
}
