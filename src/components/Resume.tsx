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
  HEADLINE_TITLE,
  selectedProjects,
  skillGroups,
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
            <Typography variant="h4" component="h2">
              Nora Casey
            </Typography>
            <Typography variant="h5" component="p">
              (she/they)
            </Typography>
          </Box>
          <Typography variant="subtitle1" component="p">
            {HEADLINE_TITLE} · React · TypeScript · Node · Postgres
          </Typography>
          <Typography variant="subtitle1" component="p">
            Barcelona, Spain | {yearsOfExperience}+ years of experience
          </Typography>
          <Typography variant="subtitle1" component="p">
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
          <Typography variant="h6" component="h3">
            Summary
          </Typography>
          <Typography variant="body2">
            Staff / lead full-stack engineer with {yearsOfExperience}+ years
            building web applications end to end, from React clients through the
            APIs, services, and relational data models behind them, and the
            CI/CD pipelines that ship them. The last several years leading
            teams, owning architecture and code quality across a domain while
            staying hands-on shipping complex features. I bring{" "}
            {reactYearsOfExperience}+ years of React and TypeScript paired with
            a decade of server-side work across, in reverse chonological order,
            Node, Ruby on Rails, and C#/.NET. I leverage AI every day as a tool
            to extend, enhance, and expediate my own abilities.
          </Typography>
          <Typography variant="body2">
            My aim is to help people, whether through the technology I build or
            by mentoring the engineers and teams I work with. In my next role
            I'm looking to continue my path into leadership and help shape the
            technology and direction of the organization.
          </Typography>
        </Box>
      </Grid>
      <Grid size={12}>
        <Box>
          <Typography variant="h6" component="h3">
            Skills
          </Typography>
          {/* Grouped by layer so the full-stack range is legible at a glance
              instead of buried in one long comma-separated list. */}
          {skillGroups.map((group) => (
            <Typography
              variant="body2"
              component="p"
              key={group.label}
              mt={0.5}
            >
              <strong>{group.label}:</strong> {group.skills.join(" • ")}
            </Typography>
          ))}
        </Box>
      </Grid>
      <Grid>
        {/* TODO: Add Icons for companies */}
        <Box>
          <Typography variant="h6" component="h3">
            Experience
          </Typography>
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
          <Typography variant="h6" component="h3">
            Education
          </Typography>
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
          <Typography variant="h6" component="h3">
            Selected projects
          </Typography>
          {selectedProjects.map((project) => (
            <Box key={project.name} mt={1}>
              <Typography variant="body2" component="p">
                <strong>{project.name}</strong>{" "}
                <ExternalLink
                  url={project.url}
                  label={project.url.replace(/^https:\/\/(www\.)?/, "")}
                />
              </Typography>
              <Typography variant="body2" component="p">
                {project.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid size={12}>
        <Box>
          <Typography variant="h6" component="h3">
            Languages
          </Typography>
          <Typography variant="subtitle1" component="p">
            English (Native) • Spanish (Limited Working)
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
});
