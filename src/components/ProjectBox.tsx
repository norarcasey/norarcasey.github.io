import React from "react";

import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Hardcoded placeholder until real screenshots are dropped in.
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150">
      <rect width="200" height="150" fill="#1b2330"/>
      <rect x="0.5" y="0.5" width="199" height="149" fill="none" stroke="#df6695" stroke-dasharray="4 4"/>
      <text x="100" y="80" fill="#4b9ae7" font-family="sans-serif" font-size="14" text-anchor="middle">screenshot</text>
    </svg>`
  );

export function ProjectBox({
  title,
  url,
  description,
  image = PLACEHOLDER_IMAGE,
}: {
  title: string;
  url: string;
  description: string;
  image?: string;
}): React.ReactElement {
  const isExternal = /^https?:\/\//.test(url);
  const linkProps = isExternal
    ? {
        component: "a" as const,
        href: url,
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : { component: Link, to: url };

  return (
    <Box {...linkProps} sx={{ textDecoration: "none" }}>
      <Box
        className="project-box"
        sx={{
          width: { xs: "100%", sm: 340 },
          display: "flex",
          gap: 1.5,
        }}
      >
        <Box
          component="img"
          src={image}
          alt={`${title} screenshot`}
          sx={{
            width: { xs: 90, sm: 110 },
            height: { xs: 90, sm: 110 },
            objectFit: "cover",
            flexShrink: 0,
            borderRadius: 1,
            border: "1px solid #4b9ae7",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "left",
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              typography: { sm: "h6", md: "h5" },
              color: "#4b9ae7",
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              typography: "body2",
              color: "#c7ccd4",
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
