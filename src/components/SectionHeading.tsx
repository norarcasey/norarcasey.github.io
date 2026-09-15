import React from "react";

/**
 * A section's opening: the five-stripe mark, the heading, and an optional
 * line under it. The mark is 32px of the same rule that runs under the header
 * and above the footer, and it is the motif's whole vocabulary besides those.
 */
export function SectionHeading({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="flex flex-col gap-2">
      <div className="section-mark" aria-hidden="true" />
      <h2 className="h2">{title}</h2>
      {children ? <p className="lead max-w-[60ch]">{children}</p> : null}
    </div>
  );
}
