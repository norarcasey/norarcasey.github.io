import { render, screen } from "@testing-library/react";

import { Recording } from "./Recording";

describe("Recording", () => {
  it("is the poster frame and the label until there is a file", () => {
    const { container } = render(
      <Recording label="ingest a file and play it back" caption="Muted." />
    );

    expect(container.querySelector("video")).toBeNull();
    expect(
      screen.getByText("ingest a file and play it back")
    ).toBeInTheDocument();
    expect(screen.getByText("Muted.")).toBeInTheDocument();
  });

  it("is a muted, looping, inline video with the browser's controls once it has one", () => {
    const { container } = render(
      <Recording
        label="ingest a file and play it back"
        poster="/poster.webp"
        sources={[
          { src: "/kinora.webm", type: "video/webm" },
          { src: "/kinora.mp4", type: "video/mp4" },
        ]}
      />
    );

    const video = container.querySelector("video");
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute(
      "aria-label",
      "ingest a file and play it back"
    );
    expect(video).toHaveAttribute("poster", "/poster.webp");
    // UI-12's spec, and the rule that outranks it: moving content that runs
    // longer than five seconds has to be pausable, so the controls stay.
    expect(video).toHaveAttribute("loop");
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("controls");
    expect(video).toHaveProperty("muted", true);

    // Sources in the order given, so the browser tries them in that order.
    const sources = [...container.querySelectorAll("source")].map((s) => [
      s.getAttribute("src"),
      s.getAttribute("type"),
    ]);
    expect(sources).toEqual([
      ["/kinora.webm", "video/webm"],
      ["/kinora.mp4", "video/mp4"],
    ]);
  });
});
