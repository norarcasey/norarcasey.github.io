import React from "react";
import { Link } from "react-router-dom";

import { SectionHeading } from "./SectionHeading";
import {
  BLOG_BASE,
  blogPath,
  formatPostDate,
  type BlogSummary,
} from "../data/blog";

/** How many posts the section lists. */
const SHOWN = 3;

/**
 * Recent writing, on the home page: the posts after the one `LatestPost`
 * leads with, newest first, as the home page hands them over. The index is
 * fetched client side, so until it arrives (or if it never does, or there is
 * nothing after the newest post) this renders nothing rather than a
 * placeholder: the rest of the page stands on its own, and an empty slot
 * reads better than a broken promise.
 *
 * It listed the newest three until CASEY-10 put the newest in its own well
 * under the hero; before that it was `LatestPost` with one post beside two
 * buttons. The rule about never advertising a post the blog does not have is
 * the same throughout.
 */
export function WritingSection({
  posts: all,
}: {
  posts: BlogSummary[];
}): React.ReactElement | null {
  const posts = all.slice(0, SHOWN);
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
