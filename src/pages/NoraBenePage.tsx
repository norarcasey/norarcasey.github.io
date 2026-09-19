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
import { NoraBeneArchitecture } from "../components/NoraBeneArchitecture";
import { TestLayers } from "../components/TestLayers";
import { CaseStudyMedia } from "../components/CaseStudyMedia";
import { NORA_BENE_COMMITS, NORA_BENE_RELEASES } from "../data/noraBeneHistory";
import { NORA_BENE_TEST_LAYERS } from "../data/noraBeneTests";
import noraBeneBoard from "../assets/screens/nora-bene-board.webp";
import { useRouteMeta } from "../hooks/usePageMeta";

/**
 * What holds a rule, as five kinds rather than seven sentences.
 *
 * Each rule used to carry its own sentence explaining its check, and seven of
 * those is a wall: the reader has to find the pattern themselves, and the
 * pattern is the interesting part. Naming the five kinds once and tagging each
 * rule says the same thing and shows the shape, which is that most of these
 * are refused by a machine rather than watched for by a person.
 *
 * `refuses` splits them: a grep, the schema check and a lint rule all fail
 * before the app runs at all, so the rule cannot be broken. A unit or browser
 * test asserts the behaviour, which is weaker, and the page says so.
 */
const CHECKS = {
  grep: {
    refuses: true,
    what: "a search over the migrations and functions that fails the build",
  },
  schema: {
    refuses: true,
    what: "db:verify, asserting the database itself before a deploy",
  },
  lint: {
    refuses: true,
    what: "a lint rule, so the call never lands in the first place",
  },
  unit: { refuses: false, what: "a test of the pure domain core" },
  e2e: { refuses: false, what: "a browser against a production build" },
} as const;

type Check = keyof typeof CHECKS;

/** The order of the key: what refuses first, what asserts after. */
const CHECK_ORDER = Object.keys(CHECKS) as Check[];

/** The seven, in plain words rather than the repo's. */
const HARD_RULES: { text: string; checks: Check[] }[] = [
  {
    text: "A secret never reaches the server in the clear. The vault seals everything on the phone, labels included, and the key that opens it never leaves your own devices.",
    checks: ["grep"],
  },
  {
    text: "The app never deletes anything on its own. No retention timer, no cleanup pass, no bin that empties itself after thirty days.",
    checks: ["schema"],
  },
  {
    text: "Blur is not security. Discreet mode hides a list from someone glancing over your shoulder, and nothing in the app implies it does more than that.",
    checks: ["e2e"],
  },
  {
    text: "Capture never fails. Losing a thought you have just typed is the worst thing this app could do, so nothing about capture is allowed to wait for the network.",
    checks: ["e2e"],
  },
  {
    text: "Every table checks who is asking, and refuses by default. There is no row anywhere that is readable because somebody forgot a policy.",
    checks: ["schema"],
  },
  {
    text: "The app suggests, it never rewrites. A date or an address it spots is offered beside your words, never instead of them.",
    checks: ["unit"],
  },
  {
    text: "Nothing you write ever leaves as analytics. A crash report carries ids and kinds, never the words you wrote.",
    checks: ["lint", "e2e"],
  },
];

/** A rule is unbreakable when something refuses it before the app runs. */
const cannotBreak = (rule: { checks: Check[] }): boolean =>
  rule.checks.some((check) => CHECKS[check].refuses);

const UNBREAKABLE = HARD_RULES.filter(cannotBreak).length;

/** Small counts read better as words in a sentence than as digits. */
const WORDS = ["no", "one", "two", "three", "four", "five", "six", "seven"];

/** One tag, in the key and beside a rule. Blue is the half that refuses. */
function CheckTag({ check }: { check: Check }): React.ReactElement {
  return (
    <span
      className={`meta rounded px-1.5 text-[12px] leading-5 ${
        CHECKS[check].refuses
          ? "bg-wash-blue text-text"
          : "border border-border"
      }`}
    >
      {check}
    </span>
  );
}

