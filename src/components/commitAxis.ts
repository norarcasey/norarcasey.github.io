/**
 * The one piece of the commit chart's geometry worth testing on its own, and
 * the reason it is not in `CommitHistory.tsx`: a module that exports a
 * component and a function defeats fast refresh, so the function moves out.
 */

// A date label is about 38 units wide at the axis's 12, so ticks closer
// together than this would overlap rather than merely crowd.
const MIN_TICK_GAP = 56;

/**
 * How many days between x-axis labels, always a whole number of weeks.
 *
 * Weeks rather than any interval that fits, because a label every 13 days
 * lands on a different weekday each time and the axis stops reading as a
 * calendar. Three weeks of commits label every week; six months of them label
 * every two, which is what the second case study needed from the same chart.
 */
export function weeklyTickStep(slot: number): number {
  let weeks = 1;
  while (slot * weeks * 7 < MIN_TICK_GAP) weeks += 1;
  return weeks * 7;
}
