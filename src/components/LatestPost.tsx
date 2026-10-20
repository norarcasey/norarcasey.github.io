import React from "react";
import { Link } from "react-router-dom";

import { blogPath, formatPostDate, type BlogSummary } from "../data/blog";

/**
 * The newest post, as a well under the hero (CASEY-10). The Writing section
 * below it starts from the second post, so the two never show the same one.
 *
 * Given `null` while the index is loading or when it failed, it renders
 * nothing, the same rule as Writing: never advertise a post the blog does not
 * have. The cost is that it arrives after first paint and moves Work down;
 * the prerender writes only the head, so there is no body to bake it into.
 *
 * Like a product card, the title's link is stretched over the whole well, so
 * "Read the post" is a label rather than a second link to the same place.
 */
export function LatestPost({
  post,
}: {
  post: BlogSummary | undefined;
}): React.ReactElement | null {
  if (!post) return null;

  return (
    <section
      aria-labelledby="latest-post-title"
      className="card relative gap-3 p-6 hover:border-accent md:p-8"
    >
      <p className="eyebrow">
        Latest post ·{" "}
        <time dateTime={post.publishedAt}>
          {formatPostDate(post.publishedAt)}
        </time>
      </p>
      <h2 id="latest-post-title" className="h2 max-w-[32ch]">
        <Link
          to={blogPath(post.slug)}
          className="text-text hover:text-accent after:absolute after:inset-0 after:content-['']"
        >
          {post.title}
        </Link>
      </h2>
      {post.tags.length > 0 && (
        <p className="meta">{post.tags.map((tag) => tag.name).join(" · ")}</p>
      )}
      <p className="copy max-w-[70ch]">{post.excerpt}</p>
      <p className="font-semibold text-accent" aria-hidden="true">
        Read the post →
      </p>
    </section>
  );
}