/**
 * The first case study (UI-12). Every figure on it was measured in the Nora
 * Bene repo on 18 Sep 2026 and every decision is taken from its CLAUDE.md,
 * which records each rule that was rewritten and why, on the day it was.
 *
 * The two calls in the pushback band were drafted from that record and
 * confirmed by Nora as hers, so they are written in her voice rather than
 * about the repo, and in plain words rather than the repo's: no cipher
 * names, no bit counts, no dates, all of which read as jargon in a
 * paragraph about a judgement call. The technical names are a row away in
 * `How it is built`, for a reader who wants them, and the dates are in the
 * runway. Nothing here is a placeholder.
 */
export function NoraBenePage(): React.ReactElement {
  useRouteMeta("/nora-bene");

  return (
    <CaseStudy>
      <ShowcaseHeader
        size="hero"
        eyebrow="Case study · 2026 · a PWA, by invitation"
        title="Nora Bene"
        problem="One app in place of three: Google Keep for the thoughts, 1Password for the ones nobody else should see, and a spreadsheet for the lists that never justified one."
        aside={
          <>
            <ShowcaseTile label="Stack" tone="blue">
              Vite · React 19 · TypeScript · TanStack Query · Supabase ·
              Tailwind v4 · Vitest · Playwright
            </ShowcaseTile>
            <ShowcaseTile label="Where it runs" tone="pink">
              A PWA on Vercel, Postgres on Supabase in Frankfurt, and the two
              things that never go there: the outbox, and the key to the vault,
              which live on the phone.
            </ShowcaseTile>
            <ShowcaseTile label="Source">
              Private, and so is the app: it is invitation-only by design.{" "}
              <Link className="inline-link" to="/contact-me">
                Ask me for a walkthrough
              </Link>
              .
            </ShowcaseTile>
          </>
        }
      >
        <p>
          I like to do lists, and specifically I like checking things off. I
          wanted that tracked in one place, with real numbers about what I
          actually finish rather than an impression of how the month went.
        </p>
        <p>
          Two things came with that. Whatever I need to write down has to go
          down in seconds, usually an idea or a task and occasionally something
          sensitive like a password. And some of my lists run for a year or
          more, so they have to be one living thing instead of a spreadsheet in
          Google Drive that I have to dig through to work out which copy I was
          on.
        </p>
      </ShowcaseHeader>

      <ShowcaseGame width="100%" thirdParty={false}>
        {/* A screenshot until there is a recording, and shown as one: no play
            button over something that cannot be played. */}
        <CaseStudyMedia
          image={noraBeneBoard}
          alt="The Nora Bene board: an inbox of three untriaged captures beside coloured lists for today, shopping, a reading list of quotes, a trip, a gratitude list and a catalogue of countries, with finished items collapsed under a rule."
          caption="The board, with a week in it."
        />
      </ShowcaseGame>

      <ShowcaseFacts
        facts={[
          {
            value: <TestLayers layers={NORA_BENE_TEST_LAYERS} />,
            label:
              "The domain core has no React, no Supabase and no browser API, and a lint rule that refuses the import rather than trusting anyone to remember. That is what makes testing it exhaustively cheap, and the browser tier stays small because those tests are slow.",
          },
          {
            value: `${HARD_RULES.length} of ${HARD_RULES.length}`,
            label: `hard rules with a check behind them: ${WORDS[UNBREAKABLE]} cannot be broken at all, because a grep, the schema or a lint rule refuses, and the other ${WORDS[HARD_RULES.length - UNBREAKABLE]} are held by tests that assert the behaviour.`,
          },
        ]}
      >
        <CommitHistory
          commits={NORA_BENE_COMMITS}
          releases={NORA_BENE_RELEASES}
          caption="in 21 days, 23 August to 13 September 2026, from an empty repo to an app used every day. Most of it in the first nine; the rest is what using it turned up."
        />
      </ShowcaseFacts>

      <ShowcaseDetails
        title="How it is built"
        lead="Seven rules the app is not allowed to break, and the line everything else is arranged around."
        wide={
          /* The layers were a list of seven paragraphs, most of which the page
             now says elsewhere. What a list could not say is how they sit
             against each other, which is the whole of the design. It takes the
             full width because it is a drawing, not prose: eight columns left
             it at its own minimum and scrolling sideways. */
          <section className="flex flex-col gap-3">
            <h3 className="h3">What crosses the line</h3>
            <NoraBeneArchitecture />
          </section>
        }
      >
        {/* The page leans on these twice, in a fact tile and in the callout
            below, so they are spelled out rather than alluded to. */}
        <section className="flex flex-col gap-4">
          <h3 className="h3">The seven hard rules</h3>
          <p className="copy max-w-[64ch]">
            Invariants rather than guidelines: breaking one is a bug even if
            every test passes. So none of them rests on remembering. The tags
            say what holds each one, and {WORDS[UNBREAKABLE]} of the seven are
            held by something that refuses before the app runs at all.
          </p>

          {/* The key, once, instead of a sentence per rule explaining the
              same five mechanisms seven times over. Grouped rather than
              merely coloured: which half a tag is in is the point, and a
              reader who cannot tell the two fills apart would otherwise have
              to take the count in the paragraph on trust. */}
          <div className="flex flex-col gap-4 rounded-xl border border-border px-5 py-4">
            {[true, false].map((refuses) => (
              <div key={String(refuses)} className="flex flex-col gap-1.5">
                <p className="meta text-text">
                  {refuses
                    ? "Refuses before the app runs"
                    : "Asserts the behaviour"}
                </p>
                <dl className="flex flex-col gap-1.5">
                  {CHECK_ORDER.filter(
                    (check) => CHECKS[check].refuses === refuses
                  ).map((check) => (
                    <div key={check} className="flex items-baseline gap-2.5">
                      <dt className="w-14 shrink-0">
                        <CheckTag check={check} />
                      </dt>
                      <dd className="copy text-sm leading-5">
                        {CHECKS[check].what}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          <ol className="mt-1 flex list-none flex-col gap-3">
            {HARD_RULES.map((rule, index) => (
              <li
                key={rule.text}
                className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-2"
              >
                <span className="meta pt-0.5 tabular-nums">{index + 1}</span>
                <p className="copy max-w-[64ch]">
                  {rule.text}{" "}
                  <span className="whitespace-nowrap">
                    {rule.checks.map((check) => (
                      <React.Fragment key={check}>
                        {" "}
                        <CheckTag check={check} />
                      </React.Fragment>
                    ))}
                  </span>
                </p>
              </li>
            ))}
          </ol>
        </section>
      </ShowcaseDetails>

      <ShowcasePushback>
        <p>
          The plan was for vault items never to leave your phone at all. That
          sounds safer than it is: it means the vault dies with the phone. I
          changed it to work the way 1Password and iCloud Keychain do. Your
          phone locks a secret before it goes anywhere, and the server only ever
          holds the locked copy, which tells it nothing. The key that unlocks it
          is in two halves and the server has neither: one is your passphrase,
          the other a long random key that only your own devices hold. Steal the
          database and you get nothing readable. Steal the phone and you still
          need the passphrase.
        </p>
        <p className="copy">
          The plan had one rule for deleting: nothing goes without an explicit
          confirmation. It turned out there were two kinds of deleting, and they
          wanted opposite treatment, so I split the rule. Taking something off a
          board is easy to undo, so it asks nothing at all: a message offers
          Undo, and a Removed list keeps it for as long as you like. Emptying
          that list is permanent, so it asks twice, in the app&apos;s own words
          rather than the browser&apos;s. A confirmation in front of something
          harmless only teaches people to click through the one that matters.
        </p>
        <ShowcaseCallout label="Hard rule 4">
          Capture must never fail. Losing a thought you have just typed is the
          worst thing this app could do, so nothing about capture is allowed to
          wait. A new note does not need a list to exist first, and its place in
          the order comes from the clock rather than from whatever is on screen,
          because anything worked out from what is loaded is already wrong
          before the first answer arrives.
        </ShowcaseCallout>
      </ShowcasePushback>
    </CaseStudy>
  );
}
