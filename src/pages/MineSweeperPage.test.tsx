import { render, screen } from "@testing-library/react";
import { MineSweeperPage } from "./MineSweeperPage";

// Guards against the duplicate-React regression: @norarcasey/mine-sweeper
// declares react as a dependency (not a peer), so without the `resolutions`
// override it pulls in a second React copy and rendering throws an invalid
// hook call. This test mounts the real MineSweeper component to catch that.
describe("MineSweeperPage", () => {
  it("renders the page and the MineSweeper game without crashing", () => {
    render(<MineSweeperPage />);

    expect(screen.getByText("Mine Sweeper")).toBeInTheDocument();
    expect(screen.getByLabelText("Beginner")).toBeInTheDocument();
  });
});
