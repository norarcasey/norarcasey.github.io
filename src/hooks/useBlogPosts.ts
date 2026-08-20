import { useEffect, useState } from "react";

import type { BlogPost, BlogSummary } from "../data/blog";

// The blog's JSON is written into public/blog at build time, so these are
// plain static files on the same origin — cacheable, and unaffected by the
// database being down. See scripts/blogContent.ts.

type Result<T> =
  | { status: "loading" }
  | { status: "ready"; data: T }
  | { status: "error" }
  | { status: "missing" }; // a 404, i.e. no such post

async function loadJson<T>(url: string): Promise<Result<T>> {
  try {
    const response = await fetch(url);
    if (response.status === 404) return { status: "missing" };
    if (!response.ok) return { status: "error" };
    return { status: "ready", data: (await response.json()) as T };
  } catch {
    return { status: "error" };
  }
}

function useJson<T>(url: string): Result<T> {
  // The loaded url is stored alongside its result so "loading" can be derived
  // — we simply have no result for *this* url yet. Setting a loading state
  // synchronously inside the effect would trigger a second render pass on
  // every url change, which React's rules-of-hooks lint rightly rejects.
  const [loaded, setLoaded] = useState<{ url: string; result: Result<T> }>();

  useEffect(() => {
    let cancelled = false;
    loadJson<T>(url).then((result) => {
      if (!cancelled) setLoaded({ url, result });
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return loaded?.url === url ? loaded.result : { status: "loading" };
}

export function useBlogIndex(): Result<BlogSummary[]> {
  return useJson<BlogSummary[]>("/blog/index.json");
}

export function useBlogPost(slug: string | undefined): Result<BlogPost> {
  // An absent slug can't match a file; ask for one that is guaranteed to 404
  // rather than branching the hook order.
  return useJson<BlogPost>(`/blog/posts/${slug ?? "__missing__"}.json`);
}
