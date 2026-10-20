import React from "react";
import { Link } from "react-router-dom";

import { blogPath, formatPostDate, type BlogSummary } from "../data/blog";

/** The well's frame, shared by the post and its skeleton so they match. */
const WELL = "card relative gap-3 p-6 md:p-8";

/**
 * One line of placeholder text: a box the height of the line it stands in
 * for, with a bar inside it about the height of the letters.
 */
function Bar({
  line,
  bar,
  width,
}: {
  line: string;
  bar: string;
  width: string;
}): React.ReactElement {
  return (
    <div className={`flex items-center ${line}`}>
      <div className={`rounded bg-border ${bar} ${width}`} />
    </div>
  );
}

/**
 * The well's shape while the index loads, so the post arriving does not push
 * Work down (CASEY-12). Line for line it is the loaded well: eyebrow, title,
 * tags, excerpt, and the "Read the post" label, each at its own line height.
 * The title and excerpt wrap more on a phone, so they get more lines there.
 */
function LatestPostSkeleton(): React.ReactElement {
  return (
    <div
      aria-hidden="true"
      data-testid="latest-post-skeleton"
      className={`${WELL} animate-pulse motion-reduce:animate-none`}
    >
      <Bar line="h-5" bar="h-3" width="w-56" />
      <div>
        <Bar line="h-9" bar="h-6" width="w-full max-w-[28rem]" />
        <Bar line="h-9 md:hidden" bar="h-6" width="w-2/3" />
      </div>
      <Bar line="h-5" bar="h-3" width="w-64 max-w-full" />
      <div className="max-w-[70ch]">
        <Bar line="h-6" bar="h-3.5" width="w-full" />
        <Bar line="h-6 md:hidden" bar="h-3.5" width="w-full" />
        <Bar line="h-6 md:hidden" bar="h-3.5" width="w-full" />
        <Bar line="h-6" bar="h-3.5" width="w-3/5" />
      </div>
      <Bar line="h-6" bar="h-4" width="w-32" />
    </div>
  );
}

/**
 * The newest post, as a well under the hero (CASEY-10). The Writing section
 * below it starts from the second post, so the two never show the same one.
 *
 * While the index loads it holds the well's space with a skeleton. Once it
 * has loaded, with no post (the fetch failed, or nothing is published), it
 * renders nothing, the same rule as Writing: never advertise a post the blog
 * does not have. That one case still moves Work up; the prerender writes only
 * the head, so there is no body to bake the post into.
 *
 * Like a product card, the title's link is stretched over the whole well, so
 * "Read the post" is a label rather than a second link to the same place.
 */
export function LatestPost({
  post,
  loading,
}: {
  post: BlogSummary | undefined;
  loading: boolean;
}): React.ReactElement | null {
  if (loading) return <LatestPostSkeleton />;
  if (!post) return null;

  return (
    <section
      aria-labelledby="latest-post-title"
      className={`${WELL} hover:border-accent`}
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
