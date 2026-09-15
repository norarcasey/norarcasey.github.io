import React from "react";
import { Link } from "react-router-dom";

import { SectionHeading } from "./SectionHeading";
import {
  BLOG_BASE,
  blogPath,
  formatPostDate,
  sortByNewest,
} from "../data/blog";
import { useBlogIndex } from "../hooks/useBlogPosts";

/** How many of the newest posts the home page shows. */
const SHOWN = 3;

/**
 * The newest writing, on the home page. The index is fetched client side, so
 * until it arrives (or if it never does, or there are no posts yet) this
 * renders nothing rather than a placeholder: the rest of the page stands on
 * its own, and an empty slot reads better than a broken promise.
 *
 * It was `LatestPost` and showed one post beside two buttons. The canvas shows
 * three under a heading, which is the same rule about never advertising a post
 * the blog does not have, applied to a list.
 */
export function WritingSection(): React.ReactElement | null {
  const result = useBlogIndex();
  if (result.status !== "ready") return null;

  const posts = sortByNewest(result.data).slice(0, SHOWN);
  if (posts.length === 0) return null;

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-4">
        <SectionHeading title="Writing">
          Notes on building for the web: what I made, what broke, and what I
          would do differently.
        </SectionHeading>
        <Link to={BLOG_BASE} className="btn btn-blue mt-6">
          All posts
        </Link>
      </div>

      <div className="flex flex-col md:col-span-8 md:-mt-5">
        {posts.map((post, index) => (
          <div
            key={post.slug}
            className={`flex flex-col gap-1.5 py-5 ${
              index < posts.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <h3 className="h3">
              <Link to={blogPath(post.slug)}>{post.title}</Link>
            </h3>
            <p className="meta">
              <time dateTime={post.publishedAt}>
                {formatPostDate(post.publishedAt)}
              </time>
              {post.tags.length > 0 && (
                <> · {post.tags.map((tag) => tag.name).join(" · ")}</>
              )}
            </p>
            <p className="copy max-w-[70ch]">{post.excerpt}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
