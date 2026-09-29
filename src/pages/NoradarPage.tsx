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
import { NoradarVerdict } from "../components/NoradarVerdict";
import { CaseStudyMedia } from "../components/CaseStudyMedia";
import noradarRadar from "../assets/screens/noradar-radar.webp";
import { NORADAR_COMMITS, NORADAR_RELEASES } from "../data/noradarHistory";
import { useRouteMeta } from "../hooks/usePageMeta";

/**
 * Runs that went green without deploying, from the `alerts` table in
 * Noradar's own database on 29 Sep 2026: three on Noratives, two on Nora Bene,
 * one on Dinora, the first on 14 September. Each one read as shipped on GitHub.
 */
const SILENT_GREENS = "6";

/**
 * Fable 5.1 against Opus 5.5, per runway item, measured on 29 Sep 2026 from
 * Noradar's database: agent time placed on each item through its Runway:
 * trailer, counting an item for a model when 80% or more of its time came
 * from sessions on that model. Only Kinora has enough of both to compare on
 * one project: a small item's median was 11.8 minutes on each (16 items on
 * Fable, 30 on Opus 5.5), and medium and large were within a few minutes on
 * smaller samples. Across projects the two cannot be compared, because Fable's
 * items are mostly Kinora and Nora Bene and Opus 5.5's mostly Dinora.
 *
 * An hour costs about the same on either at list rates ($109.63 and $112.54),
 * so the cost per item is about the same too. Fable spends more on output and
 * Opus far more on re-reading its context, at twice Fable's cache-read rate.
 *
 * Kinora's Fable items came before its Opus 5.5 ones, over weeks when the
 * workflow itself was getting faster, so if anything this favours Opus. It
 * says nothing about whether the work was better, which Noradar does not
 * measure.
 */
const FABLE_AGAINST_OPUS = "Same";

/**
 * The third case study (UI-12). Every figure was measured on 29 Sep 2026, in
 * the Noradar repo or in the daemon's own database, which reads this site's
 * runway as one of the projects it watches.
 *
 * The origin is Nora's own account, given 29 Sep 2026: the meter post ended
 * on the measurement she did not have, and deploys meant a trip to GitHub per
 * app. The pushback band comes from the transcript archive, read against the
 * log. The Swift story is not a refusal: the plan said it could not be done,
 * and she named the way it could. The runway had recorded it as her refusing
 * a Swift app, and the transcripts show it the other way round.
 *
 * The hero is the real dashboard, not stubbed: it holds project names, deploy
 * states and agent hours, nobody's private writing. scripts/shootNoradar.mjs
 * retakes it.
 */
