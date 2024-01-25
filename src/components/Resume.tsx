import React from "react";

import { Box, Divider, Grid, Typography } from "@mui/material";
import { ExternalLink } from "./ExternalLink";
import { ResumeExperience } from "./ResumeExperience";

export function Resume(): React.ReactElement {
  return (
    <Grid container gap={2} p={5}>
      <Grid
        container
        item
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Grid item textAlign="center">
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
            Staff Software Engineer (React/TypeScript/GrapQL/Rails)
          </Typography>
          <Typography variant="subtitle1">
            Seattle, WA | 14+ years of experience
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <ExternalLink
              url="mailto:norareneecasey@gmail.com"
              label="norareneecasey@gmail.com"
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
      <Grid item>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h5">Summary</Typography>
          <Typography variant="body1">
            As a staff software engineer at Outreach, I apply my frontend and
            teamwork skills to create and improve the core business workflows of
            the leading sales engagement platform. I have over six years of
            experience in developing high-quality web applications with React,
            TypeScript, Node, GraphQL, and Ruby on Rails and over fourteen years
            of experience developing web based applications.
          </Typography>
          <Typography variant="body1">
            My primary aim is to deliver software that people <b>use</b> and
            improves their quality of life or work by making what they do easier
            and faster to do, with consistent and measureable value in their
            results. I enjoy collaborating with teams and stakeholders on
            challenging and complex frontend and full stack issues. I work to
            deliver solutions that are right for the customer, reliable, and
            user-friendly.
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        {/* TODO: Add Icons for companies */}
        <Box>
          <Typography variant="h5">Experience</Typography>
          <ResumeExperience
            title="Staff Software Engineer"
            company="Outreach"
            companyDescription="Series D unicorn and industry leading sales engagement platform
              with 4.4B valuation"
            employmentDate="Nov 2022 - Present (1 year 2 months)"
            duties={[
              "Built a data visualization tool to display expected salespipeline and developed the API contracts to be used by the datascience team.",
              "Extended the automation workflow engine to enable tiered conditional statements and actions, acted as liaison between product, design, and backend.",
              "Managed team agile processes and worked with team members to ensure timely feedback and process adjustments to improve team productivity.",
            ]}
          />
          <ResumeExperience
            title="Senior Software Engineer"
            company="Outreach"
            companyDescription="Series D unicorn and industry leading sales engagement platform
              with 4.4B valuation"
            employmentDate="Aug 2018 - Nov 2022 (4 years 4 months)"
            duties={[
              "Led a team of engineers and liaison between product, design, management, and backend team to successfully complete a multi-quarter automation framework migration with feature enhancements.",
              "Authored a conditional logic syntax for the inhouse if/then workflow engine, leveraging proof of concepts and design documentation to engage stakeholders and achieve a consensus across teams.",
              "Developed and extended React component functionality across the organization, allowing other engineers to leverage shared work and reduce cost of implementation.",
            ]}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
