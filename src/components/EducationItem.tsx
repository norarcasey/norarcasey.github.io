import React from "react";
import { Box, Typography } from "@mui/material";

interface EducationItemProps {
  school: string;
  degree: string;
  graduationDate: string;
}

export function EducationItem({
  school,
  degree,
  graduationDate,
}: EducationItemProps): React.ReactElement {
  return (
    <Box sx={{ ml: 5, mb: 1 }}>
      <Typography variant="subtitle1">
        {school} | {graduationDate}
      </Typography>
      <Typography variant="subtitle2">
        <strong>{degree}</strong>
      </Typography>
    </Box>
  );
}
