import React from "react";
import { Link, useParams } from "react-router-dom";

import { BLOG_BASE, formatPostDate } from "../data/blog";
import { useBlogPost } from "../hooks/useBlogPosts";
import { usePageMeta } from "../hooks/usePageMeta";

export function BlogPostPage(): React.ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const result = useBlogPost(slug);

  // The served HTML already carries this post's real title and description
  // (the build prerenders one file per post). This keeps them right after a
  // client-side navigation, where no new document is fetched.
  const title = result.status === "ready" ? result.data.title : "Blog";
  const description =
    result.status === "ready" ? result.data.excerpt : undefined;
  usePageMeta(title, description);

  return (
    <div className="page-wrap page-wrap--narrow">
      <div className="flex flex-col gap-4">
        <p className="copy">
          <Link className="inline-link" to={BLOG_BASE}>
            ← All posts
          </Link>
        </p>

        {result.status === "loading" && (
          <p className="copy" role="status">
            Loading…
          </p>
        )}

        {result.status === "error" && (
          <p className="copy" role="alert">
            This post couldn&apos;t be loaded. Please try again later.
          </p>
        )}

        {result.status === "missing" && (
          <>
            <h1 className="h1">Post not found</h1>
            <p className="copy">
              There&apos;s no post at this address. It may have been
              unpublished.
            </p>
          </>
        )}

        {result.status === "ready" && (
          <>
            <h1 className="h1">{result.data.title}</h1>
            <p className="meta blog-meta">
              <time dateTime={result.data.publishedAt}>
                {formatPostDate(result.data.publishedAt)}
              </time>
              {result.data.tags.length > 0 && (
                <>
                  {" · "}
                  {result.data.tags.map((tag) => tag.name).join(", ")}
                </>
              )}
            </p>
            {/* The body is HTML written by me in my own studio and stored in
                my own database: the same trust boundary as the rest of this
                site's copy. No third party can put markup here. */}
            <div
              className="blog-body"
              dangerouslySetInnerHTML={{ __html: result.data.bodyHtml }}
            />
          </>
        )}
      </div>
    </div>
  );
}
