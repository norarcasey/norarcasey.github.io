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
import { CaseStudyMedia } from "../components/CaseStudyMedia";
import { CommitHistory } from "../components/CommitHistory";
import { CruciNoraSplit } from "../components/CruciNoraSplit";
import { ExternalLink } from "../components/ExternalLink";
import crucinoraSolve from "../assets/screens/crucinora-solve.webp";
import crucinoraHome from "../assets/screens/crucinora-home.webp";
import crucinoraPhone from "../assets/screens/crucinora-phone.webp";
import {
  CRUCINORA_COMMITS,
  CRUCINORA_RELEASES,
} from "../data/crucinoraHistory";
import { useRouteMeta } from "../hooks/usePageMeta";

const VISIT_URL = "https://crucinora.com";

/**
 * CruciNora's tests at 29f01de (4 Oct 2026), counted from the source on
 * 13 Oct 2026: 358 cases in 42 files, 94 of them in `src/crossword`, the
 * engine, which imports no React and no DOM. Counted rather than run, since
 * the repo had no install; the same figure is the last one its own runway
 * recorded, on 23 Sep, and no test file changed after that.
 */
const UNIT_TESTS = "358";

/**
 * The fifth case study (CASEY-6, on UI-12's layout), replacing the page
 * CruciNora had on the plain showcase layout. Every figure was measured on
 * 13 Oct 2026 in the CruciNora repo.
 *
 * The origin is Nora's own account, written into CASEY-6: crosswords since she
 * was young, solving them and making themes is the part she enjoys, filling
 * the grid with standard entries and clues is not, and the app is a step
 * towards her 2027 goal of getting a crossword published. The pushback band
 * comes from the transcript archive, which keeps the sessions from 31 August
 * on; the June sessions that built the first version are gone.
 *
 * The screenshots are the public site as any visitor sees it, taken by
 * scripts/shootCruciNora.mjs. The builder is behind an admin sign-in, so it
 * has no screenshot here.
 */
