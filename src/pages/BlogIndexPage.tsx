import React, { useMemo, useState } from "react";
import { Box, Chip, Grid, Typography } from "@mui/material";
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
    <Grid container display="flex" flexDirection="column" alignItems="center">
      <Grid size={{ xs: 12, md: 10, lg: 8 }}>
        <section className="tile">
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h3" component="h1">
              Blog
            </Typography>
            <Typography variant="body1">
              Notes on building for the web — what I made, what broke, and what
              I'd do differently.
            </Typography>

            {tags.length > 0 && (
              // A filter, not navigation: each chip is a button that narrows
              // the list in place, and aria-pressed carries its state to
              // screen readers, which a plain Chip would not.
              <Box
                display="flex"
                flexWrap="wrap"
                gap={1}
                role="group"
                aria-label="Filter posts by tag"
              >
                <Chip
                  label="All"
                  component="button"
                  clickable
                  aria-pressed={activeTag === null}
                  variant={activeTag === null ? "filled" : "outlined"}
                  onClick={() => setActiveTag(null)}
                />
                {tags.map((tag) => (
                  <Chip
                    key={tag.name}
                    label={tag.name}
                    component="button"
                    clickable
                    aria-pressed={activeTag === tag.name}
                    variant={activeTag === tag.name ? "filled" : "outlined"}
                    onClick={() =>
                      setActiveTag(activeTag === tag.name ? null : tag.name)
                    }
                  />
                ))}
              </Box>
            )}

            {result.status === "loading" && (
              <Typography variant="body2" role="status">
                Loading posts…
              </Typography>
            )}

            {result.status === "error" && (
              <Typography variant="body2" role="alert">
                The posts couldn't be loaded. Please try again later.
              </Typography>
            )}

            {result.status === "ready" && visible.length === 0 && (
              <Typography variant="body2">
                {posts.length === 0
                  ? "No posts yet — check back soon."
                  : "No posts with that tag."}
              </Typography>
            )}

            <Box component="ul" className="blog-list">
              {visible.map((post) => (
                <Box component="li" key={post.slug} className="blog-list-item">
                  <Typography variant="h5" component="h2">
                    <Link className="inline-link" to={blogPath(post.slug)}>
                      {post.title}
                    </Link>
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    className="blog-meta"
                  >
                    <time dateTime={post.publishedAt}>
                      {formatPostDate(post.publishedAt)}
                    </time>
                    {post.tags.length > 0 && (
                      <> · {post.tags.map((tag) => tag.name).join(", ")}</>
                    )}
                  </Typography>
                  <Typography variant="body1">{post.excerpt}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </section>
      </Grid>
    </Grid>
  );
}
