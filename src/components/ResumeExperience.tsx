import React from "react";
import { Box, List, ListItem, Typography } from "@mui/material";

interface ResumeExperienceProps {
  title: string;
  company: string;
  companyDescription?: string;
  employmentDate: string;
  duties: string[];
}

export function ResumeExperience({
  title,
  company,
  companyDescription,
  employmentDate,
  duties,
}: ResumeExperienceProps): React.ReactElement {
  return (
    <Box>
      <Typography variant="h6">
        {title} | {company}
      </Typography>
      <Typography variant="subtitle1">{companyDescription}</Typography>
      <Typography variant="subtitle2">{employmentDate}</Typography>
      <List sx={{ listStyleType: "disc", pl: 4 }}>
        {duties.map((duty) => (
          <ListItem sx={{ display: "list-item" }}>{duty}</ListItem>
        ))}
      </List>
    </Box>
  );
}
