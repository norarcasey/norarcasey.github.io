import React from "react";

import { skillGroups } from "../data/resume";

interface SkillsMatrixProps {
  /** Section heading. Defaults to the résumé's wording. */
  title?: string;
  /** Optional lead-in paragraph under the heading. */
  intro?: React.ReactNode;
}

/**
 * The stack, layer by layer: one card per layer (front end, back end, data,
 * infrastructure, quality, leadership) so a reader can see the full-stack
 * range in a couple of seconds rather than parsing one long list of nouns.
 * Reads from the same `skillGroups` data the rest of the résumé renders.
 *
 * It lived on the home page until UI-18 and is the résumé's Skills section
 * now. In print the cards collapse back to one compact line per layer, which
 * is what the résumé said before the matrix arrived; the rules are in
 * `index.css` under `@media print`.
 */
export function SkillsMatrix({
  title = "Skills",
  intro,
}: SkillsMatrixProps): React.ReactElement {
  return (
    <section className="skills">
      <h2 className="h2">{title}</h2>
      {intro ? <p className="copy mt-3">{intro}</p> : null}

      <div className="skills-grid mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.label} className="skills-card card gap-2 p-4">
            <h3 className="skills-card__label text-accent text-base leading-6 font-semibold">
              {group.label}
            </h3>
            <p className="skills-card__blurb copy text-sm leading-5">
              {group.blurb}
            </p>
            <ul className="skills-card__list flex list-none flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="text-text rounded border border-accent-ring px-2 py-0.5 text-xs leading-5"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
