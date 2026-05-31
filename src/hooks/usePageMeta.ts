import { useEffect } from "react";

const SITE_NAME = "Nora Casey";

/**
 * Sets the document <title> and meta description for a page, restoring the
 * previous values when the component unmounts. This is a lightweight,
 * dependency-free alternative to react-helmet for our small SPA — it keeps
 * browser tabs, bookmarks, and JS-rendering crawlers in sync per route.
 */
export function usePageMeta(title: string, description?: string): void {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title === SITE_NAME ? title : `${title} · ${SITE_NAME}`;

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
