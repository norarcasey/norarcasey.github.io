import React from "react";
import { Box, Button, Typography } from "@mui/material";

import { usePageMeta } from "../hooks/usePageMeta";
import noragonScreen from "../assets/screens/legends-of-noragon.png";

const PLAY_URL = "https://www.legendsofnoragon.com/";

export function NoragonPage(): React.ReactElement {
  usePageMeta(
    "Legends of Noragon",
    "Legends of Noragon — a dungeon crawler with procedurally generated dungeons by Nora Casey. Read how it's built, the fun challenges behind it, and play it in your browser."
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
                  Legends of Noragon is a dungeon crawler with procedurally
                  generated dungeons — every descent lays out a fresh maze of
                  rooms, corridors, and surprises, so no two runs play the same.
                  It lives on its own at{" "}
                  <a href={PLAY_URL} target="_blank" rel="noopener noreferrer">
                    legendsofnoragon.com
                  </a>
                  .
                </Typography>

                <Typography variant="h6" sx={{ color: "#4b9ae7" }}>
                  How it's built
                </Typography>
                <Typography variant="body1">
                  The heart of the game is a procedural generator that stitches
                  each dungeon together at runtime — placing rooms, carving the
                  corridors that connect them, and scattering enemies and loot
                  so the world is built fresh for every playthrough.
                </Typography>

                <Typography variant="h6" sx={{ color: "#4b9ae7" }}>
                  Fun challenges
                </Typography>
                <Typography variant="body1">
                  The trickiest part of a procedural dungeon is keeping it fair:
                  every generated layout has to stay fully connected and
                  beatable, with difficulty that ramps without ever boxing the
                  player into a dead end.
                </Typography>
              </Box>
            </section>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
