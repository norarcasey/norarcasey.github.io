import React from "react";
import { Box, Typography } from "@mui/material";

interface ProjectShowcaseProps {
  /** Project name, shown as the page header and used in the npm badge labels. */
  title: string;
  /** Full scoped npm package name, e.g. "@norarcasey/star-siege-nora". */
  npmPackage: string;
  /** The embedded game / component to show beside the text. */
  game: React.ReactNode;
  /** Hide the game below the `md` breakpoint (some games need the room). */
  hideGameOnMobile?: boolean;
  /**
   * Width of the game column on large screens. Use a number for a fixed column
   * (the default 560 fits the responsive games, which are width:100% capped at
   * 560px) or "fit-content" for an intrinsically-sized game whose width varies
   * — e.g. Mine Sweeper, whose board grows with difficulty.
   */
  gameWidth?: number | string;
  /** The descriptive copy shown under the npm badge. */
  children: React.ReactNode;
}

/**
 * Shared layout for the npm-component project pages: a full-width title header
 * across the top, then on large screens a slim description column (left) sits
 * beside the embedded game (right); on smaller screens they stack. The whole
 * block shrinks to its content and is centered on the page.
 */
export function ProjectShowcase({
  title,
  npmPackage,
  game,
  hideGameOnMobile = false,
  gameWidth = 560,
  children,
}: ProjectShowcaseProps): React.ReactElement {
  const shortName = npmPackage.replace(/^@[^/]+\//, "");

  return (
    <Box sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
      {/* Shrink-to-fit block, centered by the flex parent above */}
      <Box sx={{ width: { xs: "100%", lg: "auto" }, maxWidth: "100%" }}>
        {/* Header spanning both columns */}
        <Box className="tile" sx={{ mb: 0, pb: 0 }}>
          <Typography variant="h3">{title}</Typography>
        </Box>

        {/* Body: slim description beside the game on large screens */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: { xs: "center", lg: "flex-start" },
            gap: { xs: 0, lg: 4 },
            mt: { xs: 2, lg: 7 },
          }}
        >
          {/* Description — kept narrow so it reads as a column beside the game */}
          <Box
            sx={{
              width: { xs: "100%", lg: 400 },
              maxWidth: { xs: 640, lg: 400 },
              flexShrink: 0,
            }}
          >
            <section className="tile">
              <Box display="flex" flexDirection="column" gap={2}>
                <Box>
                  <a
                    href={`https://www.npmjs.com/package/${npmPackage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View the ${title} package on npm`}
                  >
                    <img
                      src={`https://img.shields.io/npm/v/${npmPackage}?logo=npm&label=${shortName}`}
                      alt={`${title} npm version`}
                    />
                  </a>
                </Box>
                {children}
              </Box>
            </section>
          </Box>

          {/* Game. Responsive games (width:100%, max 560px) need a definite
              width to fill; intrinsically-sized ones can pass "fit-content". */}
          <Box
            sx={{
              display: hideGameOnMobile ? { xs: "none", md: "flex" } : "flex",
              justifyContent: "center",
              width: { xs: "100%", lg: gameWidth },
              flexShrink: 0,
              pb: 4,
            }}
          >
            {game}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
