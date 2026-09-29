import { render, screen } from "@testing-library/react";

import { NoradarVerdict } from "./NoradarVerdict";

describe("NoradarVerdict", () => {
  it("names itself for a reader who cannot see it", () => {
    const { container } = render(<NoradarVerdict />);

    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("role", "img");
    const [titleId, descId] = svg.getAttribute("aria-labelledby")!.split(" ");
    expect(container.querySelector(`#${CSS.escape(titleId)}`)?.tagName).toBe(
      "title"
    );
    expect(container.querySelector(`#${CSS.escape(descId)}`)?.tagName).toBe(
      "desc"
    );
    // The two facts the drawing exists to make: one run, two answers, and
    // the commit as the join between a session and an item.
    expect(
      screen.getByText(/GitHub reports the run as a success/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Noradar: not out")).toBeInTheDocument();
    expect(screen.getByText(/The commit is the join/i)).toBeInTheDocument();
  });

  it("keeps the skipped deploy in the one colour that means it", () => {
    const { container } = render(<NoradarVerdict />);

    // The marker pink is reserved, as it is in the other two drawings. If a
    // second thing takes it, the picture stops saying "this is the
    // exception" and starts saying "this is decoration".
    const pink = [...container.querySelectorAll("[stroke], [fill]")].filter(
      (node) =>
        (node.getAttribute("stroke") ?? "").includes("--chart-marker") ||
        (node.getAttribute("fill") ?? "").includes("--chart-marker")
    );
    expect(pink.map((node) => node.tagName)).toEqual(["rect", "text", "text"]);
    expect(pink.at(-1)).toHaveTextContent("skipped");
  });
});
