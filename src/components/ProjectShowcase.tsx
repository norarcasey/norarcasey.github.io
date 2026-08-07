import React from "react";
import { Box, Typography } from "@mui/material";

/**
 * Grid areas for the showcase layout. On large screens the summary column sits
 * beside the game with the header and details bands spanning both; below `lg`
 * everything stacks in source order.
 */
const AREAS = {
  xs: `"header" "summary" "game" "details"`,
  lg: `"header header" "summary game" "details details"`,
};

interface ProjectShowcaseProps {
  /**
   * The showcase slots: `ShowcaseHeader`, `ShowcaseSummary`, `ShowcaseGame`,
   * and `ShowcaseDetails`. Each one places itself in the grid, so they can be
   * given in any order and any of them may be omitted.
   */
  children: React.ReactNode;
}

/**
 * Shared layout for the npm-component project pages. Owns nothing but the
 * grid: a full-width title header across the top, a slim summary column beside
 * the embedded game on large screens, and a full-width details band under
 * both. The whole block shrinks to its content and is centered on the page.
 */
export function ProjectShowcase({
  children,
}: ProjectShowcaseProps): React.ReactElement {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
      {/* Shrink-to-fit block, centered by the flex parent above */}
      <Box
        sx={{
          width: { xs: "100%", lg: "auto" },
          maxWidth: "100%",
          display: "grid",
          gridTemplateAreas: AREAS,
          // The game column is sized by the game itself, so its track is auto.
          gridTemplateColumns: { xs: "minmax(0, 1fr)", lg: "400px auto" },
          columnGap: { xs: 0, lg: 4 },
          alignItems: "start",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

interface ShowcaseHeaderProps {
  /** Project name, shown as the page header. */
  title: string;
}

/** The project title, spanning the full width above both columns. */
export function ShowcaseHeader({
  title,
}: ShowcaseHeaderProps): React.ReactElement {
  return (
    <Box
      className="tile"
      sx={{
        gridArea: "header",
        // `.tile` centers itself with auto side margins, which a grid item
        // honours by shrinking to its content. Fill the row so the title stays
        // aligned with the summary column beneath it.
        width: "100%",
        boxSizing: "border-box",
        // The heading is the only thing in this slot, so drop the trailing
        // margin `.tile h2` adds for tiles that have copy beneath the heading.
        // Spacing below the header is owned here instead.
        "& h2": { mb: 0 },
        mb: { xs: 2, lg: 7 },
        pb: 0,
      }}
    >
      <Typography variant="h3" component="h2">
        {title}
      </Typography>
    </Box>
  );
}

interface ShowcaseSummaryProps {
  /** The descriptive copy for the project. */
  children: React.ReactNode;
}

/**
 * The left-hand column. Kept narrow so it reads as a column beside the game
 * rather than as a full-width paragraph.
 */
export function ShowcaseSummary({
  children,
}: ShowcaseSummaryProps): React.ReactElement {
  return (
    <Box
      sx={{
        gridArea: "summary",
        width: { xs: "100%", lg: 400 },
        maxWidth: { xs: 640, lg: 400 },
        mx: "auto",
      }}
    >
      <section className="tile">
        <Box display="flex" flexDirection="column" gap={2}>
          {children}
        </Box>
      </section>
    </Box>
  );
}

interface ShowcaseGameProps {
  /**
   * Width of the game column on large screens. A number gives a fixed column
   * (the default 560 fits the responsive games, which are width:100% capped at
   * 560px); "fit-content" suits an intrinsically-sized game whose width varies,
   * e.g. Mine Sweeper, whose board grows with difficulty.
   */
  width?: number | string;
  /** Hide the game below the `md` breakpoint (some games need the room). */
  hideOnMobile?: boolean;
  /** The embedded game / component. */
  children: React.ReactNode;
}

/** The right-hand column holding the embedded game. */
export function ShowcaseGame({
  width = 560,
  hideOnMobile = false,
  children,
}: ShowcaseGameProps): React.ReactElement {
  return (
    <Box
      sx={{
        gridArea: "game",
        display: hideOnMobile ? { xs: "none", md: "flex" } : "flex",
        justifyContent: "center",
        width: { xs: "100%", lg: width },
        pb: 4,
      }}
    >
      {children}
    </Box>
  );
}

interface ShowcaseDetailsProps {
  /** The engineering write-up. */
  children: React.ReactNode;
}

/**
 * Full-width band below both columns. The engineering write-up lives here
 * rather than in the narrow summary column, where long technical prose is
 * hard to read.
 */
export function ShowcaseDetails({
  children,
}: ShowcaseDetailsProps): React.ReactElement {
  return (
    <Box
      component="section"
      className="tile"
      sx={{ gridArea: "details", width: "100%", boxSizing: "border-box" }}
    >
      {children}
    </Box>
  );
}
