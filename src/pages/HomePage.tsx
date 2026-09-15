import React from "react";

import { About } from "../components/About";
import { Hero } from "../components/Hero";
import { WorkSection } from "../components/WorkSection";
import { WritingSection } from "../components/WritingSection";
import { useRouteMeta } from "../hooks/usePageMeta";

function Home(): React.ReactElement {
  useRouteMeta("/");

  return (
    <div className="page-wrap flex flex-col gap-16 md:gap-24">
      <Hero />
      <WorkSection />
      <WritingSection />
      <About />
    </div>
  );
}

export default Home;
