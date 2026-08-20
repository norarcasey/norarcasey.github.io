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
          short, the way a paragraph ends. */}
      <path
        fillRule="evenodd"
        d="M2 2h12v14H2z M3.5 3.5h9v11h-9z M5 5.5h6v1.4H5z M5 8.3h6v1.4H5z M5 11.1h3.5v1.4H5z"
      />
      {/* The pen lies across the corner the page leaves free, angled as if it
          had just been set down. It keeps clear of the page rather than
          overlapping it: at 30px an overlap merges into one blob. */}
      <path d="M12.3 22.7 15.76 21.64 23.8 13.6 21.4 11.2 13.36 19.24Z" />
    </svg>
  );
}
