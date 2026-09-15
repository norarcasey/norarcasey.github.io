import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  blogPath,
  collectTags,
  filterByTag,
  formatPostDate,
  sortByNewest,
} from "../data/blog";
import { useBlogIndex } from "../hooks/useBlogPosts";
import { useRouteMeta } from "../hooks/usePageMeta";

export function BlogIndexPage(): React.ReactElement {
  useRouteMeta("/blog");

  const result = useBlogIndex();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const posts = useMemo(
    () => (result.status === "ready" ? sortByNewest(result.data) : []),
    [result]
  );
  const tags = useMemo(() => collectTags(posts), [posts]);
  const visible = useMemo(
    () => filterByTag(posts, activeTag),
    [posts, activeTag]
  );

  return (
    <div className="page-wrap page-wrap--narrow">
      <div className="flex flex-col gap-4">
        {/* "Blog", not the nav's "Writing": this item moves the page onto the
            tokens, it does not rename it. */}
        <h1 className="h1">Blog</h1>
        <p className="lead">
          Notes on building for the web: what I made, what broke, and what I
          would do differently.
        </p>

        {tags.length > 0 && (
          // A filter, not navigation: each chip is a button that narrows the
          // list in place, and aria-pressed carries its state to screen
          // readers, which a link or a plain span would not.
          <div
            className="mt-2 flex flex-wrap gap-2"
            role="group"
            aria-label="Filter posts by tag"
          >
            <button
              type="button"
              className="tag-chip"
              aria-pressed={activeTag === null}
              onClick={() => setActiveTag(null)}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag.name}
                type="button"
                className="tag-chip"
                aria-pressed={activeTag === tag.name}
                onClick={() =>
                  setActiveTag(activeTag === tag.name ? null : tag.name)
                }
              >
                {tag.name}
              </button>
            ))}
          </div>
        )}

        {result.status === "loading" && (
          <p className="copy" role="status">
            Loading posts…
          </p>
        )}

        {result.status === "error" && (
          <p className="copy" role="alert">
            The posts couldn&apos;t be loaded. Please try again later.
          </p>
        )}

        {result.status === "ready" && visible.length === 0 && (
          <p className="copy">
            {posts.length === 0
              ? "No posts yet. Check back soon."
              : "No posts with that tag."}
          </p>
        )}

        <ul className="blog-list mt-2">
          {visible.map((post) => (
            <li key={post.slug} className="blog-list-item">
              <h2 className="h3">
                <Link className="inline-link" to={blogPath(post.slug)}>
                  {post.title}
                </Link>
              </h2>
              <p className="meta blog-meta">
                <time dateTime={post.publishedAt}>
                  {formatPostDate(post.publishedAt)}
                </time>
                {post.tags.length > 0 && (
                  <> · {post.tags.map((tag) => tag.name).join(", ")}</>
                )}
              </p>
              <p className="copy">{post.excerpt}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
