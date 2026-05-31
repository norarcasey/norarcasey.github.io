import { render } from "@testing-library/react";
import { usePageMeta } from "./usePageMeta";

function Page({ title, description }: { title: string; description?: string }) {
  usePageMeta(title, description);
  return null;
}

describe("usePageMeta", () => {
  it("suffixes the site name onto the page title", () => {
    render(<Page title="Résumé" />);
    expect(document.title).toBe("Résumé · Nora Casey");
  });

  it("does not double up the suffix on the home title", () => {
    render(<Page title="Nora Casey" />);
    expect(document.title).toBe("Nora Casey");
  });

  it("updates the meta description when provided", () => {
    const meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    meta.setAttribute("content", "original");
    document.head.appendChild(meta);

    const { unmount } = render(
      <Page title="Piano" description="play a piano" />
    );
    expect(meta.getAttribute("content")).toBe("play a piano");

    unmount();
    expect(meta.getAttribute("content")).toBe("original");
  });
});
