import { useEffect } from "react";

import { SITE_ROUTES, pageTitle, type SiteRoutePath } from "../data/siteRoutes";

/**
 * Applies a route's shared metadata, the same copy the build bakes into that
 * route's HTML file. Pages should use this rather than passing their own
 * strings, so what React sets on navigation matches what the server served.
 */
export function useRouteMeta(path: SiteRoutePath): void {
  const { title, description } = SITE_ROUTES[path];
  usePageMeta(title, description);
}

/**
 * Sets the document <title> and meta description for a page, restoring the
 * previous values when the component unmounts. This is a lightweight,
 * dependency-free alternative to react-helmet for our small SPA — it keeps
 * browser tabs, bookmarks, and JS-rendering crawlers in sync per route.
 */
export function usePageMeta(title: string, description?: string): void {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = pageTitle(title);

    const meta = description
      ? document.querySelector<HTMLMetaElement>('meta[name="description"]')
      : null;
    const previousDescription = meta?.getAttribute("content") ?? null;
    if (meta && description) {
      meta.setAttribute("content", description);
    }

    return () => {
      document.title = previousTitle;
      if (meta && previousDescription !== null) {
        meta.setAttribute("content", previousDescription);
      }
    };
  }, [title, description]);
}
