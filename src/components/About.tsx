import React from "react";

import { ExternalLink } from "./ExternalLink";
import { SectionHeading } from "./SectionHeading";

/**
 * Two paragraphs, where there were four labelled ones.
 *
 * The old version led each with a bold tag (My mission, Collaboration
 * champion, Passionate mentor, Beyond the code), which read as a list of
 * claims about herself. These say the same things as sentences.
 */
export function About(): React.ReactElement {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-4">
        <SectionHeading title="About" />
      </div>

      <div className="flex max-w-[64ch] flex-col gap-4 md:col-span-8">
        <p className="copy text-lg leading-7">
          <span className="text-text font-semibold">
            I build software that empowers people.
          </span>{" "}
          Tools that make lives and work easier, measured in speed, reliability,
          and how little the person has to think about them. I work end to end,
          from the data model up through the interface, alongside product and
          design, and I mentor the engineers around me toward owning problems
          the same way.
        </p>
        <p className="copy text-lg leading-7">
          Outside work I construct crossword puzzles at{" "}
          <ExternalLink url="https://crucinora.com" label="crucinora.com" />,
          travel (20+ countries across four continents), photograph for{" "}
          <ExternalLink
            url="https://www.gettyimages.com/search/photographer?photographer=Nora%20Casey&assettype=image&sort=mostpopular&family=creative"
            label="Getty Images"
          />
          , and perform improv with the{" "}
          <ExternalLink
            url="https://www.barcelonaimprovgroup.com/"
            label="Barcelona Improv Group"
          />
          . MS in Computer Science, Georgia Tech.
        </p>
      </div>
    </section>
  );
}
