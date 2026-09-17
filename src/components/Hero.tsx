import React from "react";
import { Link } from "react-router-dom";

import { getYearsOfExperience } from "../data/resume";

/** One of the three facts beside the headline. */
function Fact({
  value,
  label,
  last = false,
}: {
  value: string;
  label: string;
  last?: boolean;
}): React.ReactElement {
  return (
    <div
      className={`flex flex-col gap-0.5 md:py-3 ${
        last ? "" : "md:border-b md:border-border"
      }`}
    >
      <span className="text-text text-lg leading-6 font-bold md:text-2xl md:leading-8">
        {value}
      </span>
      <span className="meta text-xs md:text-[13px]">{label}</span>
    </div>
  );
}

/**
 * The top of the home page, and for some readers the whole of it.
 *
 * It leads with what Nora does and who it is for rather than with a job
 * title. The headline is her sentence, revised 17 Sep 2026 from the line the
 * canvas drew, which she read back as immature; the runway's UI-14 has both.
 * The three facts beside it replace the eight-chip row that used to sit
 * under the paragraph: the chips said the same things in a form nobody
 * reads. The years figure is computed from the résumé data rather than
 * written here, so it cannot go stale the way a number in a sentence does.
 */
export function Hero(): React.ReactElement {
  const years = getYearsOfExperience();

  return (
    <section className="grid grid-cols-1 items-end gap-8 md:grid-cols-12">
      <div className="flex flex-col gap-5 md:col-span-8">
        <p className="eyebrow">
          Staff full-stack engineer · Team lead · Barcelona
        </p>
        <h1 className="h1 max-w-[18ch] text-[32px] leading-[38px] md:text-[44px] md:leading-[52px]">
          I build software that solves people&apos;s problems.
        </h1>
        <p className="lead max-w-[58ch] text-[17px] leading-[26px] md:text-lg md:leading-7">
          {years} years shipping software across the stack, at companies from a
          first hire to an enterprise. I lead teams, mentor engineers, and stay
          in the code. AI writes most of the code now; the gap between what it
          writes and what ships is where I work. Below is what I build for
          myself: tools I wanted to exist, in production, used every day.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-3">
          <Link to="/resume" className="btn btn-pink">
            View résumé
          </Link>
          <Link to="/contact-me" className="btn btn-blue">
            Get in touch
          </Link>
        </div>
      </div>

      <div className="mt-2 flex flex-row gap-5 border-t border-border pt-4 md:col-span-4 md:mt-0 md:flex-col md:gap-0 md:self-center md:border-t-0 md:border-l md:border-border md:pt-0 md:pl-8">
        <Fact value={`${years}+ yrs`} label="building for the web" />
        <Fact value="MS CS" label="Georgia Tech" />
        <Fact value="US and EU" label="work authorized" last />
      </div>
    </section>
  );
}
