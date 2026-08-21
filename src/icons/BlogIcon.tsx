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
      {/* A written page and the pen that wrote it.
          The page is an outline, not a filled block: filled, with a picture
          square in the corner, it read as a little striped flag. Drawn as one
          evenodd path, so the border is the outer rect minus the inner one and
          the three lines of text sit back inside that hole. The last line is
          short, the way a paragraph ends.
          The drawing runs corner to corner of the viewBox rather than sitting
          inset in it, so it renders the same size as the résumé icon beside it,
          which fills its own box. */}
      <path
        fillRule="evenodd"
        d="M1 .6h11.5v16.5H1z M2.5 2.1h8.5v13.5H2.5z M4 4h5.5v1.5H4z M4 6.9h5.5v1.5H4z M4 9.8h5.5v1.5H4z M4 12.7h3v1.5H4z"
      />
      {/* The pen lies across the corner the page leaves free, angled as if it
          had just been set down. It keeps clear of the page rather than
          overlapping it: at 30px an overlap merges into a blob. */}
      <path d="M11.6 23.96 15.17 22.87 23.74 14.3 21.26 11.82 12.69 20.39Z" />
    </svg>
  );
}
