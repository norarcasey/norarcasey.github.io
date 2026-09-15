import React from "react";

import { ExternalLink } from "./ExternalLink";
import { ResumeExperience } from "./ResumeExperience";
import { EducationItem } from "./EducationItem";
import { SkillsMatrix } from "./SkillsMatrix";
import {
  education,
  experience,
  formatEmploymentPeriod,
  getReactYearsOfExperience,
  getYearsOfExperience,
  HEADLINE_TITLE,
  selectedProjects,
} from "../data/resume";

/**
 * The résumé, on screen and on paper from the same markup. `@media print` in
 * `index.css` hides the shell, drops the page to one column and takes the ink
 * to black; there is no second render and no print library any more.
 */
export function Resume(): React.ReactElement {
  const yearsOfExperience = getYearsOfExperience();
  const reactYearsOfExperience = getReactYearsOfExperience();

  return (
    <article className="resume flex flex-col gap-8">
      <header className="flex flex-col items-center gap-1 text-center">
        <div className="flex flex-wrap items-baseline justify-center gap-2">
          <h1 className="h1">Nora Casey</h1>
          <p className="lead">(she/they)</p>
        </div>
        <p className="copy">
          {HEADLINE_TITLE} · React · TypeScript · Node · Postgres
        </p>
        <p className="copy">
          Barcelona, Spain | {yearsOfExperience}+ years of experience
        </p>
        <p className="copy">US &amp; EU work authorized</p>
        <p className="copy flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <ExternalLink
            url="mailto:noracasey@duck.com"
            label="noracasey@duck.com"
          />
          <span aria-hidden="true" className="text-border-strong">
            |
          </span>
          <ExternalLink
            url="https://www.linkedin.com/in/nora-casey/"
            label="in/nora-casey"
          />
          <span aria-hidden="true" className="text-border-strong">
            |
          </span>
          <ExternalLink
            url="https://github.com/norarcasey"
            label="github.com/norarcasey"
          />
        </p>
      </header>

      <section>
        <h2 className="h2">Summary</h2>
        <div className="mt-3 flex flex-col gap-3">
          <p className="copy">
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
          </p>
          <p className="copy">
            My aim is to help people, whether through the technology I build or
            by mentoring the engineers and teams I work with. In my next role
            I&apos;m looking to continue my path into leadership and help shape
            the technology and direction of the organization.
          </p>
        </div>
      </section>

      {/* Grouped by layer so the full-stack range is legible at a glance
          instead of buried in one long comma-separated list. Moved here from
          the home page in UI-18. */}
      <SkillsMatrix />

      <section>
        <h2 className="h2">Experience</h2>
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
      </section>

      <section>
        <h2 className="h2">Education</h2>
        {education.map((entry) => (
          <EducationItem
            key={entry.school}
            school={entry.school}
            degree={entry.degree}
            graduationDate={entry.graduationDate}
          />
        ))}
      </section>

      <section>
        <h2 className="h2">Selected projects</h2>
        {selectedProjects.map((project) => (
          <div key={project.name} className="resume-entry mt-3">
            <p className="text-text text-base leading-6 font-semibold">
              {project.name}{" "}
              <ExternalLink
                url={project.url}
                label={project.url.replace(/^https:\/\/(www\.)?/, "")}
              />
            </p>
            <p className="copy text-sm leading-5">{project.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="h2">Languages</h2>
        <p className="copy mt-3">
          English (Native) • Spanish (Limited Working)
        </p>
      </section>
    </article>
  );
}
