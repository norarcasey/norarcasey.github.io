import { render, screen } from "@testing-library/react";

import { NorativesPublishPath } from "./NorativesPublishPath";

describe("NorativesPublishPath", () => {
  it("names itself for a reader who cannot see it", () => {
    const { container } = render(<NorativesPublishPath />);

    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("role", "img");
    // The picture is the claim, so the claim has to reach a screen reader: a
    // title that says what it shows and a description carrying the same paths
    // the arrows do. Ids are generated, so the wiring is what is checked
    // rather than the values.
    const [titleId, descId] = svg.getAttribute("aria-labelledby")!.split(" ");
    expect(container.querySelector(`#${CSS.escape(titleId)}`)?.tagName).toBe(
      "title"
    );
    expect(container.querySelector(`#${CSS.escape(descId)}`)?.tagName).toBe(
      "desc"
    );
    expect(
      screen.getByText(
        /what leaves the studio for a public site, and what cannot/i
      )
    ).toBeInTheDocument();
    // The two facts the drawing exists to make: a journal has nowhere to go,
    // and the public view carries no author.
    expect(screen.getByText(/it is not publishable at all/i)).toBeVisible();
    // Scoped to the drawing's own label rather than to "no user_id", which
    // the description says too and which would match both.
    expect(
      screen.getByText(/nothing else\. It carries no user_id/i)
    ).toBeInTheDocument();
  });

  it("keeps the notebook that never leaves in the one colour that means it", () => {
    const { container } = render(<NorativesPublishPath />);

    // The marker pink is reserved here, as it is in the Nora Bene drawing. If
    // a second thing takes it, the picture stops saying "this is the
    // exception" and starts saying "this is decoration".
    const pink = [...container.querySelectorAll("[stroke], [fill]")].filter(
      (node) =>
        (node.getAttribute("stroke") ?? "").includes("--chart-marker") ||
        (node.getAttribute("fill") ?? "").includes("--chart-marker")
    );
    expect(pink.map((node) => node.tagName)).toEqual(["rect", "text", "text"]);
    expect(pink.at(-1)).toHaveTextContent("nowhere to publish it to");
  });
});
