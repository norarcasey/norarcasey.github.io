import React from "react";

/** The pen: a nib and a body, at 45° across the page's lower right. It ends
 *  above the page's bottom edge, so the page is what sets the icon's size. */
const PEN = "M13.2 21 16.45 20.01 23.53 12.93 21.27 10.67 14.19 17.75Z";

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
            it the solid pen and the page's border merge into one dark wedge. */}
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
          line is short, the way a paragraph ends.
          It runs nearly the full box, like the résumé icon's page beside it,
          and the pen sits against its lower right the way that icon's person
          does. Sizing the two pages to match is what makes the two icons look
          the same size; matching their bounding boxes does not, because a pen
          hanging past the page pads the box while the page shrinks. */}
      <path
        mask="url(#blog-icon-pen-gap)"
        fillRule="evenodd"
        d="M.8 .4h17.6v23H.8z M2.3 1.9h14.6v20H2.3z M4 4.4h11v1.5H4z M4 7.9h11v1.5H4z M4 11.4h11v1.5H4z M4 14.9h6v1.5H4z"
      />

      <path d={PEN} />
    </svg>
  );
}
