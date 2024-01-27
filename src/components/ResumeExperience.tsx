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
      <Typography variant="subtitle1">
        <strong>
          {title} | {company}
        </strong>
      </Typography>
      <Typography variant="caption">{companyDescription}</Typography>
      <Typography variant="subtitle2">{employmentDate}</Typography>
      <List sx={{ listStyleType: "disc", pl: 4 }}>
        {duties.map((duty, index) => (
          <ListItem
            key={`${company}-${title}-${duty}-${index}`}
            sx={{ display: "list-item", paddingBottom: 0 }}
          >
            <Typography variant="body2">{duty}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
