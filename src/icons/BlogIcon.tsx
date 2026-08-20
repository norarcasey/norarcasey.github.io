import React from "react";

export function BlogIcon({ color }: { color?: string }): React.ReactElement {
  const fill = color || "black";
  return (
    <svg
      aria-hidden="true"
      focusable={false}
      fill={fill}
      height="30px"
      width="30px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {/* An article: one page with a picture and its columns of text. The
          inner shapes are holes in the same path (evenodd), so the icon is a
          single filled glyph like the others and needs no background colour of
          its own. */}
      <path
        fillRule="evenodd"
        d="M3 5h18v14H3z M5 7h6v5H5z M13 7h6v1.5h-6z M13 10.5h6v1.5h-6z M5 14h14v1.5H5z M5 16.5h14v1.5H5z"
      />
    </svg>
  );
}