export function CruciNoraPage(): React.ReactElement {
  useRouteMeta("/crucinora");

  return (
    <CaseStudy>
      <ShowcaseHeader
        size="hero"
        eyebrow="Case study · 2026 · a web app"
        title="CruciNora"
        problem="I make the theme. A solver fills the grid around it, Claude drafts the clues, and I edit every one."
        aside={
          <>
            <ShowcaseTile label="Stack" tone="blue">
              React · TypeScript · Vite · Supabase · Vercel functions · Claude ·
              Vitest
            </ShowcaseTile>
            <ShowcaseTile label="Where it runs" tone="pink">
              Hosted on Vercel and Supabase. Anyone can solve the puzzles;
              building one takes a sign-in that only I have.
            </ShowcaseTile>
            {/* The links sit in the neutral tile: the accent link on the pink
                wash fails contrast in the light scheme. */}
            <ShowcaseTile label="Source">
              Private. The puzzles are at{" "}
              <ExternalLink url={VISIT_URL} label="crucinora.com" />.{" "}
              <Link className="inline-link" to="/contact-me">
                Ask me for a walkthrough
              </Link>
              .
            </ShowcaseTile>
          </>
        }
      >
        <p>
          I love crosswords, and I have been doing them since I was very young.
          I enjoy solving them and coming up with themes. What I do not enjoy is
          filling the rest of the grid, and writing the standard clues every
          grid needs.
        </p>
        <p>
          CruciNora does that part with me. I choose the theme answers, a solver
          fills every other square around them, and Claude suggests clues that I
          accept or rewrite. Building it got me closer to my goal for 2027:
          getting a crossword published.
        </p>
      </ShowcaseHeader>

      <ShowcaseGame width="100%" thirdParty={false}>
        <CaseStudyMedia
          image={crucinoraSolve}
          alt="A published CruciNora puzzle, Will O' the Wisp, from Monday, August 31, 2026. The Across clues run down the left with the first, Merit badge awarder for short, highlighted. Beside them a 15 by 15 grid, empty and ready to solve, and under it a bar showing the current clue, 1A."
          caption="Will O' the Wisp, the puzzle published on 31 August, on the public site."
        />
      </ShowcaseGame>

      <ShowcaseFacts
        facts={[
          {
            value: "9 hours",
            label:
              "from an empty scaffold to a public site where a puzzle can be solved, with the builder, the solver and the word list in between.",
          },
          {
            value: "119,331",
            label:
              "entries in the list the solver fills from: a curated crossword list, scored by how common each word is, with offensive words taken out.",
          },
          {
            value: UNIT_TESTS,
            label:
              "unit tests. 94 cover the engine, the grid, the rules and the solver, which imports no React and no DOM.",
          },
        ]}
      >
        <CommitHistory
          commits={CRUCINORA_COMMITS}
          releases={CRUCINORA_RELEASES}
          caption="from 19 June to 4 October 2026. 138 of them were the first nine days; each return after that came from using it."
        />
      </ShowcaseFacts>

      <ShowcaseDetails
        title="How it is built"
        lead="An engine with no React in it, a builder only I can sign in to, and a public site to solve on."
        wide={
          <div className="flex flex-col gap-12">
            <section className="flex flex-col gap-3">
              <h3 className="h3">Who makes which part</h3>
              <CruciNoraSplit />
            </section>
            <section className="flex flex-col gap-4">
              <h3 className="h3">What a solver sees</h3>
              {/* One desktop shot and one phone, so they share a row: the
                  gallery's two-up grid would leave half of it empty. Same
                  frames and ratios as ScreenGallery, at the sizes the driver
                  shoots (1280 by 900, 390 by 844). */}
              <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-[minmax(0,1fr)_200px]">
                <figure className="flex flex-col gap-3">
                  <img
                    src={crucinoraHome}
                    alt="The CruciNora home page: Crosswords for everyone, with nine puzzle cards from Saturday, June 20 to Monday, August 31, 2026, each with its title and size. One is a 21 by 21 Sunday, Cheesy Cities."
                    loading="lazy"
                    decoding="async"
                    className="block aspect-[64/45] w-full rounded-xl border border-border bg-wash-blue object-cover object-top"
                  />
                  <figcaption className="meta">
                    Every puzzle published so far, newest first. Each opens on
                    its own link.
                  </figcaption>
                </figure>
                <figure className="flex max-w-[240px] flex-col gap-3">
                  <img
                    src={crucinoraPhone}
                    alt="The same puzzle on a phone: the grid fills the width, the current clue sits under it, and a keyboard drawn by the app fills the bottom of the screen."
                    loading="lazy"
                    decoding="async"
                    className="block aspect-[195/422] w-full rounded-xl border border-border bg-wash-blue object-cover object-top"
                  />
                  <figcaption className="meta">
                    On a phone, the grid, the clue and a keyboard the app draws
                    itself share one screen.
                  </figcaption>
                </figure>
              </div>
            </section>
          </div>
        }
      >
        <section className="flex flex-col gap-4">
          <h3 className="h3">The fill is a search</h3>
          <p className="copy max-w-[64ch]">
            Filling a grid means every crossing letter has to make a word both
            across and down, and a language model does that unreliably. A
            backtracking solver does it: it takes the slot with the fewest words
            that still fit, checks the crossings ahead of each choice, and never
            uses a word twice. It runs in the browser on a time budget, and when
            a grid cannot be filled it says why and marks the squares that block
            it.
          </p>
          <h3 className="h3">Claude writes, code counts</h3>
          <p className="copy max-w-[64ch]">
            Claude suggests three clues for an entry, or one for every entry in
            batches of twenty, in a plain style or a playful one. The prompt
            sets the voice: clue women, and queer, trans and nonbinary people,
            by their own work. Clues I have written before are offered first,
            and a clue I lock is left alone. When Claude proposes theme answers,
            code searches the word list and counts the letters, and each answer
            shows its length and the slots it fits.
          </p>
          <h3 className="h3">Two ways to publish</h3>
          <p className="copy max-w-[64ch]">
            A puzzle goes to crucinora.com on its release date, which the
            database enforces, or it goes to the New York Times. For the Times,
            the app checks the paper&apos;s rules (rotational symmetry, at most
            one square in six black, a cap on the number of words, every entry
            clued, no answer twice) and writes the submission sheet. A puzzle
            takes one of the two, because the Times takes only puzzles that have
            not been published anywhere else.
          </p>
        </section>
      </ShowcaseDetails>

      <ShowcasePushback>
        <p>
          The theme assistant began with one job, proposing theme answers, and
          it told me so whenever my message did not say the word theme.
          Brainstorming starts in a lot of ways. It was given a conversational
          prompt of its own. Offered a choice between checking its answers when
          I asked and checking every reply, I chose every reply, though that
          costs several model calls a turn.
        </p>
        <ShowcaseCallout label="The model proposes, the code measures">
          The assistant&apos;s prompt told it not to count letters, because
          models miscount them, and nothing else counted them either. The plan
          was a toggle between chatting and vetted answers. I asked to remove
          the toggle and make counting a step that a separate piece takes after
          the model replies, and then for the same with anagrams: asked for nut
          anagrams, it should call a function for the options. It now searches
          the word list and counts letters with tools, and every answer it
          offers shows its measured length.
        </ShowcaseCallout>
      </ShowcasePushback>
    </CaseStudy>
  );
}
