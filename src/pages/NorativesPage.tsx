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
import { NorativesPublishPath } from "../components/NorativesPublishPath";
import { TestLayers } from "../components/TestLayers";
import { CaseStudyMedia } from "../components/CaseStudyMedia";
import norativesEditor from "../assets/screens/noratives-editor.webp";
import {
  NORATIVES_COMMITS,
  NORATIVES_RELEASES,
} from "../data/norativesHistory";
import { NORATIVES_TEST_LAYERS } from "../data/norativesTests";
import { useRouteMeta } from "../hooks/usePageMeta";

/**
 * Words written in the studio. Nora's own figure, 19 Sep 2026.
 *
 * It cannot be measured from here, and that is the product working rather
 * than an inconvenience: the entries are owner-only behind row level
 * security, in the production project, and they are journals. The case study
 * argues that nothing reaches them, so nothing here does either. The studio's
 * Stats page sums `entries.word_count`, a column Postgres generates from the
 * body rather than a tally anybody keeps, so the figure is the database's own
 * and she reads it off the app in seconds.
 *
 * A floor rather than a count, deliberately. A precise number would be stale
 * the week after it was written and would have to be either maintained or
 * quietly wrong; a floor is true the day it goes up and truer every day
 * after, because the only direction this moves is up.
 *
 * It is the fact the whole page turns on. Everything else here measures the
 * building; this measures whether the building worked.
 */
const WORDS_WRITTEN = "60,000+";
const WORDS_SINCE = "March";

/**
 * The second case study (UI-12). Every figure on it was measured in the
 * Noratives repo on 19 Sep 2026; the decisions are taken from its README,
 * its docs, and the commit messages, which is where this project keeps the
 * record that Nora Bene keeps in a CLAUDE.md.
 *
 * The framing is Nora\'s own account, given 19 Sep 2026, and it replaced an
 * invented one. The first draft had the studio designed as one place for
 * three kinds of writing, which is what it looks like finished and is not how
 * it happened: it was a journal, because writing in Google Drive meant naming
 * a file and finding it again, and everything else arrived because using it
 * asked for it. That order is the whole argument of the page, so it leads.
 *
 * The three calls in the pushback band are Nora\'s, and are the ones she
 * found by reading the transcript archive against the commit history rather
 * than the ones drafted here from commit bodies. The difference matters: a
 * commit body records a decision, and only the transcript shows a plan being
 * proposed and turned down. Each of these has all three parts UI-12 asked
 * for, the option offered, the option taken, and what it was protecting.
 * Verified against the Noratives log: 2f5a1a3, 17e88fc with 66db15e, 5de1e42.
 *
 * The hero and the home page's card were taken by driving the real app with
 * every Supabase call answered in the browser, so the dev server, the
 * components and the rendering are real and only the rows are invented. The
 * writing in them is written for the shot rather than copied out of anybody's
 * journal, which is the part a writing studio makes harder than a board of
 * lists. The driver is scripts/shootNoratives.mjs.
 */
