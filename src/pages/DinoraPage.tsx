import React from "react";
import { Link } from "react-router-dom";

import {
  CaseStudy,
  ShowcaseCallout,
  ShowcaseDetails,
  ShowcaseFacts,
  ShowcaseGame,
  ShowcaseHeader,
  ShowcasePushback,
  ShowcaseTile,
} from "../components/ProjectShowcase";
import { CommitHistory } from "../components/CommitHistory";
import { DinoraSources } from "../components/DinoraSources";
import { CaseStudyMedia } from "../components/CaseStudyMedia";
import { ScreenGallery } from "../components/ScreenGallery";
import dinoraDashboard from "../assets/screens/dinora-dashboard.webp";
import dinoraBudget from "../assets/screens/dinora.webp";
import dinoraCondo from "../assets/screens/dinora-condo.webp";
import dinoraEther from "../assets/screens/dinora-ether.webp";
import dinoraRecurring from "../assets/screens/dinora-recurring.webp";
import dinoraPhoneBudget from "../assets/screens/dinora-phone-budget.webp";
import dinoraPhoneDashboard from "../assets/screens/dinora-phone-dashboard.webp";
import { DINORA_COMMITS, DINORA_RELEASES } from "../data/dinoraHistory";
import { useRouteMeta } from "../hooks/usePageMeta";

/**
 * Dinora's unit tests, all passing, at 1fb2e71 on 7 Oct 2026: 77 files, run by
 * Vitest in 3.8 seconds; 686 of them are packages/core. The database's own checks (row-level security and the
 * schema invariants, in supabase/tests) are SQL and not counted here.
 */
const UNIT_TESTS = "1,340";

/**
 * The fourth case study (CASEY-2, on UI-12's layout). Every figure was measured
 * on 7 Oct 2026 in the Dinora repo.
 *
 * The origin is Nora's own account, given 7 Oct 2026: Monarch was bloated, had
 * ads, made her work its way, had gaps in budgets and goals, cost money and
 * could not hold an account outside the US; and she was curious what goes into
 * a finance app and whether building one was safe. The pushback band comes
 * from the transcript archive, read against the log.
 *
 * **None of the money in the screenshots is hers.** She asked for that
 * (CASEY-2): scripts/shootDinora.mjs runs the real app against invented rows
 * and lets no request leave the laptop, and it retakes every picture here.
 */
