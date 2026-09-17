import React from "react";

import {
  CaseStudy,
  ShowcaseCallout,
  ShowcaseDetails,
  ShowcaseFacts,
  ShowcaseGame,
  ShowcaseHeader,
  ShowcasePushback,
  ShowcaseSummary,
  ShowcaseTile,
} from "./ProjectShowcase";
import { Recording } from "./Recording";
import { StackFacts } from "./StackFacts";

/**
 * The case-study layout, filled with the UI-14 canvas's Kinora artboard.
 *
 * Not a page. No case study exists until UI-12 writes one, and this is how the
 * layout is checked before then: the tests and the accessibility scan render
 * it, so the shape is known to work and to scan clean before a real page is
 * built on it. Square brackets mark what only Nora can fill, exactly as the
 * canvas marks them. Nothing bracketed is invented, and nothing here is
 * served.
 */
export function CaseStudyFixture({
  recording,
}: {
  /** Pass sources to render the player rather than the poster frame. */
  recording?: React.ComponentProps<typeof Recording>["sources"];
}): React.ReactElement {
  return (
    <CaseStudy>
      <ShowcaseHeader
        size="hero"
        eyebrow="Case study · 2026 · private, single user"
        title="Kinora"
        problem="A personal streaming platform, built as though it had 100,000 users and operated as though it has exactly one."
        aside={
          <>
            <ShowcaseTile label="Stack" tone="blue">
              Fastify · Postgres · BullMQ · ffmpeg · HLS · Caddy · React
            </ShowcaseTile>
            <ShowcaseTile label="Where it runs" tone="pink">
              The API on Fly.io. Encoding on the machine the media already lives
              on, not on Fly: a call made against the plan, below.
            </ShowcaseTile>
            <ShowcaseTile label="Source">
              Private. Ask me for a walkthrough.
            </ShowcaseTile>
          </>
        }
      >
        <p>
          The gap between those two sentences is the entire point. Nothing here
          is hard because it is a media player. It is hard because streaming is
          a distributed systems problem wearing a media player costume.
        </p>
      </ShowcaseHeader>

      <ShowcaseSummary>
        <p className="copy">
          [Not drawn on the canvas: the summary slot is empty on a case study,
          and this is here to show the layout tolerates it.]
        </p>
      </ShowcaseSummary>

      <ShowcaseGame width="100%">
        <Recording
          label="[45-second recording: ingest a file, watch the renditions land, play it back]"
          sources={recording}
          caption="Muted, loops, no sound. Captions in the frame where a step needs a word."
        />
      </ShowcaseGame>

      <ShowcaseFacts
        facts={[
          {
            value: "230",
            label:
              "commits since June 2026, in two Claude sessions scoped by directory: one owns the API and packages, one owns the web app.",
          },
          {
            value: "[n]",
            label:
              "[a measured number: renditions per title, or p95 time from ingest to playable, against the machine and date it was measured]",
          },
          {
            value: "[n]",
            label:
              "[a second measured number, or drop this tile: two honest figures beat three]",
          },
        ]}
      />

      <ShowcaseDetails
        title="How it is built"
        lead="Every layer chosen as if this were a real multi-tenant product, with the tradeoff written down where the simple version lost."
      >
        <StackFacts
          title={null}
          facts={[
            {
              label: "Runtime",
              value:
                "Node 22, TypeScript strict, noUncheckedIndexedAccess, no any.",
            },
            {
              label: "Pipeline",
              value:
                "BullMQ on Redis: ingest, probe, enrich, transcode, package. Every job idempotent, every job with a dead-letter queue.",
            },
          ]}
        />
      </ShowcaseDetails>

      <ShowcasePushback>
        <p>
          The plan put the transcode worker on Fly.io beside the API: one image,
          two process groups. I moved encoding off Fly and onto the machine the
          media already lives on. [Draft of the why, in your words.]
        </p>
        <p className="copy">
          [One more, if there is one worth telling: the option the AI offered,
          the option you chose instead, and what that choice was protecting.]
        </p>
        <ShowcaseCallout label="Scale lesson">
          Every phase carries the thing you would do differently at 100,000
          users and why it is done now anyway. Never write "add tenancy later".
        </ShowcaseCallout>
      </ShowcasePushback>
    </CaseStudy>
  );
}
