import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import {
  CaseStudy,
  ProjectShowcase,
  PUSHBACK_LEAD,
  ShowcaseDetails,
  ShowcaseFacts,
  ShowcaseGame,
  ShowcaseHeader,
  ShowcasePushback,
  ShowcaseSummary,
} from "./ProjectShowcase";
import { CaseStudyFixture } from "./caseStudyFixture";

/** The layout's grid container, whichever of the two layouts rendered. */
function gridOf(container: HTMLElement): HTMLElement {
  const grid = container.querySelector<HTMLElement>(
    ".showcase-grid, .case-study-grid"
  );
  if (!grid) throw new Error("no grid container rendered");
  return grid;
}

/** The grid item a piece of content sits in, i.e. its slot wrapper. */
function slotOf(el: HTMLElement, container: HTMLElement): HTMLElement {
  const slot = [...gridOf(container).children].find((child) =>
    child.contains(el)
  );
  if (!slot) throw new Error("content is not inside any slot");
  return slot as HTMLElement;
}

/** Each slot places itself with an inline grid-area, which jsdom can read. */
function areaOf(el: HTMLElement, container: HTMLElement): string {
  return slotOf(el, container).style.gridArea;
}

describe("ProjectShowcase", () => {
  it("renders every slot's content", () => {
    render(
      <ProjectShowcase>
        <ShowcaseHeader title="Arkanora" />
        <ShowcaseSummary>
          <p>What the project is.</p>
        </ShowcaseSummary>
        <ShowcaseGame>
          <div>the game</div>
        </ShowcaseGame>
        <ShowcaseDetails>
          <p>How it is built.</p>
        </ShowcaseDetails>
      </ProjectShowcase>
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Arkanora" })
    ).toBeInTheDocument();
    expect(screen.getByText("What the project is.")).toBeInTheDocument();
    expect(screen.getByText("the game")).toBeInTheDocument();
    expect(screen.getByText("How it is built.")).toBeInTheDocument();
  });

  it("places each slot by grid area, so source order does not decide layout", () => {
    // Deliberately scrambled: placement comes from each slot, not its position.
    const { container } = render(
      <ProjectShowcase>
        <ShowcaseDetails>
          <p>How it is built.</p>
        </ShowcaseDetails>
        <ShowcaseGame>
          <div>the game</div>
        </ShowcaseGame>
        <ShowcaseHeader title="Arkanora" />
        <ShowcaseSummary>
          <p>What the project is.</p>
        </ShowcaseSummary>
      </ProjectShowcase>
    );

    const areaFor = (el: HTMLElement) => areaOf(el, container);

    expect(areaFor(screen.getByRole("heading", { level: 1 }))).toBe("header");
    expect(areaFor(screen.getByText("What the project is."))).toBe("summary");
    expect(areaFor(screen.getByText("the game"))).toBe("game");
    expect(areaFor(screen.getByText("How it is built."))).toBe("details");
  });

  it("omits slots that are not given", () => {
    render(
      <ProjectShowcase>
        <ShowcaseHeader title="Arkanora" />
        <ShowcaseSummary>
          <p>What the project is.</p>
        </ShowcaseSummary>
      </ProjectShowcase>
    );

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.queryByText("How it is built.")).not.toBeInTheDocument();
  });

  it("passes the game column's width to the CSS as a custom property", () => {
    // The column is full width until lg and this value from lg; index.css
    // reads it, so a number and "fit-content" both have to arrive as CSS.
    const { container, rerender } = render(
      <ProjectShowcase>
        <ShowcaseGame width={480}>
          <div>the game</div>
        </ShowcaseGame>
      </ProjectShowcase>
    );
    const slot = () => slotOf(screen.getByText("the game"), container);
    expect(slot().style.getPropertyValue("--game-width")).toBe("480px");

    rerender(
      <ProjectShowcase>
        <ShowcaseGame width="fit-content">
          <div>the game</div>
        </ShowcaseGame>
      </ProjectShowcase>
    );
    expect(slot().style.getPropertyValue("--game-width")).toBe("fit-content");
  });

  // `hideOnMobile` and the column widths resolve through media queries, which
  // jsdom does not evaluate. They are covered in e2e/showcase.spec.ts instead.
});

describe("CaseStudy", () => {
  it("is the second layout on the same slots, plus two of its own", () => {
    const { container } = render(
      <MemoryRouter>
        <CaseStudy>
          <ShowcasePushback>
            <p>the call I made</p>
          </ShowcasePushback>
          <ShowcaseFacts facts={[{ value: "230", label: "commits" }]} />
          <ShowcaseDetails title="How it is built">
            <p>the stack</p>
          </ShowcaseDetails>
          <ShowcaseGame width="100%">
            <div>the recording</div>
          </ShowcaseGame>
          <ShowcaseHeader title="Kinora" size="hero" />
        </CaseStudy>
      </MemoryRouter>
    );

    const areaFor = (el: HTMLElement) => areaOf(el, container);
    expect(areaFor(screen.getByRole("heading", { level: 1 }))).toBe("header");
    expect(areaFor(screen.getByText("the recording"))).toBe("game");
    expect(areaFor(screen.getByText("230"))).toBe("facts");
    expect(areaFor(screen.getByText("the stack"))).toBe("details");
    expect(areaFor(screen.getByText("the call I made"))).toBe("pushback");
  });

  it("renders the canvas's Kinora artboard: header band, tiles, and bands", () => {
    render(
      <MemoryRouter>
        <CaseStudyFixture />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Kinora" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Case study · 2026 · private, single user")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/built as though it had 100,000/)
    ).toBeInTheDocument();

    // The three tiles beside the header.
    for (const label of ["Stack", "Where it runs", "Source"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }

    // The two bands carry their headings; the pushback carries its subtitle.
    expect(
      screen.getByRole("heading", { level: 2, name: "How it is built" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Where I pushed back" })
    ).toBeInTheDocument();
    expect(screen.getByText(PUSHBACK_LEAD)).toBeInTheDocument();
    expect(screen.getByText("Scale lesson")).toBeInTheDocument();

    // A StackFacts inside a titled band carries no heading of its own.
    expect(
      screen.queryByRole("heading", { level: 2, name: "How it's built" })
    ).not.toBeInTheDocument();
  });

  it("shows at most three measured facts", () => {
    render(
      <ShowcaseFacts
        facts={[
          { value: "1", label: "one" },
          { value: "2", label: "two" },
          { value: "3", label: "three" },
          { value: "4", label: "four" },
        ]}
      />
    );

    expect(screen.getByText("three")).toBeInTheDocument();
    expect(screen.queryByText("four")).not.toBeInTheDocument();
  });
});
