import React from "react";
import { Box, Typography } from "@mui/material";

import { ACCENT_BLUE } from "../colors";

export interface StackFact {
  /** Short layer or concern, e.g. "Release". */
  label: string;
  /** What that layer actually is for this project. */
  value: React.ReactNode;
}

interface StackFactsProps {
  /** Section heading. Defaults to "How it's built". */
  title?: string;
  facts: StackFact[];
}

/**
 * The engineering side of a project page: a labeled breakdown of the stack,
 * from the domain core out to how the artifact gets released. Rendered as a
 * description list so each label is programmatically tied to its value. Sits
 * in a full-width band, so each row puts its label beside its value once
 * there's room for two columns.
 */
export function StackFacts({
  title = "How it's built",
  facts,
}: StackFactsProps): React.ReactElement {
  return (
    <Box>
      <Typography
        variant="h6"
        component="h2"
        sx={{ color: ACCENT_BLUE, mb: 1 }}
      >
        {title}
      </Typography>
      <Box component="dl" sx={{ m: 0, display: "grid", gap: 1.5 }}>
        {facts.map((fact) => (
          <Box
            key={fact.label}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "180px 1fr" },
              columnGap: 3,
              rowGap: 0.25,
              alignItems: "baseline",
            }}
          >
            <Typography
              component="dt"
              variant="body2"
              sx={{ fontWeight: 700, color: "#363435" }}
            >
              {fact.label}
            </Typography>
            <Typography
              component="dd"
              variant="body2"
              sx={{ m: 0, color: "#4a4f57", maxWidth: "72ch" }}
            >
              {fact.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
