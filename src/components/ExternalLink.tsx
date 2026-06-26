import React from "react";

export function ExternalLink({
  url,
  label,
}: {
  url: string;
  label: string;
}): React.ReactElement {
  return (
    <a
      href={url}
      className="inline-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
