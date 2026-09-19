import { render, screen } from "@testing-library/react";

import { CaseStudyMedia } from "./CaseStudyMedia";

describe("CaseStudyMedia", () => {
  it("shows a still as a still, with nothing to press", () => {
    const { container } = render(
      <CaseStudyMedia
        image="/board.webp"
        alt="The board, with a week in it"
        caption="The board."
      />
    );

    const image = screen.getByAltText("The board, with a week in it");
    expect(image).toHaveAttribute("src", "/board.webp");
    expect(container.querySelector("video")).toBeNull();
    // A play affordance over something that cannot be played is a promise the
    // page does not keep.
    expect(container.querySelector("svg")).toBeNull();
    expect(screen.getByText("The board.")).toBeInTheDocument();
  });

  it("is the empty frame with neither a still nor a file", () => {
    const { container } = render(
      <CaseStudyMedia label="[45 seconds: capture with no signal]" />
    );

    expect(container.querySelector("video")).toBeNull();
    expect(container.querySelector("img")).toBeNull();
    expect(
      screen.getByText("[45 seconds: capture with no signal]")
    ).toBeInTheDocument();
  });

  it("makes the still the poster once there is a file", () => {
    const { container } = render(
      <CaseStudyMedia
        image="/board.webp"
        alt="Capturing with no signal"
        sources={[
          { src: "/capture.webm", type: "video/webm" },
          { src: "/capture.mp4", type: "video/mp4" },
        ]}
      />
    );

    const video = container.querySelector("video");
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute("poster", "/board.webp");
    expect(video).toHaveAttribute("aria-label", "Capturing with no signal");
    // UI-12's spec, and the rule that outranks it: moving content that runs
    // longer than five seconds has to be pausable, so the controls stay.
    expect(video).toHaveAttribute("loop");
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("controls");
    expect(video).toHaveProperty("muted", true);
    expect(container.querySelector("img")).toBeNull();

    const sources = [...container.querySelectorAll("source")].map((s) => [
      s.getAttribute("src"),
      s.getAttribute("type"),
    ]);
    expect(sources).toEqual([
      ["/capture.webm", "video/webm"],
      ["/capture.mp4", "video/mp4"],
    ]);
  });
});