export function NorativesPage(): React.ReactElement {
  useRouteMeta("/noratives");

  return (
    <CaseStudy>
      <ShowcaseHeader
        size="hero"
        eyebrow="Case study · 2026 · a writing studio, by invitation"
        title="Noratives"
        problem="A journal that asks nothing of me before I can write in it. No file to name, no date to type, no folder to choose, and nothing to go looking for six weeks later."
        aside={
          <>
            <ShowcaseTile label="Stack" tone="blue">
              Vite · React · TypeScript · TipTap · Supabase · Tailwind v4 ·
              Vitest · Playwright
            </ShowcaseTile>
            <ShowcaseTile label="Where it runs" tone="pink">
              noratives.com on Vercel, with Postgres and six edge functions on
              Supabase. It publishes to two sites of mine, one of which is this
              one, and to somebody else&apos;s.
            </ShowcaseTile>
            <ShowcaseTile label="Source">
              Private, and so is the app: an invitation is the account, and most
              of what is in it is nobody else&apos;s business.{" "}
              <Link className="inline-link" to="/contact-me">
                Ask me for a walkthrough
              </Link>
              .
            </ShowcaseTile>
          </>
        }
      >
        <p>
          I used to write in Google Drive. Every entry meant naming a file,
          dating it and deciding where to put it, and every entry after a gap
          meant first finding where I had put the last one. There was a folder
          structure for a while. None of that is writing, and there was enough
          of it that each session was its own small event rather than a habit.
        </p>
        <p>
          So the first version was a journal and nothing else. Everything since
          came from using it. Writing more made me want somewhere for the days I
          felt like writing but not like journaling, so creative work got its
          own notebook, and a generated prompt for when the page was blank. Some
          of that turned out to be worth publishing, so it went to a creative
          site. Then the technical writing went to{" "}
          <Link className="inline-link" to="/blog">
            this one
          </Link>
          . Then a friend&apos;s birthday was coming up and what they wanted was
          a blog, and the whole thing had to stop being one person&apos;s app.
        </p>
      </ShowcaseHeader>

      <ShowcaseGame width="100%" thirdParty={false}>
        {/* A screenshot until there is a recording, and shown as one: no play
            button over something that cannot be played. */}
        <CaseStudyMedia
          image={norativesEditor}
          alt="The Noratives editor with a technical post open: a Field notes badge and the dateline along the top, then the word count and an amber Unpublished changes marker, the title and its tags, the formatting toolbar, and three paragraphs of prose set in a serif."
          caption="A piece open, and the studio saying what is true of it: which notebook it is in, and that what is live is no longer what is written."
        />
      </ShowcaseGame>

      <ShowcaseFacts
        facts={[
          {
            value: <TestLayers layers={NORATIVES_TEST_LAYERS} />,
            label:
              "The bottom layer is where the rules live: what a publish would write, whether a piece has drifted from what is live, how a citation is numbered. It is framework-free by habit rather than by a lint rule, which is the honest version of the claim.",
          },
          {
            value: WORDS_WRITTEN,
            label: `words written in the studio since ${WORDS_SINCE}, counted by the app rather than by me. Everything else on this page measures the building. This is the only number that says whether it worked, because the app exists for one reason: the writing was not happening, and now it is. At a time when so much writing is being handed to a model, these are words I wrote, and writing them keeps that part of my brain awake.`,
          },
        ]}
      >
        <CommitHistory
          commits={NORATIVES_COMMITS}
          releases={NORATIVES_RELEASES}
          caption="in six months, 17 March to 14 September 2026, with two of those months empty. The gaps are the point: it gets used, and picked back up when using it asks for something. The tall week in August is the one where it stopped being mine alone."
        />
      </ShowcaseFacts>

      <ShowcaseDetails
        title="How it is built"
        lead="A private database with one public window cut into it, and a fortnight spent handing everything on the private side back to whoever is writing."
        wide={
          <section className="flex flex-col gap-3">
            <h3 className="h3">What leaves the studio, and what cannot</h3>
            <NorativesPublishPath />
          </section>
        }
      >
        <section className="flex flex-col gap-4">
          <h3 className="h3">
            Everything that was ours became the writer&apos;s
          </h3>
          <p className="copy max-w-[64ch]">
            A piece used to be one of three words of mine: journal, writing or
            technical. Two of them could publish and one could not, and where
            each went was decided in a file. That is fine for one writer with
            two sites and it is the whole of what had to go before anybody else
            could use it.
          </p>
          <p className="copy max-w-[64ch]">
            A notebook is now whatever the writer names, and where it publishes
            is a property of the notebook rather than a setting on the piece. A
            journal is not a special case the app refuses to publish; it is a
            notebook nobody gave a destination to. The sites went the same way:
            they were two constants, and a constant cannot be owned, renamed by
            the person it belongs to, or added without a deploy, so they are
            rows now.
          </p>
          <p className="copy max-w-[64ch]">
            Publishing then needs both halves, the grant and a destination of
            your own, which is why somebody can hold the grant and still have
            nowhere to put a piece. That is the state everybody is in on the day
            they are invited, and it is the honest one: the alternative is an
            app that hands a new writer my sites.
          </p>
          <h3 className="h3">The words in it are the writer&apos;s too</h3>
          <p className="copy max-w-[64ch]">
            A generated prompt is offered rather than handed over, and it is
            stored in its own column rather than in the body, so answering it
            cannot absorb it and publishing cannot carry it. Nothing in the app
            writes a sentence for you. The usage log follows the same line: it
            records what somebody did, never what they wrote, so ten kinds of
            event are counted and no words leave with them.
          </p>
        </section>
      </ShowcaseDetails>

      <ShowcasePushback>
        <p>
          The plan picked a destination at publish time, from a list the app
          declared. I moved the question to the start: you say what you are
          writing before you write it, and the notebooks are the writer&apos;s
          to name rather than three words of ours. That sounds like a choice
          about a menu and it is a choice about the schema. Once the notebook is
          picked up front and belongs to whoever is writing, a journal stops
          being a rule the database enforces and becomes a notebook nobody gave
          a destination to. Publishing is opt-in without anyone having built
          opt-in, which is exactly what a second person&apos;s account needs.
          Three items I had parked as blocked turned into one, and the file that
          held my two sites as constants ended up with nothing left to say.
        </p>
        <p className="copy">
          I asked for the test suite to get shorter without costing more CI
          minutes, and got a ranked list back: two workers plus explicit budgets
          on the slowest specs, run as one experiment, with skipping the browser
          tests on documentation-only pushes below it. I took the one underneath
          first. It needs no experiment and it saves a whole sixteen-minute run
          every time it fires. The experiment ran as well, and measuring it is
          what settled the order: Chromium went from 564 seconds to 410, and
          Mobile Safari went from 240 up to 280. Chromium has thirty-one spec
          files, so a second worker always has another to start; Mobile Safari
          has three, so the extra worker competed for two cores and bought
          nothing. The worker count belongs in the matrix, not in the config.
        </p>
        <p className="copy">
          Every migration in the folder opened by telling you to paste it into
          the SQL editor, and the plan for the next one said so too, because it
          was the habit rather than anybody&apos;s decision. Pasting records
          nothing in the migration history, which is the hole this project had
          already climbed out of once: production&apos;s history was empty and
          had to be repaired in a single call before the tooling could be used
          at all. So, no manual migrations. The half I care more about is what
          came after. I wanted the documents cleaned up without losing the
          record of how things had actually been applied, so the first thirty
          headers still say paste, because that is what happened to them, and
          the three later ones that said it untruthfully were corrected. A file
          that misdescribes its own history is worse than one naming a route
          nobody uses.
        </p>
        <ShowcaseCallout label="What the view leaves out">
          The public window into the database carries a slug, a title, a body,
          tags and a date, and deliberately no author. A public feed that named
          who wrote each piece would also be a directory of who uses the studio,
          which is a different product from the one this is.
        </ShowcaseCallout>
      </ShowcasePushback>
    </CaseStudy>
  );
}
