import React from "react";

export function ExternalLink({
  url,
  label,
}: {
  url: string;
  label: string;
}): React.ReactElement {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      {label}
    </a>
  );
}
