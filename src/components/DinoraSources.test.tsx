import { render, screen } from "@testing-library/react";

import { DinoraSources } from "./DinoraSources";

describe("DinoraSources", () => {
  it("names itself for a reader who cannot see it", () => {
    const { container } = render(<DinoraSources />);

    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("role", "img");
    const [titleId, descId] = svg.getAttribute("aria-labelledby")!.split(" ");
    expect(container.querySelector(`#${CSS.escape(titleId)}`)?.tagName).toBe(
      "title"
    );
    expect(container.querySelector(`#${CSS.escape(descId)}`)?.tagName).toBe(
      "desc"
    );
    // The three facts the drawing exists to make: who answers, where it is
    // kept, and that nothing goes back.
    expect(screen.getByText("SimpleFIN Bridge")).toBeInTheDocument();
    expect(screen.getByText("Postgres, at Supabase")).toBeInTheDocument();
    expect(
      screen.getByText(/so nothing in the app can move money/i)
    ).toBeInTheDocument();
  });

  it("keeps the read-only line in the one colour that means the exception", () => {
    const { container } = render(<DinoraSources />);

    // The marker pink is reserved, as it is in the other three drawings. If a
    // second thing takes it, the picture stops saying "this is the
    // exception" and starts saying "this is decoration".
    const pink = [...container.querySelectorAll("[stroke], [fill]")].filter(
      (node) =>
        (node.getAttribute("stroke") ?? "").includes("--chart-marker") ||
        (node.getAttribute("fill") ?? "").includes("--chart-marker")
    );
    expect(pink.map((node) => node.tagName)).toEqual(["text"]);
    expect(pink[0]).toHaveTextContent(/every source is read-only/);
  });
});
