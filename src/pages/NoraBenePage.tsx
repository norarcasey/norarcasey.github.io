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
const HARD_RULES: { text: string; enforced?: true }[] = [
  {
    text: "A secret never reaches the server in the clear. The vault seals everything on the phone, labels included, and the key that opens it never leaves your own devices.",
    enforced: true,
  },
  {
    text: "The app never deletes anything on its own. No retention timer, no cleanup pass, no bin that empties itself after thirty days.",
    enforced: true,
  },
  {
    text: "Blur is not security. Discreet mode hides a list from someone glancing over your shoulder, and nothing in the app implies it does more than that.",
  },
  {
    text: "Capture never fails. Losing a thought you have just typed is the worst thing this app could do, so nothing about capture is allowed to wait for the network.",
  },
  {
    text: "Every table checks who is asking, and refuses by default. There is no row anywhere that is readable because somebody forgot a policy.",
    enforced: true,
  },
  {
    text: "The app suggests, it never rewrites. A date or an address it spots is offered beside your words, never instead of them.",
  },
  {
    text: "Nothing you write ever leaves as analytics. A crash report carries ids and kinds, never the words you wrote.",
    enforced: true,
  },
];

/**
 * The first case study (UI-12). Every figure on it was measured in the Nora
 * Bene repo on 18 Sep 2026 and every decision is taken from its CLAUDE.md,
 * which records each rule that was rewritten and why, on the day it was.
 *
 * The two calls in the pushback band were drafted from that record and
 * confirmed by Nora on 19 Sep as hers, so they are written in her voice
 * rather than about the repo. Nothing on this page is a placeholder.
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
            value: "4 of 7",
            label:
              "hard rules enforced by a check rather than by remembering: no secret column, no system delete, RLS forced on every table, no item text in telemetry.",
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
            every test passes. Four are enforced by a check rather than by
            remembering, which is the difference between a rule and a hope.
          </p>
          <ol className="mt-1 flex list-none flex-col gap-3">
            {HARD_RULES.map((rule, index) => (
              <li
                key={rule.text}
                className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-2"
              >
                <span className="meta pt-0.5 tabular-nums">{index + 1}</span>
                <p className="copy max-w-[64ch]">
                  {rule.text}
                  {rule.enforced ? (
                    <span className="meta"> · enforced by a check</span>
                  ) : null}
                </p>
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
          The plan had the vault never leaving the phone at all, which made it a
          thing that dies with the phone. I rewrote the rule on 28 August to do
          what 1Password and iCloud Keychain do: the server may hold ciphertext,
          because AES-GCM output and a wrapped key teach it nothing, and the
          160-bit secret key that unwraps them never reaches it. A stolen
          database is missing 160 random bits. A stolen phone is missing the
          passphrase.
        </p>
        <p className="copy">
          The plan said only an explicit, confirmed action deletes: one rule for
          one kind of deleting. By 11 September there were two kinds and they
          wanted opposite guards, so I split it. Removing a row is reversible
          and asks nothing: a toast offers Undo, and Removed keeps the row for
          as long as you like. Emptying Removed is irreversible and asks twice,
          in the app&apos;s own words rather than the browser&apos;s. A
          confirmation in front of a reversible action spends the credibility
          the real one needs.
        </p>
        <ShowcaseCallout label="Hard rule 4">
          Capture must never fail loudly. Losing a captured thought is the worst
          possible bug in this app, so the inbox is a nullable column rather
          than a list that has to exist first, and a new row&apos;s position is
          the clock rather than a neighbour&apos;s, because anything derived
          from what is loaded is wrong before the first fetch returns, and
          capture is not allowed to wait for one.
        </ShowcaseCallout>
      </ShowcasePushback>
    </CaseStudy>
  );
}
