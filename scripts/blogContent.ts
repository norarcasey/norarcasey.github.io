import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { loadEnv, type Plugin } from "vite";

import {
  excerptFrom,
  sortByNewest,
  type BlogPost,
  type BlogSummary,
  type BlogTag,
} from "../src/data/blog";

// The blog's content lives in the Inkwell studio's Supabase project, in the
// `public_posts` view. Publishing a technical post writes a snapshot
// there and pokes this repo to rebuild.
//
// The build turns those rows into static JSON under public/blog/, which the app
// fetches at runtime. Writing into public/ rather than the build output means
// one code path serves both `yarn dev` and `yarn build` — Vite copies public/
// into docs/ on its own.
//
// Why static JSON rather than querying Supabase from the browser: the pages
// stay up if the database is down, the anon key never ships in the bundle, and
// the response is a cacheable file on the CDN instead of a round trip per view.

const SITE = "noracasey";

/** Shape of a `public_posts` row, as PostgREST returns it. */
interface SnapshotRow {
  slug: string;
  title: string | null;
  body_html: string;
  body_text: string;
  tags: BlogTag[] | null;
  published_at: string;
  updated_at: string;
}

/** One snapshot row as the site's own post. Pure, so it is unit-tested. */
export function toBlogPost(row: SnapshotRow): BlogPost {
  return {
    slug: row.slug,
    // A published post should always have a title, but the studio permits an
    // untitled draft, and an empty <h1> would be worse than a placeholder.
    title: row.title?.trim() || "Untitled",
    excerpt: excerptFrom(row.body_text),
    bodyHtml: row.body_html,
    tags: Array.isArray(row.tags) ? row.tags : [],
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
  };
}

export function summarize(post: BlogPost): BlogSummary {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { bodyHtml, ...summary } = post;
  return summary;
}

/**
 * Every technical post currently live, newest first.
 *
 * Throws rather than returning nothing on failure. A build that quietly
 * succeeds with an empty blog would publish a site missing all its posts, and
 * nothing would look broken until someone noticed the pages were gone.
 */
export async function fetchBlogPosts(
  supabaseUrl: string,
  anonKey: string
): Promise<BlogPost[]> {
  const query = new URLSearchParams({
    site: `eq.${SITE}`,
    select: "slug,title,body_html,body_text,tags,published_at,updated_at",
    order: "published_at.desc",
  });

  const response = await fetch(
    `${supabaseUrl.replace(/\/$/, "")}/rest/v1/public_posts?${query}`,
    { headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` } }
  );

  if (!response.ok) {
    throw new Error(
      `blog: Supabase returned ${response.status} ${await response.text()}`
    );
  }

  const rows = (await response.json()) as SnapshotRow[];
  return sortByNewest(rows.map(toBlogPost)) as BlogPost[];
}

/** Where the generated JSON goes, relative to the project root. */
const OUT_DIR = "public/blog";

export function writeBlogData(root: string, posts: BlogPost[]): void {
  const dir = resolve(root, OUT_DIR);
  // Rewritten from scratch each build so an unpublished post's file can't
  // linger and keep answering its old URL.
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(join(dir, "posts"), { recursive: true });

  writeFileSync(
    join(dir, "index.json"),
    JSON.stringify(posts.map(summarize), null, 2)
  );

  for (const post of posts) {
    writeFileSync(
      join(dir, "posts", `${post.slug}.json`),
      JSON.stringify(post, null, 2)
    );
  }
}

/**
 * Fetches the blog at build (and dev-server) start and writes it to public/.
 *
 * Runs in both modes so `yarn dev` shows the real blog. Without credentials it
 * warns and writes an empty blog: a contributor without the keys can still work
 * on the rest of the site, but CI, which has them, cannot silently ship empty.
 */
export function blogContent(): Plugin {
  let root = process.cwd();
  let env: Record<string, string> = {};

  return {
    name: "blog-content",

    // Vitest loads this same config, and the unit tests neither need the blog
    // nor carry credentials — without this the test run would reach for the
    // network and, in CI, fail outright on the missing-credentials guard.
    apply: () => !process.env.VITEST,

    configResolved(config) {
      root = config.root;
      // Vite puts .env files on import.meta.env, which a build plugin can't
      // read — process.env alone would silently ignore a local .env and build
      // an empty blog. loadEnv reads the .env files *and* merges in matching
      // process.env vars, which is how CI supplies them.
      env = loadEnv(config.mode, config.envDir || config.root, "VITE_");
    },

    async buildStart() {
      const supabaseUrl = env.VITE_SUPABASE_URL;
      const anonKey = env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !anonKey) {
        const message =
          "blog: VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are unset, so the blog will be empty";
        if (process.env.CI) throw new Error(message);
        this.warn(message);
        writeBlogData(root, []);
        return;
      }

      const posts = await fetchBlogPosts(supabaseUrl, anonKey);
      writeBlogData(root, posts);
      this.info(`blog: wrote ${posts.length} post(s) to ${OUT_DIR}`);
    },
  };
}
