import React from "react";

/** The pen: a nib and a body, lying at 45° across the page's lower corner. */
const PEN = "M12 23.9 15.57 22.81 23.74 14.64 21.26 12.16 13.09 20.33Z";

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
      <defs>
        {/* Cuts a gap out of the page wherever the pen lies over it. Painting
            the pen into the mask in black hides the page there; stroking the
            same path widens that by half the stroke, which is the gap. Without
            it the solid pen and the page's corner merge into one dark wedge. */}
        <mask id="blog-icon-pen-gap">
          <rect width="24" height="24" fill="white" />
          <path
            d={PEN}
            fill="black"
            stroke="black"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </mask>
      </defs>

      {/* The page: an outline, not a filled block, which read as a striped
          flag. One evenodd path, so the border is the outer rect minus the
          inner one and the lines of text sit back inside that hole. The last
          line is short, the way a paragraph ends. It fills its box like the
          résumé icon's page beside it, which is the thing the eye compares. */}
      <path
        mask="url(#blog-icon-pen-gap)"
        fillRule="evenodd"
        d="M1 .6h15v20H1z M2.5 2.1h12v17h-12z M4 4.1h8.5v1.5H4z M4 7.6h8.5v1.5H4z M4 11.1h8.5v1.5H4z M4 14.6h5v1.5H4z"
      />

      <path d={PEN} />
    </svg>
  );
}
