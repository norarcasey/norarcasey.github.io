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

          <ResumeExperience
            title="Senior Software Engineer"
            company="Getty Images"
            companyDescription="Industry leading stock photography company with over 477 million assets"
            employmentDate="Mar 2015 - Aug 2018 (3 years 6 months)"
            duties={[
              "Mobile first front end and middle tier software developer for high traffic e-commerce website running on Ruby on Rails, Javascript, CSS, HTML, and C#/.NET services.",
              "Built a CMS to allow content contributors an easy, non-technical solution to create engaging articles that showcase creative and editorial imagery.",
              "Improved committed revenue by empowering users to purchase a new line of products that bundles assets.",
              "Created a consumer/browse functionality for users to preview high quality imagery.",
              "Implemented social sign on and registration leveraging Facebook login.",
            ]}
          />

          <ResumeExperience
            title="Web Developer"
            company="Hipcricket"
            companyDescription="Digital SMS marketing tools"
            employmentDate="Feb 2014 - Mar 2015 (1 year 2 months)"
            duties={[
              "Front End and Middle tier web developer for SMS platform and client facing administrative website, managing new features, updates, and deployments utilizing Agile and Test Driven Development.",
              "Lead developer for a Cross Browser Compliant, Mobile in Mind refactor and redesign of the client facing administrative website, leveraging Foundation 4, ASP.NET MVC 5, jQuery 1.8, NHibernate 4.0, C#, HTML5, and CSS3.",
              "Maintained and Updated the Legacy Classic ASP website.",
            ]}
          />

          <ResumeExperience
            title="Software Engineer"
            company="Getty Images"
            companyDescription="Industry leading stock photography company with over 477 million assets"
            employmentDate="Jun 2012 - Feb 2014 (1 year 9 months)"
            duties={[
              "Paired programming, Test Driven Development, Agile environment developing new features for service based websites.",
            ]}
          />

          <ResumeExperience
            title="Web Developer"
            company="Pop!"
            companyDescription="Digital media advertising company"
            employmentDate="Nov 2011 - Mar 2012 (5 months)"
            duties={[
              "Developed an e-commerce ticketing solution for the Royal Opera House in London utilizing ASP.NET MVC3, Razor views, C#, and jQuery.",
              "Developed the API for handling account requests for the website.",
              "Integrated WorldPay and QAS Experian for 3rd party applications to support acceptance of credit cards and address capture and verification respectively.",
            ]}
          />

          <ResumeExperience
            title="Web Developer"
            company="Microsoft"
            companyDescription="Microsoft Corporation, leading developer of personal-computer software systems"
            employmentDate="Apr 2011 - Aug 2011 (5 months)"
            duties={[
              "Customized features of a 3rd party .NET based social platform, Telligent Community Server, for the MSDN and TechNet blogs and wiki.",
              "Developed and implemented a recognition feature to submit activities and achievements as a way to track quality of contributions on the blogs and wiki.",
              "Provided general site maintenance and applied upgrade packages.",
            ]}
          />

          <ResumeExperience
            title="UI SDE"
            company="Microsoft"
            companyDescription="Microsoft Corporation, leading developer of personal-computer software systems"
            employmentDate="Jan 2011 - Mar 2011 (3 months)"
            duties={[
              "Developed new features for a performance counter website.",
              "Re-skinned and Updated Features for the administration user interface.",
              "Improved look and feel by applying CSS templates, Master Pages, and Web Design Best Practices.",
              "Created Administration User Interface for Team Foundation Server, to view and create Work Items in TFS.",
              "Created a User Interface for Workflow Tracking.",
            ]}
          />

          <ResumeExperience
            title="Web Engineer III "
            company="Ingeniux"
            companyDescription="Content management software"
            employmentDate="Mar 2009 - Jan 2011 (1 year 11 months)"
            duties={[
              "Developed and Integrated ASP, ASP.NET, and ASP.NET MVC web applications into a Content Management System and provide a pixel perfect display with desired functionality of specified website.",
              "Analyze web site specifications, implement non-table based HTML, CSS, and JavaScript files into an XML based Content Management System, and use XSL and XPath to style and transform the XML output.",
              "Tested, debugged, and wrote HTML to ensure XHTML strict 1.0 compliant and cross browser compatible for IE 6 and above, FireFox, Safari, and Chrome.",
              "Configured and Administered IIS 6 and 7, create and manage application pools, virtual directories, and install Custom Web Applications and Websites.",
            ]}
          />
        </Box>
      </Grid>
      <Grid item>
        {/* TODO: Add Icons for schools */}
        <Box>
          <Typography variant="h5">Eduction</Typography>

          <Box>
            <Typography variant="h6">
              Georgia Institute of Technology
            </Typography>
            <Typography variant="subtitle1">
              Master's Degree, Computer Science
            </Typography>
            <Typography variant="subtitle2">
              In progress, graduation Spring 2024
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">Northern Arizona University</Typography>
            <Typography variant="subtitle1">
              BS Advertising and BA Philosophy
            </Typography>
            <Typography variant="subtitle2">2006</Typography>
          </Box>
          <Box>
            <Typography variant="h6">Strategy Computers</Typography>
            <Typography variant="subtitle1">
              Certificate Program MCP, Web Development
            </Typography>
            <Typography variant="subtitle2">2008</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item>
        <Box>
          <Typography variant="h5">Microsoft Certified Professional</Typography>
          <Typography variant="subtitle1">
            JavaScript • TypeScript • Apollo GraphQL • React • Agile
            Methodologies • Jest • Ruby on Rails
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
