import {
  ResumeEntry,
  formatEmploymentPeriod,
  getReactYearsOfExperience,
  getYearsOfExperience,
  REACT_EXPERIENCE_SINCE_YEAR,
} from "./resume";

function entry(overrides: Partial<ResumeEntry>): ResumeEntry {
  return {
    title: "Engineer",
    company: "Acme",
    start: "2020-01",
    end: "2021-01",
    duties: [],
    ...overrides,
  };
}

describe("formatEmploymentPeriod", () => {
  it("formats a closed range with an inclusive duration", () => {
    expect(
      formatEmploymentPeriod(entry({ start: "2024-03", end: "2025-08" }))
    ).toBe("Mar 2024 – Aug 2025 · 1 yr 6 mos");
    expect(
      formatEmploymentPeriod(entry({ start: "2022-11", end: "2024-02" }))
    ).toBe("Nov 2022 – Feb 2024 · 1 yr 4 mos");
    expect(
      formatEmploymentPeriod(entry({ start: "2018-08", end: "2022-11" }))
    ).toBe("Aug 2018 – Nov 2022 · 4 yrs 4 mos");
  });

  it("singularizes a one year, one month span", () => {
    // Jan 2020 through Jan 2021 inclusive = 13 months = 1 yr 1 mo.
    expect(
      formatEmploymentPeriod(entry({ start: "2020-01", end: "2021-01" }))
    ).toBe("Jan 2020 – Jan 2021 · 1 yr 1 mo");
  });

  it("drops the year part for sub-year spans", () => {
    // Jan through Mar inclusive = 3 months.
    expect(
      formatEmploymentPeriod(entry({ start: "2020-01", end: "2020-03" }))
    ).toBe("Jan 2020 – Mar 2020 · 3 mos");
  });

  it("shows a placeholder when the start is not filled in", () => {
    expect(formatEmploymentPeriod(entry({ start: "", end: null }))).toBe(
      "TODO start date – Present"
    );
  });

  describe("with a fixed clock", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-06-15T00:00:00Z"));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("computes an ongoing role's duration up to today", () => {
      // May 2025 through Jun 2026 inclusive = 14 months = 1 yr 2 mos.
      expect(
        formatEmploymentPeriod(entry({ start: "2025-05", end: null }))
      ).toBe("May 2025 – Present · 1 yr 2 mos");
    });

    it("derives total years from the earliest dated role", () => {
      // Earliest experience entry starts in 2009.
      expect(getYearsOfExperience()).toBe(2026 - 2009);
    });

    it("derives React years from the React anchor", () => {
      expect(getReactYearsOfExperience()).toBe(
        2026 - REACT_EXPERIENCE_SINCE_YEAR
      );
    });
  });
});
