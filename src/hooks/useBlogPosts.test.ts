import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useBlogIndex, useBlogPost } from "./useBlogPosts";
import type { BlogPost } from "../data/blog";

const POST: BlogPost = {
  slug: "a-post",
  title: "A post",
  excerpt: "What it is about.",
  bodyHtml: "<p>The body.</p>",
  tags: [],
  publishedAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};

/** A fetch that answers from a map of url to response, and 404s anything else. */
function serve(files: Record<string, unknown>) {
  const fetchMock = vi.fn(async (url: string) => {
    if (!(url in files)) return new Response("nope", { status: 404 });
    return new Response(JSON.stringify(files[url]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function calledUrls(): string[] {
  return vi.mocked(fetch).mock.calls.map((call) => String(call[0]));
}

describe("useBlogPost", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("reads a post from its static file", async () => {
    serve({ "/blog/posts/a-post.json": POST });

    const { result } = renderHook(() => useBlogPost("a-post"));

    expect(result.current).toEqual({ status: "loading" });
    await waitFor(() =>
      expect(result.current).toEqual({ status: "ready", data: POST })
    );
  });

  // A withdrawn post is the case that matters: the link stays in somebody's
  // history, and the page it lands on has to say the post is gone rather than
  // that the site is broken.
  it("turns a 404 into missing, not an error", async () => {
    serve({});

    const { result } = renderHook(() => useBlogPost("withdrawn"));

    await waitFor(() => expect(result.current).toEqual({ status: "missing" }));
  });

  it("asks for a path that cannot exist when there is no slug", async () => {
    serve({});

    const { result } = renderHook(() => useBlogPost(undefined));

    await waitFor(() => expect(result.current).toEqual({ status: "missing" }));
    // The guaranteed 404 is deliberate: it reaches "missing" through the same
    // branch a real absent post does, rather than through a special case.
    expect(calledUrls()).toEqual(["/blog/posts/__missing__.json"]);
  });

  it("reports an error when the request fails outright", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("offline");
      })
    );

    const { result } = renderHook(() => useBlogPost("a-post"));

    await waitFor(() => expect(result.current).toEqual({ status: "error" }));
  });

  it("reports an error for a server failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("no", { status: 500 }))
    );

    const { result } = renderHook(() => useBlogPost("a-post"));

    await waitFor(() => expect(result.current).toEqual({ status: "error" }));
  });

  // The result is stored with the url it came from, so a slug change reads as
  // loading rather than as the previous post still being the answer.
  it("goes back to loading when the slug changes", async () => {
    const other: BlogPost = { ...POST, slug: "another", title: "Another" };
    serve({
      "/blog/posts/a-post.json": POST,
      "/blog/posts/another.json": other,
    });

    const { result, rerender } = renderHook(({ slug }) => useBlogPost(slug), {
      initialProps: { slug: "a-post" },
    });
    await waitFor(() => expect(result.current.status).toBe("ready"));

    rerender({ slug: "another" });

    expect(result.current).toEqual({ status: "loading" });
    await waitFor(() =>
      expect(result.current).toEqual({ status: "ready", data: other })
    );
  });
});

describe("useBlogIndex", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("reads the listing from the build's index file", async () => {
    const { bodyHtml, ...summary } = POST;
    expect(bodyHtml).toBeTruthy(); // the listing drops it; the post file keeps it
    serve({ "/blog/index.json": [summary] });

    const { result } = renderHook(() => useBlogIndex());

    await waitFor(() =>
      expect(result.current).toEqual({ status: "ready", data: [summary] })
    );
    expect(calledUrls()).toEqual(["/blog/index.json"]);
  });
});
