import React from "react";

export interface StackFact {
  /** Short layer or concern, e.g. "Release". */
  label: string;
  /** What that layer actually is for this project. */
  value: React.ReactNode;
}

interface StackFactsProps {
  /**
   * Section heading. Defaults to "How it is built"; pass `null` when the band
   * around the list already carries the heading, as a case study's does.
   */
  title?: string | null;
  facts: StackFact[];
}

/**
 * The engineering side of a project page: a labeled breakdown of the stack,
 * from the domain core out to how the artifact gets released. Rendered as a
 * description list so each label is programmatically tied to its value, one
 * hairline row per fact, the label in its own column once there is room.
 */
export function StackFacts({
  title = "How it is built",
  facts,
}: StackFactsProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-2">
      {title ? <h2 className="h3">{title}</h2> : null}
      <dl className="flex flex-col">
        {facts.map((fact, index) => (
          <div
            key={fact.label}
            className={`grid grid-cols-1 gap-1 py-4 md:grid-cols-[180px_minmax(0,1fr)] md:gap-6 ${
              index < facts.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <dt className="text-text text-base leading-6 font-semibold">
              {fact.label}
            </dt>
            <dd className="copy max-w-[64ch]">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
