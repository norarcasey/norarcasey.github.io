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
import { CaseStudyMedia } from "../components/CaseStudyMedia";
import { StackFacts } from "../components/StackFacts";
import { NORA_BENE_COMMITS, NORA_BENE_RELEASES } from "../data/noraBeneHistory";
import noraBeneBoard from "../assets/screens/nora-bene-board.webp";
import { useRouteMeta } from "../hooks/usePageMeta";

/**
 * The seven, in plain words rather than the repo's.
 *
 * `enforced` marks the four a machine checks: a lint rule and a grep for the
 * first, and `db:verify` asserting the schema for the others. The rest are
 * design constraints, which a test cannot hold for you.
 */
const HARD_RULES: { text: string; check: string; invariant?: true }[] = [
  {
    text: "A secret never reaches the server in the clear. The vault seals everything on the phone, labels included, and the key that opens it never leaves your own devices.",
    check:
      "a grep over every migration and function fails the build on any column that could hold one",
    invariant: true,
  },
  {
    text: "The app never deletes anything on its own. No retention timer, no cleanup pass, no bin that empties itself after thirty days.",
    check:
      "the schema check asserts the service role holds DELETE on no table, and the service role is the system",
    invariant: true,
  },
  {
    text: "Blur is not security. Discreet mode hides a list from someone glancing over your shoulder, and nothing in the app implies it does more than that.",
    check:
      "end to end: a hidden note offers no chips, because a chip is legible",
  },
  {
    text: "Capture never fails. Losing a thought you have just typed is the worst thing this app could do, so nothing about capture is allowed to wait for the network.",
    check:
      "end to end: capture survives being offline and reconciles when the network returns, and the app opens offline with an expired session and still captures",
  },
  {
    text: "Every table checks who is asking, and refuses by default. There is no row anywhere that is readable because somebody forgot a policy.",
    check:
      "the schema check asserts row-level security is on and forced everywhere, that every table has policies, and that the anonymous role holds nothing",
    invariant: true,
  },
  {
    text: "The app suggests, it never rewrites. A date or an address it spots is offered beside your words, never instead of them.",
    check:
      "a unit test that the chips never touch the words, under 118 tests of the detectors themselves",
  },
  {
    text: "Nothing you write ever leaves as analytics. A crash report carries ids and kinds, never the words you wrote.",
    check:
      "a lint rule against logging a body, and an end-to-end check that no item text appears in any request the app does not make itself",
    invariant: true,
  },
];

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
        problem="A capture-first replacement for Google Keep that keeps working with no signal, and draws a hard line between what syncs and what never does."
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
          Nothing here is hard because it is a notes app. It is hard because a
          thought typed with no network has to be on the screen after a reload,
          on the server when there is one, and there once rather than twice; and
          because some of what you write down must never reach the server at
          all.
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
            value: "697",
            label:
              "tests: 571 over the domain core, which imports no React, no Supabase and no browser API, and 126 end to end, run against a production build because the offline spec needs the service worker.",
          },
          {
            value: "7 of 7",
            label:
              "hard rules with a check behind them. Four cannot be broken at all, because a grep or the schema refuses; the other three are held by tests that assert the behaviour.",
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
        lead="Seven rules the app is not allowed to break, and the layers that keep them."
      >
        {/* The page leans on these twice, in a fact tile and in the callout
            below, so they are spelled out rather than alluded to. */}
        <section className="mb-10 flex flex-col gap-3">
          <h3 className="h3">The seven hard rules</h3>
          <p className="copy max-w-[64ch]">
            Invariants rather than guidelines: breaking one is a bug even if
            every test passes. So none of them rests on remembering. Four cannot
            be broken at all, because a grep or the schema refuses before
            anything runs; the other three are held by tests that assert the
            behaviour itself.
          </p>
          <ol className="mt-1 flex list-none flex-col gap-3">
            {HARD_RULES.map((rule, index) => (
              <li
                key={rule.text}
                className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-2"
              >
                <span className="meta pt-0.5 tabular-nums">{index + 1}</span>
                <div className="flex max-w-[64ch] flex-col gap-1">
                  <p className="copy">{rule.text}</p>
                  <p className="meta">
                    <span className="text-text">
                      {rule.invariant ? "Cannot be broken" : "Held by a test"}
                    </span>{" "}
                    · {rule.check}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <StackFacts
          title={null}
          facts={[
            {
              label: "Domain core",
              value:
                "packages/core: the types, the schemas, ordering, and the outbox policy, with no React, no Supabase and no browser API. ESLint enforces the boundary rather than trusting anyone to remember it, and 571 tests run against it alone.",
            },
            {
              label: "Capture",
              value:
                "Typing writes to an IndexedDB outbox synchronously and returns: nothing is awaited, nothing can fail, and the box is clear on the same tick. A drain loop replays the queue whenever the network allows, upserting on a client-generated UUIDv7 so a retry makes one row rather than two. What is rendered is always server state with pending writes laid over it, which is why a reload with no network still shows what you captured.",
            },
            {
              label: "Data",
              value:
                "Postgres with row-level security enabled and forced on every table, anon holding nothing, and one migration per change with the RLS in the same file as its table. service_role holds DELETE on no table: the system never hard-deletes, and service_role is the system. Foreign keys are composite on (user_id, id), so a row cannot point at another user's list.",
            },
            {
              label: "Sync",
              value:
                "The client reads a table whole once and then only what changed since its newest row, merged by key. A changed read must not filter deleted rows, because a removal is only ever an update, and that update is how a row leaves the client.",
            },
            {
              label: "The vault",
              value:
                "Everything user-written is sealed on the device, labels included, with a random data key wrapped by a passphrase and a 160-bit secret key together. The server may hold the ciphertext. The secret key never reaches it.",
            },
            {
              label: "Auth",
              value:
                "Passwordless: an emailed code, or a passkey verified by an edge function that then asks the auth service for a one-time token. Nothing in the app signs a session. Signing up is closed; an invitation is the account.",
            },
            {
              label: "Tests and gates",
              value:
                "Vitest over the core, Playwright over a production build, and a db:verify step that asserts the schema's invariants against the running database. GitHub Actions runs all of it and refuses to deploy ahead of the schema.",
            },
          ]}
        />
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
