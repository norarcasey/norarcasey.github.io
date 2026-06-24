import React from "react";
import { Box, Button, Typography } from "@mui/material";

import { usePageMeta } from "../hooks/usePageMeta";
import noragonScreen from "../assets/screens/legends-of-noragon.png";

const PLAY_URL = "https://www.legendsofnoragon.com/";

export function NoragonPage(): React.ReactElement {
  usePageMeta(
    "Legends of Noragon",
    "Legends of Noragon — a turn-based, top-down dungeon crawler with procedurally generated dungeons by Nora Casey. Read how it's built, the fun challenges behind it, and play it in your browser."
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
      <Box sx={{ width: { xs: "100%", lg: "auto" }, maxWidth: "100%" }}>
        {/* Header spanning both columns */}
        <Box className="tile" sx={{ mb: 0, pb: 0 }}>
          <Typography variant="h3">Legends of Noragon</Typography>
        </Box>

        {/* Body: screenshot + play link beside the write-up on large screens */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: { xs: "center", lg: "flex-start" },
            gap: { xs: 0, lg: 4 },
            mt: { xs: 2, lg: 7 },
          }}
        >
          {/* Screenshot + Play button */}
          <Box
            sx={{
              width: { xs: "100%", lg: 480 },
              maxWidth: 560,
              flexShrink: 0,
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
                backgroundColor: "#df6695",
                "&:hover": { backgroundColor: "#c7507e" },
                fontWeight: 600,
              }}
            >
              Play Legends of Noragon
            </Button>
          </Box>

          {/* Write-up */}
          <Box
            sx={{
              width: { xs: "100%", lg: 400 },
              maxWidth: { xs: 640, lg: 400 },
              flexShrink: 0,
            }}
          >
            <section className="tile">
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="body1">
                  Legends of Noragon is a turn-based, top-down dungeon crawler
                  built in React and TypeScript. You move the hero one tile at a
                  time — arrow keys or WASD — bumping foes to fight them,
                  clearing each room, and taking the stairs down into a deeper,
                  tougher level. It's an endless descent: slay bats through
                  trolls, disarm traps, trade at the merchant, level up, and see
                  how far down you can get before you die. It lives on its own
                  at{" "}
                  <a href={PLAY_URL} target="_blank" rel="noopener noreferrer">
                    legendsofnoragon.com
                  </a>
                  .
                </Typography>

                <Typography variant="h6" sx={{ color: "#4b9ae7" }}>
                  How it's built
                </Typography>
                <Typography variant="body1">
                  The whole game runs on a framework-free engine hook. Every
                  turn — the hero's step plus every enemy's response — is a
                  single pure reducer transition, so it behaves identically
                  under React StrictMode and is easy to drive headlessly in
                  tests. Each dungeon is built from a seed, so any run can be
                  replayed exactly. It's bundled with Vite and covered by Vitest
                  and React Testing Library.
                </Typography>

                <Typography variant="h6" sx={{ color: "#4b9ae7" }}>
                  Fun challenges
                </Typography>
                <Typography variant="body1">
                  The fun is in the systems. Procedural generation has to make
                  dungeons that are always connected and beatable while still
                  feeling irregular — L-shaped maps, cramped closets beside open
                  halls, corridors twisting through the dark. Traps spring on
                  foes too, so a hazard between you and a charging monster
                  becomes a weapon. And the difficulty has to climb honestly:
                  every enemy kind has a minimum spawn depth and stiffens as you
                  descend, keeping the heavy hitters off the early floors.
                </Typography>
              </Box>
            </section>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
