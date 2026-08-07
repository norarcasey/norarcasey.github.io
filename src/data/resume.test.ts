import {
  ResumeEntry,
  experience,
  formatEmploymentPeriod,
  getBackEndYearsOfExperience,
  getReactYearsOfExperience,
  getYearsOfExperience,
  REACT_EXPERIENCE_SINCE_YEAR,
  selectedProjects,
  skillGroups,
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

describe("skillGroups", () => {
  it("covers the whole stack, not just the client", () => {
    const labels = skillGroups.map((group) => group.label);
    expect(labels).toEqual(expect.arrayContaining(["Front end", "Data"]));
    expect(labels).toEqual(
      expect.arrayContaining(["Back end & APIs", "Infrastructure & delivery"])
    );
  });

  it("gives every group a blurb and at least one skill", () => {
    for (const group of skillGroups) {
      expect(group.blurb).not.toBe("");
      expect(group.skills.length).toBeGreaterThan(0);
    }
  });

  it("has no duplicate group labels", () => {
    const labels = skillGroups.map((group) => group.label);
    expect(new Set(labels).size).toBe(labels.length);
  });
});

describe("selectedProjects", () => {
  it("links every project over https so the résumé label can strip the scheme", () => {
    for (const project of selectedProjects) {
      expect(project.url.startsWith("https://")).toBe(true);
      expect(project.description).not.toBe("");
    }
  });
});

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

    it("sums the back-end roles rather than spanning from the earliest one", () => {
      const earliestMarked = Math.min(
        ...experience
          .filter((entry) => entry.backEnd)
          .map((entry) => Number(entry.start.split("-")[0]))
      );
      // Jun 2026 clock: the marked roles total 149 months. Spanning from the
      // earliest of them (2012) would read 14 and the career total reads 17,
      // so landing under both proves the years in between are excluded.
      expect(getBackEndYearsOfExperience()).toBe(12);
      expect(getBackEndYearsOfExperience()).toBeLessThan(2026 - earliestMarked);
      expect(getBackEndYearsOfExperience()).toBeLessThan(
        getYearsOfExperience()
      );
    });
  });
});
