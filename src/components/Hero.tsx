import React from "react";
import { Box, Typography } from "@mui/material";

// Shared reading width so the Hero and FeaturedProject bands line up and don't
// stretch their text across very wide screens.
export const HOME_BAND_MAX_WIDTH = 1100;

import {
  getReactYearsOfExperience,
  getYearsOfExperience,
  HEADLINE_TITLE,
} from "../data/resume";
import { ACCENT_PINK, DECORATIVE_PINK } from "../colors";

function Highlight({ label }: { label: string }): React.ReactElement {
  return (
    <Box
      sx={{
        border: `dashed 1px ${DECORATIVE_PINK}`,
        borderRadius: 1,
        px: 1.25,
        py: 0.5,
        fontSize: "13px",
        color: "#363435",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Box>
  );
}

/**
 * Top-of-page positioning band: an at-a-glance pitch for recruiters and
 * engineering leaders landing on the site, with the headline value prop and a
 * row of quick-fact chips. Experience figures come from the résumé data so they
 * never go stale.
 */
export function Hero(): React.ReactElement {
  const years = getYearsOfExperience();
  const reactYears = getReactYearsOfExperience();

  return (
    <Box
      component="section"
      className="tile"
      sx={{ width: "100%", maxWidth: HOME_BAND_MAX_WIDTH, mx: "auto" }}
    >
      <Typography
        variant="overline"
        sx={{ color: ACCENT_PINK, letterSpacing: 1.5, fontWeight: 600 }}
      >
        {HEADLINE_TITLE}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        sx={{ color: "#363435", fontWeight: 600, mt: 0.5, mb: 1.5 }}
      >
        Building products end to end and leading the teams that ship them
      </Typography>
      <Typography variant="body1" sx={{ color: "#4a4f57", maxWidth: 760 }}>
        {years}+ years building web applications across high-growth startups:
        React and TypeScript front ends, the Node, Rails, and .NET services
        behind them, the relational data they sit on, and the CI/CD that deploys
        the whole thing. I mentor engineers, partner closely with product &amp;
        design, and use AI every day to move faster.
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
        <Highlight label={`${years}+ years experience`} />
        <Highlight label={`${reactYears}+ yrs React · TypeScript`} />
        <Highlight label="Node · GraphQL · Rails · .NET" />
        <Highlight label="Postgres & SQL data modeling" />
        <Highlight label="CI/CD · serverless · cloud deploys" />
        <Highlight label="Mentor & team lead" />
        <Highlight label="MS CS, Georgia Tech" />
        <Highlight label="US & EU work authorized" />
      </Box>
    </Box>
  );
}