export function NoradarPage(): React.ReactElement {
  useRouteMeta("/noradar");

  return (
    <CaseStudy>
      <ShowcaseHeader
        size="hero"
        eyebrow="Case study · 2026 · a daemon, a dashboard and a menu bar"
        title="Noradar"
        problem="One place to see whether what I pushed is actually live, and what the work cost in agent time."
        aside={
          <>
            <ShowcaseTile label="Stack" tone="blue">
              Node · TypeScript · Fastify · node:sqlite · React · Vite · Swift ·
              Vitest
            </ShowcaseTile>
            <ShowcaseTile label="Where it runs" tone="pink">
              On my laptop and nowhere else. A launchd daemon polls GitHub every
              minute and indexes the transcript archive. Nothing is hosted,
              uploaded or signed in to.
            </ShowcaseTile>
            <ShowcaseTile label="Source">
              Private. It reads my repositories and my agent transcripts, so it
              is a tool for one machine.{" "}
              <Link className="inline-link" to="/contact-me">
                Ask me for a walkthrough
              </Link>
              .
            </ShowcaseTile>
          </>
        }
      >
        <p>
          When I started hitting my limits in Claude Code, I wrote{" "}
          <Link className="inline-link" to="/blog/the-meter-showed-up">
            The meter showed up
          </Link>
          . It ends on what I did not have: a measurement. I could not say
          whether Fable was worth it for me, because I had a bill and a feeling.
          Noradar started the next day, to count sessions, agent time and models
          against the runway items they were for.
        </p>
        <p>
          The other half was deploys. Checking one of the nine apps I care about
          meant going to GitHub, finding the repository in a list GitHub
          reorders by how recently it was pushed to, and reading its Actions.
          This was before I worked in worktrees, so I needed to know a thing was
          delivered before I could start the next ticket, and I wanted my
          machine to tell me. Worktrees took most of that away. The one place to
          look stayed: what is live, what broke, which models, and where each
          project stands.
        </p>
      </ShowcaseHeader>

      <ShowcaseGame width="100%" thirdParty={false}>
        <CaseStudyMedia
          image={noradarRadar}
          alt="The Noradar dashboard in its dark theme, on the Radar tab. Six project cards in two rows: Noradar, reading No deploy step; noracasey.com, building and one commit behind live; Bechara Club, reading No CI here, with a note in amber that it has no runway so its 5 hours 38 minutes of agent time count towards nothing; skills, No CI here; and CruciNora and Dinora, both Live. Each card lists sessions, agent time and runway items."
          caption="The Radar tab, as it stood on 29 September. A project with no deploy step or no CI says so, and does not read as fine."
        />
      </ShowcaseGame>

      <ShowcaseFacts
        facts={[
          {
            value: SILENT_GREENS,
            label:
              "runs that went green without deploying, caught since 14 September: three on Noratives, two on Nora Bene, one on Dinora. GitHub showed each one as a success.",
          },
          {
            value: FABLE_AGAINST_OPUS,
            label:
              "time and cost per runway item on Fable 5.1 as on Opus 5.5, measured on Kinora, the one project with enough of both: a small item took 11.8 minutes of agent time on each. Fable's price per token is twice Opus's, and the work did not cost twice as much. Whether it came out better is not something this measures.",
          },
        ]}
      >
        <CommitHistory
          commits={NORADAR_COMMITS}
          releases={NORADAR_RELEASES}
          caption="in seventeen days, 13 to 29 September 2026. The first two days built it; most of what came after was found by using it."
        />
      </ShowcaseFacts>

      <ShowcaseDetails
        title="How it is built"
        lead="A daemon on one laptop that reads three things and writes to none of them: GitHub Actions, each project's runway, and the transcript archive."
        wide={
          <section className="flex flex-col gap-3">
            <h3 className="h3">One commit, two answers</h3>
            <NoradarVerdict />
          </section>
        }
      >
        <section className="flex flex-col gap-4">
          <h3 className="h3">Green is not out</h3>
          <p className="copy max-w-[64ch]">
            A run can be green because its deploy job was skipped. Noradar
            decides per commit, across every run for that commit, whether any
            job deployed it, and it asks GitHub which job that was. A project
            with no deploy step, or no CI at all, gets a state of its own. When
            Noradar cannot tell, it says it has no reading rather than anything
            reassuring.
          </p>
          <p className="copy max-w-[64ch]">
            Polling ten repositories a minute fits GitHub&apos;s hourly budget
            because nearly every request is conditional: since the last restart,
            7,836 of 7,872 came back unchanged and cost nothing.
          </p>
          <h3 className="h3">How agent time gets counted per ticket</h3>
          <p className="copy max-w-[64ch]">
            A commit in these projects carries a <code>Runway:</code> trailer
            naming the item it belongs to, or <code>none</code>, and a git hook
            refuses one without it. Noradar joins each session in the transcript
            archive to the commits it made, and each commit to its item. 130
            hours of agent time have been placed that way. Before the trailer,
            it guessed from commit subjects and marked every guess as one.
          </p>
          <h3 className="h3">What came out of it</h3>
          <p className="copy max-w-[64ch]">
            The Mac window and its notifications became a layer in the scaffold
            I start every new project from. Dinora, a finance app that replaced
            Monarch for me, was the first project cut from it, on 24 September,
            and Noradar was reading its runway the same day. It never writes to
            a project, so the scaffold only asks it whether it has found the new
            one.
          </p>
        </section>
      </ShowcaseDetails>

      <ShowcasePushback>
        <p>
          I wanted each notification to say it came from Noradar and to open the
          GitHub run it was about. The plan said neither could be done: a
          banner&apos;s name and icon need a signed app, signing was a separate
          project, and the item went back on the shelf. I suggested a stay-open
          app, which did not work either, and then asked for a small Mac app
          whose window loads the dashboard the daemon already serves. That one
          worked. A real app can ask macOS for permission, so the banners carry
          Noradar&apos;s name, and each one opens its own run. It was 176 lines
          of Swift. A week later it put the verdict in the menu bar, so a failed
          run is a red mark on an N I can see without opening anything.
        </p>
        <p className="copy">
          The first version raised an alert when a project went a while without
          shipping. Several of mine get built and then left alone: novellanora
          is a blog reader, and a new post reaches it without a code change, so
          a quiet repository is not a stalled one. The alert came out. It had
          fired twice, and neither was news. How far a project is behind live
          stays on its card, where it is a fact rather than an alarm.
        </p>
        <ShowcaseCallout label="Checking the guesses">
          Before the trailer, every hour was matched to an item by guessing from
          commit subjects, and the plan was to live with that. I asked whether
          the runway&apos;s own shipped dates could check the guesses, and
          whether commit bodies could be matched against the items. The dates
          agreed with every guess they could check. The bodies did worse than
          guessing, and were dropped.
        </ShowcaseCallout>
      </ShowcasePushback>
    </CaseStudy>
  );
}
