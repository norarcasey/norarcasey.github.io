import React from "react";

import { About } from "../components/About";
import { Hero } from "../components/Hero";
import { LatestPost } from "../components/LatestPost";
import { WorkSection } from "../components/WorkSection";
import { WritingSection } from "../components/WritingSection";
import { sortByNewest } from "../data/blog";
import { useBlogIndex } from "../hooks/useBlogPosts";
import { useRouteMeta } from "../hooks/usePageMeta";

function Home(): React.ReactElement {
  useRouteMeta("/");

  // Fetched once here and split: the newest post leads under the hero, and
  // Writing lists the ones after it. Until the index arrives both get nothing.
  const index = useBlogIndex();
  const posts = index.status === "ready" ? sortByNewest(index.data) : [];

  return (
    <div className="page-wrap flex flex-col gap-16 md:gap-24">
      <Hero />
      <LatestPost post={posts[0]} />
      <WorkSection />
      <WritingSection posts={posts.slice(1)} />
      <About />
    </div>
  );
}

export default Home;
