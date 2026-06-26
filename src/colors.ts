// Accent colors tuned to meet WCAG AA contrast against the white page
// background. The original brand blue (#4b9ae7) and pink (#df6695) only reach
// ~3:1, which fails for text and for white-on-pink buttons, so those hues are
// reserved for decorative, non-text use (dashed borders and dividers).

/** Links, headings, and accent text. ~4.8:1 on white — passes AA normal text. */
export const ACCENT_BLUE = "#1f78c2";

/** Pink accent text and button backgrounds (with white text). ~5.4:1 on white. */
export const ACCENT_PINK = "#b83d6b";

/** Hover shade for the pink buttons. */
export const ACCENT_PINK_HOVER = "#9e3259";

/** Decorative pink for dashed borders and dividers only — never text. */
export const DECORATIVE_PINK = "#df6695";
