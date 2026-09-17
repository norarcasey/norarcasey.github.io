import React from "react";

import { ExternalLink } from "../components/ExternalLink";
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
import { Recording } from "../components/Recording";
import { StackFacts } from "../components/StackFacts";
import { useRouteMeta } from "../hooks/usePageMeta";

const LIVE_URL = "https://norabene.noratives.com";

/**
 * The first case study (UI-12). Every figure on it was measured in the Nora
 * Bene repo on 18 Sep 2026 and every decision is quoted from its CLAUDE.md,
 * which records each rule that was rewritten and why, on the day it was.
 * Square brackets mark what only Nora can supply: the recording, and her own
 * wording of the calls she made against the plan.
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
              Private. Ask me for a walkthrough, or an invitation to{" "}
              <ExternalLink url={LIVE_URL} label="the app" />.
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

      <ShowcaseGame width="100%">
        <Recording
          label="[45-second recording: turn the network off, capture, reload, turn it on, watch it sync]"
          caption="Muted, loops, no sound. Captions in the frame where a step needs a word."
        />
      </ShowcaseGame>

      <ShowcaseFacts
        facts={[
          {
            value: "138",
            label:
              "commits in 21 days, 23 August to 13 September 2026, from an empty repo to an app used every day.",
          },
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
      />

      <ShowcaseDetails
        title="How it is built"
        lead="Every layer chosen so that a captured thought cannot be lost, and every rule that can be checked by a machine is."
      >
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
          thing that dies with the phone. The rule was rewritten on 28 August to
          what 1Password and iCloud Keychain actually do: the server may hold
          ciphertext, because AES-GCM output and a wrapped key teach it nothing,
          and the 160-bit secret key that unwraps them never reaches it. A
          stolen database is missing 160 random bits. A stolen phone is missing
          the passphrase. [Confirm this was your call against the plan, and say
          the why in your own words.]
        </p>
        <p className="copy">
          The plan said only an explicit, confirmed action deletes, one rule for
          one kind of deleting. By 11 September there were two, and they wanted
          opposite guards. Removing a row is reversible and asks nothing: a
          toast offers Undo, and Removed keeps the row for as long as you like.
          Emptying Removed is irreversible and asks twice, in the app&apos;s own
          words rather than the browser&apos;s. A confirmation in front of a
          reversible action spends the credibility the real one needs. [Same:
          confirm, and reword.]
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
