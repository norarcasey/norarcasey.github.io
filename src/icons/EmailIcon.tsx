import React from "react";

export function EmailIcon({ color }: { color?: string }): React.ReactElement {
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
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 24 24"
    >
      <path d="M20,4H4C2.895,4,2,4.895,2,6v12c0,1.105,0.895,2,2,2h16c1.105,0,2-0.895,2-2V6C22,4.895,21.105,4,20,4z M20,8.236l-8,5l-8-5V6 l8,5l8-5V8.236z" />
    </svg>
  );
}
