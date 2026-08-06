import React from "react";
import { Box, Typography } from "@mui/material";

import { skillGroups } from "../data/resume";
import { ACCENT_BLUE, DECORATIVE_PINK } from "../colors";

interface SkillsMatrixProps {
  /** Section heading. Defaults to the home-page wording. */
  title?: string;
  /** Optional lead-in paragraph under the heading. */
  intro?: React.ReactNode;
}

/**
 * The stack, layer by layer: one card per layer (front end, back end, data,
 * infrastructure, quality, leadership) so a visitor can see the full-stack
 * range in a couple of seconds rather than parsing one long list of nouns.
 * Reads from the same `skillGroups` data the résumé renders.
 */
export function SkillsMatrix({
  title = "Across the stack",
  intro,
}: SkillsMatrixProps): React.ReactElement {
  return (
    <section className="tile">
      <Typography variant="h3" component="h2">
        {title}
      </Typography>
      {intro ? (
        <Typography variant="body1" sx={{ color: "#4a4f57", mt: 2 }}>
          {intro}
        </Typography>
      ) : null}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 2,
          mt: 2,
        }}
      >
        {skillGroups.map((group) => (
          <Box
            key={group.label}
            sx={{
              border: `dashed 1px ${DECORATIVE_PINK}`,
              borderRadius: 1,
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              variant="subtitle1"
              component="h3"
              sx={{
                color: ACCENT_BLUE,
                fontWeight: 600,
                borderBottom: "none",
                mb: 0,
              }}
            >
              {group.label}
            </Typography>
            <Typography variant="body2" sx={{ color: "#4a4f57" }}>
              {group.blurb}
            </Typography>
            <Box
              component="ul"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.75,
                listStyle: "none",
                m: 0,
                p: 0,
              }}
            >
              {group.skills.map((skill) => (
                <Box
                  component="li"
                  key={skill}
                  sx={{
                    fontSize: "12px",
                    color: "#363435",
                    border: `solid 1px rgba(31, 120, 194, 0.35)`,
                    borderRadius: 1,
                    px: 1,
                    py: 0.25,
                  }}
                >
                  {skill}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </section>
  );
}
