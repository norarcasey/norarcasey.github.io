import React from "react";
import { Box, Grid, Typography } from "@mui/material";
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
    <Grid container display="flex" flexDirection="column" alignItems="center">
      <Grid size={{ xs: 12, md: 10, lg: 8 }}>
        <section className="tile">
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="body2">
              <Link className="inline-link" to={BLOG_BASE}>
                ← All posts
              </Link>
            </Typography>

            {result.status === "loading" && (
              <Typography variant="body2" role="status">
                Loading…
              </Typography>
            )}

            {result.status === "error" && (
              <Typography variant="body2" role="alert">
                This post couldn't be loaded. Please try again later.
              </Typography>
            )}

            {result.status === "missing" && (
              <>
                <Typography variant="h3" component="h1">
                  Post not found
                </Typography>
                <Typography variant="body1">
                  There's no post at this address. It may have been unpublished.
                </Typography>
              </>
            )}

            {result.status === "ready" && (
              <>
                <Typography variant="h3" component="h1">
                  {result.data.title}
                </Typography>
                <Typography variant="body2" className="blog-meta">
                  <time dateTime={result.data.publishedAt}>
                    {formatPostDate(result.data.publishedAt)}
                  </time>
                  {result.data.tags.length > 0 && (
                    <>
                      {" · "}
                      {result.data.tags.map((tag) => tag.name).join(", ")}
                    </>
                  )}
                </Typography>
                {/* The body is HTML written by me in my own studio and stored
                    in my own database — the same trust boundary as the rest of
                    this site's copy. No third party can put markup here. */}
                <Box
                  className="blog-body"
                  dangerouslySetInnerHTML={{ __html: result.data.bodyHtml }}
                />
              </>
            )}
          </Box>
        </section>
      </Grid>
    </Grid>
  );
}
