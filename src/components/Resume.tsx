import React from "react";

import { Box, Divider, Grid, Typography } from "@mui/material";
import { ExternalLink } from "./ExternalLink";
import { ResumeExperience } from "./ResumeExperience";
import { EducationItem } from "./EducationItem";
import {
  education,
  experience,
  formatEmploymentPeriod,
  getReactYearsOfExperience,
  getYearsOfExperience,
} from "../data/resume";

export const Resume = React.forwardRef<HTMLDivElement>((_, ref) => {
  const yearsOfExperience = getYearsOfExperience();
  const reactYearsOfExperience = getReactYearsOfExperience();

  return (
    <Grid
      container
      gap={2}
      p={5}
      pt={0}
      ref={ref}
      sx={{ fontFamily: '"Roboto Flex"' }}
    >
      <Grid
        container
        size={12}
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Grid textAlign="center">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <Typography variant="h4">Nora Casey</Typography>
            <Typography variant="h5">(she/they)</Typography>
          </Box>
          <Typography variant="subtitle1">
            Staff Software Engineer (React/TypeScript/GraphQL/Rails)
          </Typography>
          <Typography variant="subtitle1">
            Barcelona, Spain | {yearsOfExperience}+ years of experience
          </Typography>
          <Typography variant="subtitle1">
            US &amp; EU work authorized
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <ExternalLink
              url="mailto:noracasey@duck.com"
              label="noracasey@duck.com"
            />
            <Divider orientation="vertical" flexItem />
            <ExternalLink
              url="https://www.linkedin.com/in/nora-casey/"
              label="in/nora-casey"
            />
            <Divider orientation="vertical" flexItem />
            <ExternalLink
              url="https://github.com/norarcasey"
              label="github.com/norarcasey"
            />
          </Box>
        </Grid>
      </Grid>
      <Grid>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h6">Summary</Typography>
          <Typography variant="body2">
            As a staff software engineer at Pulley, I apply my frontend and
            teamwork skills to build and improve the core workflows of a fast
            growing product. I have over {reactYearsOfExperience} years of
            experience in developing high-quality web applications with React,
            TypeScript, Node, GraphQL, and Ruby on Rails and over{" "}
            {yearsOfExperience} years of experience developing web based
            applications.
          </Typography>
          <Typography variant="body2">
            My primary aim is to deliver software that people <b>use</b> and
            improves their quality of life or work by making what they do easier
            and faster to do, with consistent and measurable value in their
            results. I enjoy collaborating with teams and stakeholders on
            challenging and complex frontend and full stack issues. I work to
            deliver solutions that are right for the customer, reliable, and
            user-friendly.
          </Typography>
        </Box>
      </Grid>
      <Grid>
        {/* TODO: Add Icons for companies */}
        <Box>
          <Typography variant="h6">Experience</Typography>
          {experience.map((entry, index) => (
            <ResumeExperience
              key={`${entry.company}-${entry.title}-${index}`}
              title={entry.title}
              company={entry.company}
              companyDescription={entry.companyDescription}
              employmentDate={formatEmploymentPeriod(entry)}
              duties={entry.duties}
            />
          ))}
        </Box>
      </Grid>
      <Grid>
        {/* TODO: Add Icons for schools */}
        <Box>
          <Typography variant="h6">Education</Typography>
          {education.map((entry) => (
            <EducationItem
              key={entry.school}
              school={entry.school}
              degree={entry.degree}
              graduationDate={entry.graduationDate}
            />
          ))}
        </Box>
      </Grid>
      <Grid size={12}>
        <Box>
          <Typography variant="h6">Microsoft Certified Professional</Typography>
          <Typography variant="subtitle1">
            JavaScript • TypeScript • Apollo GraphQL • React • Agile
            Methodologies • Jest • Ruby on Rails
          </Typography>
        </Box>
      </Grid>
      <Grid size={12}>
        <Box>
          <Typography variant="h6">Languages</Typography>
          <Typography variant="subtitle1">
            English (Native) • Spanish (Limited Working)
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
});
