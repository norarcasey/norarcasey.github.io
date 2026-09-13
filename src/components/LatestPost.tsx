import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { HOME_BAND_MAX_WIDTH } from "./Hero";
import { ACCENT_BLUE, ACCENT_PINK, ACCENT_PINK_HOVER } from "../colors";
import {
  BLOG_BASE,
  blogPath,
  formatPostDate,
  sortByNewest,
} from "../data/blog";
import { useBlogIndex } from "../hooks/useBlogPosts";

/**
 * The newest blog post, on the home page. The index is fetched client side, so
 * until it arrives (or if it never does, or there are no posts yet) this
 * renders nothing rather than a placeholder: the rest of the page stands on
 * its own, and an empty slot reads better than a broken promise.
 */
export function LatestPost(): React.ReactElement | null {
  const result = useBlogIndex();
  if (result.status !== "ready") return null;

  const [post] = sortByNewest(result.data);
  if (!post) return null;

  return (
    <Box
      component="section"
      className="tile"
      sx={{ width: "100%", maxWidth: HOME_BAND_MAX_WIDTH, mx: "auto" }}
    >
      <Typography variant="h3" component="h2">
        Latest from the blog
      </Typography>

      <Box display="flex" flexDirection="column" gap={1.5} mt={2}>
        <Typography
          variant="h4"
          component="h3"
          sx={{ color: ACCENT_BLUE, borderBottom: "none" }}
        >
          <Link className="inline-link" to={blogPath(post.slug)}>
            {post.title}
          </Link>
        </Typography>

        <Typography variant="body2" component="p" className="blog-meta">
          <time dateTime={post.publishedAt}>
            {formatPostDate(post.publishedAt)}
          </time>
          {post.tags.length > 0 && (
            <> · {post.tags.map((tag) => tag.name).join(", ")}</>
          )}
        </Typography>

        <Typography variant="body1" sx={{ color: "#4a4f57" }}>
          {post.excerpt}
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={1.5} mt={0.5}>
          <Button
            variant="contained"
            component={Link}
            to={blogPath(post.slug)}
            sx={{
              backgroundColor: ACCENT_PINK,
              "&:hover": { backgroundColor: ACCENT_PINK_HOVER },
              fontWeight: 600,
            }}
          >
            Read the post
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to={BLOG_BASE}
            sx={{
              color: ACCENT_BLUE,
              borderColor: ACCENT_BLUE,
              "&:hover": {
                borderColor: ACCENT_BLUE,
                backgroundColor: "rgba(31, 120, 194, 0.08)",
              },
              fontWeight: 600,
            }}
          >
            All posts
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
