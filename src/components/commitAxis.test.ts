import { weeklyTickStep } from "./commitAxis";

/**
 * The chart is drawn in SVG units against a fixed viewBox, so the only part of
 * it a jsdom test can say anything useful about is the arithmetic that decides
 * how crowded the axis is allowed to get. That arithmetic is what the second
 * case study needed: the same component draws three weeks of commits and six
 * months of them, and an axis labelled every week is right for one and
 * unreadable on the other.
 */
describe("weeklyTickStep", () => {
  it("labels every week when the days are far enough apart", () => {
    // Nora Bene: 22 days across the plot's ~950 units.
    expect(weeklyTickStep(950 / 22)).toBe(7);
  });

  it("thins the labels out on a long span", () => {
    // Noratives: 182 days, so a day is about five units and a week's worth of
    // them cannot hold a date.
    expect(weeklyTickStep(950 / 182)).toBe(14);
  });

  it("only ever steps in whole weeks, so the labels stay on one weekday", () => {
    for (const slot of [0.5, 1, 3, 5, 8, 13, 40, 200]) {
      expect(weeklyTickStep(slot) % 7).toBe(0);
    }
  });
});
