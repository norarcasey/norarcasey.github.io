import { render, screen } from "@testing-library/react";

import {
  ProjectShowcase,
  ShowcaseDetails,
  ShowcaseGame,
  ShowcaseHeader,
  ShowcaseSummary,
} from "./ProjectShowcase";

/** The showcase's grid container, i.e. the first grid in the tree. */
function gridOf(container: HTMLElement): HTMLElement {
  const grid = [...container.querySelectorAll<HTMLElement>("*")].find(
    (node) => getComputedStyle(node).display === "grid"
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

    const areaFor = (el: HTMLElement) =>
      getComputedStyle(slotOf(el, container)).gridArea;

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

  it("fills the header row rather than letting .tile centre it", () => {
    // `.tile` sets auto side margins. That is inert for a block child but
    // centres a grid item, which once pushed the title away from the summary
    // column it should line up with.
    const { container } = render(
      <ProjectShowcase>
        <ShowcaseHeader title="Arkanora" />
      </ProjectShowcase>
    );

    const header = slotOf(screen.getByRole("heading", { level: 1 }), container);
    expect(getComputedStyle(header).width).toBe("100%");
    expect(getComputedStyle(header).boxSizing).toBe("border-box");
  });

  // `hideOnMobile` and the column widths resolve through media queries, which
  // jsdom does not evaluate. They are covered in e2e/showcase.spec.ts instead.
});