export function DinoraPage(): React.ReactElement {
  useRouteMeta("/dinora");

  return (
    <CaseStudy>
      <ShowcaseHeader
        size="hero"
        eyebrow="Case study · 2026 · a web app, a phone app and a Mac app"
        title="Dinora"
        problem="Every account I hold in one place, read-only, with budgets and goals that work the way I do."
        aside={
          <>
            <ShowcaseTile label="Stack" tone="blue">
              React · TypeScript · Vite · Zod · Supabase · Vercel Cron · PWA ·
              Swift · Vitest
            </ShowcaseTile>
            <ShowcaseTile label="Where it runs" tone="pink">
              Hosted on Vercel and Supabase. I open it in a browser, as an
              installed app on my phone, and as a Mac app, all the same build.
            </ShowcaseTile>
            <ShowcaseTile label="Source">
              Private. It reads every account I hold, so it is built for one
              person and closed to everyone else.{" "}
              <Link className="inline-link" to="/contact-me">
                Ask me for a walkthrough
              </Link>
              .
            </ShowcaseTile>
          </>
        }
      >
        <p>
          I used Monarch to see my money in one place, and no single thing made
          me leave it. It was bloated, and I had to work the way it wanted me
          to. It showed ads. Its budgets and goals had gaps: my car and mortgage
          payments never added up to progress I could see. It cost money, and it
          had no way to hold an account outside the US. I wanted a system of my
          own, built for what I actually need.
        </p>
        <p>
          I was also curious. What goes into a finance app? Is it safe to build
          my own? Where does this data live, and who are the players? What I
          found is that building one is easy and inexpensive. Dinora reads every
          account I hold, read-only, and costs almost nothing to run.
        </p>
      </ShowcaseHeader>

      <ShowcaseGame width="100%" thirdParty={false}>
        <CaseStudyMedia
          image={dinoraDashboard}
          alt="The Dinora overview with invented figures. Banks last read five and six hours ago. Net worth of $1,154,160.75 across nine accounts and four assets, with a line under it saying the euro account was converted at the ECB's rate for the day before. Four totals: cash, investments, property and debt owed. Below, a year of net worth by day as a line rising from about $920,000, past a million in February, and running on into a dashed projection with a shaded likely range."
          caption="The overview. The money is invented for this page: the app is real, and every account, charge and balance in it comes from a generator."
        />
      </ShowcaseGame>

      <ShowcaseFacts
        facts={[
          {
            value: "Day one",
            label:
              "from an empty scaffold to live: reading the banks every night, one net total across dollars and euros, and Monarch's history brought in. 41 commits on 24 September.",
          },
          {
            value: UNIT_TESTS,
            label:
              "unit tests, run in under four seconds. Half of them cover a core that imports no React, no database client and no browser API, and a lint rule refuses the import, so that holds by construction.",
          },
          {
            value: "0",
            label:
              "credentials that can move money. Every source is linked read-only, so the worst a breach could cost me is privacy, never a balance.",
          },
        ]}
      >
        <CommitHistory
          commits={DINORA_COMMITS}
          releases={DINORA_RELEASES}
          caption="in fourteen days, 24 September to 7 October 2026. 188 of them were the first five days, which took it from a scaffold to the app I use instead of Monarch."
        />
      </ShowcaseFacts>

      <ShowcaseDetails
        title="How it is built"
        lead="Six sources read every night into one database, and one build opened three ways."
        wide={
          <div className="flex flex-col gap-12">
            <section className="flex flex-col gap-3">
              <h3 className="h3">
                Where the data lives, and who the players are
              </h3>
              <DinoraSources />
            </section>
            <section className="flex flex-col gap-4">
              <h3 className="h3">What it looks like</h3>
              <p className="copy max-w-[64ch]">
                Every figure in these is invented. The app is the real one, run
                on my laptop against a generated household, and no request was
                allowed to leave the machine while they were taken.
              </p>
              <ScreenGallery
                screens={[
                  {
                    image: dinoraBudget,
                    alt: "The budget for September 2026: $3,295.97 spent of $4,170.00 budgeted, $874.03 left. A chart of spending through the month against an even pace and against August. Below it, a notice that two transactions have no category, with a button to categorize them, then the categories that went over.",
                    caption:
                      "A month, closed. Two charges no bank named a category for are offered for sorting right there.",
                  },
                  {
                    image: dinoraCondo,
                    alt: "A house's page. The value I set, $860,000, counts. Since it was bought for $640,000 in 2021, it is up $220,000. What is mine after the home loan is shown beside what is still owed. A line below gives RentCast's estimate and its range, and says mine is the one that counts.",
                    caption:
                      "A home, tied to the loan that bought it. My value counts; the market's estimate sits beside it, quieter.",
                  },
                  {
                    image: dinoraEther,
                    alt: "An Ether holding's page: $77,330.00, from 18.5 ETH at Gemini's close the day before. The value is listed under Values with the quantity it was taken at.",
                    caption:
                      "Crypto entered as how much is held, once, and priced at each day's close.",
                  },
                  {
                    image: dinoraRecurring,
                    alt: "The Activity page, with a search box over 333 transactions and a Recurring list: New Seasons Market, Spotify, Venmo, Portland General Electric, Xfinity and NW Natural, each with how often it comes back, when it is next expected, and about how much a year.",
                    caption:
                      "Recurring charges, found from the history rather than typed in.",
                  },
                ]}
                phones={[
                  {
                    image: dinoraPhoneBudget,
                    alt: "The September budget on a phone, with the spending chart and the month within budget, and a tab bar for Overview, Budget and Activity at the bottom.",
                    caption: "The budget, on the installed phone app.",
                  },
                  {
                    image: dinoraPhoneDashboard,
                    alt: "The overview on a phone: net worth, the four totals in two rows, and the chart's switches.",
                    caption: "The overview, on the phone.",
                  },
                ]}
              />
            </section>
          </div>
        }
      >
        <section className="flex flex-col gap-4">
          <h3 className="h3">Read-only, all the way down</h3>
          <p className="copy max-w-[64ch]">
            Dinora only ever reads. Every source it asks is linked read-only, so
            nothing in it can start a transfer or pay a bill. Nothing is ever
            deleted outright, because a sync that runs twice or a mistake made
            in a hurry must not cost any history. And no amount or payee goes
            into a log, since logs leave the database&apos;s protection and a
            list of payees is a diary.
          </p>
          <h3 className="h3">Totals that agree with the bank</h3>
          <p className="copy max-w-[64ch]">
            Money is kept in whole cents and summed without floating point, so a
            total never drifts from the bank&apos;s by a cent. A total in
            dollars over a euro account stores the rate it used and the date of
            that rate, so last March in dollars does not move because
            today&apos;s rate did. The euro side is built; linking my bank in
            Spain is the next piece.
          </p>
          <h3 className="h3">One build, three ways in</h3>
          <p className="copy max-w-[64ch]">
            The browser, the phone and the Mac all run the same web app. With no
            signal the phone shows what it last read and how old it is, rather
            than nothing. The Mac app is a window onto that build and decides
            nothing itself, because a rule written twice is a rule that goes
            stale in one place.
          </p>
        </section>
      </ShowcaseDetails>

      <ShowcasePushback>
        <p>
          Monarch held my home and car apart from the loans that bought them, so
          the payments on each never showed as progress. The plan was to bring
          them over the same way and value them by hand from then on. I left
          them out instead, until they could be done properly. They came back
          tied to their loans, so each one shows what is mine after the debt.
          The value I set still counts, with a market estimate shown beside it,
          and gold and silver are valued at each day&apos;s price, so what the
          metal has gained since I bought it is on the page.
        </p>
        <p className="copy">
          The exchange I hold crypto with would not issue a read-only key, so
          the plan was to type the coin&apos;s dollar value in by hand until it
          did. I did not want a number I had to keep updating. I entered how
          much I hold, once, and Dinora prices it at each day&apos;s close.
        </p>
        <ShowcaseCallout label="Fix it where it is shown">
          More than once the plan&apos;s answer to a problem was a command to
          run or another page to visit: sign a bank in again from a terminal,
          dig through the accounts for the one a warning was about. Each time I
          asked for the fix where the problem was shown. It is a rule in the
          repository now: wherever the word Uncategorized appears, it can be
          categorized right there.
        </ShowcaseCallout>
      </ShowcasePushback>
    </CaseStudy>
  );
}
