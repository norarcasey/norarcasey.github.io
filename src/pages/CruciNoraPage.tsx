import React from "react";

import { ExternalLink } from "../components/ExternalLink";
import {
  ProjectShowcase,
  ShowcaseDetails,
  ShowcaseGame,
  ShowcaseHeader,
  ShowcaseSummary,
} from "../components/ProjectShowcase";
import { StackFacts } from "../components/StackFacts";
import { useRouteMeta } from "../hooks/usePageMeta";
import crucinoraScreen from "../assets/screens/crucinora.webp";

const VISIT_URL = "https://crucinora.com";

export function CruciNoraPage(): React.ReactElement {
  useRouteMeta("/crucinora");

  return (
    <ProjectShowcase>
      <ShowcaseHeader title="CruciNora" />

      <ShowcaseSummary>
        <p className="copy">
          CruciNora is an AI-assisted crossword construction app. You design an
          NYT-style grid, enter the long "theme" answers, let a solver auto-fill
          the rest with valid words, then write a clue for every entry with
          Claude's help, accepting the AI's suggestions or overriding them.
          Completed crosswords are hosted at{" "}
          <ExternalLink url={VISIT_URL} label="crucinora.com" />.
        </p>
      </ShowcaseSummary>

      {/* No embeddable component to drop in, so the visual column carries a
          screenshot and the link out to the live app. */}
      <ShowcaseGame width={480}>
        <div className="flex w-full max-w-[560px] flex-col items-center gap-4">
          <img
            src={crucinoraScreen}
            alt="The CruciNora crossword builder"
            decoding="async"
            // Reserves the box before the file lands, so the page doesn't
            // reflow around it.
            className="block aspect-[560/562] w-full rounded-lg"
          />
          <a
            className="btn btn-pink"
            href={VISIT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit CruciNora
          </a>
        </div>
      </ShowcaseGame>

      <ShowcaseDetails>
        {/* The two write-ups read as a pair, so they sit side by side on wide
            screens. Grid rather than flex: equal columns that stay equal, and
            Tailwind's grid-cols-2 is repeat(2, minmax(0, 1fr)), which lets a
            column shrink below its longest word. */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* max-width, not width: the column caps the measure for readability
              on a wide band but still narrows when the grid does. */}
          <div className="flex max-w-[72ch] flex-col gap-2">
            <h2 className="h3">How it is built</h2>
            <p className="copy">
              The crossword engine is plain TypeScript with no React or DOM. The
              grid, the live NYT rule checks, the word list, and the solver all
              live in a framework-free core that's unit-tested in isolation.
              Around it sits a Vite + React app backed by Supabase (magic-link
              auth with a single-admin allowlist), and a Vercel serverless
              function proxies Claude so the API key never reaches the browser.
            </p>
          </div>

          <div className="flex max-w-[72ch] flex-col gap-2">
            <h2 className="h3">Fun challenges</h2>
            <p className="copy">
              The trick is splitting the work by what each tool is actually good
              at. Filling a grid is a constraint-satisfaction problem where
              every crossing must form a valid word, something LLMs do
              unreliably, so it's handled by a backtracking solver
              (most-constrained-variable plus forward checking) over a scored
              word list, which fills a real 15×15 grid in well under a second.
              Writing clues, which AI is genuinely good at, goes to Claude:
              every non-theme entry gets three Monday-difficulty suggestions to
              accept or replace.
            </p>
          </div>
        </div>

        <StackFacts
          title="The stack, layer by layer"
          facts={[
            {
              label: "Domain core",
              value:
                "Plain TypeScript with no React and no DOM: the grid model, the live NYT rule checks (symmetry, word length, connectivity), the scored word list, and the backtracking solver. Unit-tested in isolation, so the rules can change without touching a component.",
            },
            {
              label: "Client",
              value:
                "A Vite and React single-page app that owns editing state and renders the core's output. Grid fill happens locally, so there is no network round trip between pressing fill and seeing a complete puzzle.",
            },
            {
              label: "Auth",
              value:
                "Supabase magic-link sign-in: no passwords are stored or handled by the app, and the session token travels with every request.",
            },
            {
              label: "Data",
              value:
                "Postgres with row-level security policies and a single-admin allowlist, so authorization is enforced in the database. Schema changes ship as numbered SQL migrations.",
            },
            {
              label: "AI",
              value:
                "A Vercel serverless function proxies Claude: it holds the API key server-side, shapes the prompt, and returns clue suggestions. The key never reaches the browser or the bundle.",
            },
            {
              label: "Delivery",
              value:
                "GitHub Actions gates every push on formatting, lint, types, and tests before the deploy runs.",
            },
          ]}
        />
      </ShowcaseDetails>
    </ProjectShowcase>
  );
}
