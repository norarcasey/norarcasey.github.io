import React from "react";

import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function ProjectBox({
  title,
  url,
}: {
  title: string;
  url: string;
}): React.ReactElement {
  return (
    <Link to={url}>
      <Box
        className="project-box"
        sx={{
          width: { xs: 150, sm: 200 },
          height: { xs: 150, sm: 200 },
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
      </Box>
    </Link>
  );
}
