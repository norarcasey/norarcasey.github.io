import React from "react";
import { Link } from "react-router-dom";

import {
  CaseStudy,
  ShowcaseDetails,
  ShowcaseFacts,
  ShowcaseGame,
  ShowcaseHeader,
  ShowcasePushback,
  ShowcaseTile,
} from "../components/ProjectShowcase";
import { CommitHistory } from "../components/CommitHistory";
import { LinoraClaim } from "../components/LinoraClaim";
import { CaseStudyMedia } from "../components/CaseStudyMedia";
import linoraBoard from "../assets/screens/linora-board.webp";
import linoraTicket from "../assets/screens/linora-ticket.webp";
import { LINORA_COMMITS, LINORA_RELEASES } from "../data/linoraHistory";
import { useRouteMeta } from "../hooks/usePageMeta";

/**
 * The most agent sessions that held a ticket at the same moment, read from
 * Linora's own database on 17 Nov 2026: seven on 14 October, four of them on
 * Kinora, two on Dinora and one on Nora Bene. Counted as distinct sessions,
 * not runs, because one session closing eleven tickets in a minute (17 Oct)
 * is not eleven agents. Runs that stayed open over six hours were left out as
 * forgotten holds. The most in one repository at once was five, on Kinora,
 * 19 October.
 */
const MOST_AT_ONCE = "7";

/**
 * Tickets an agent handed back, with its reason in the run summary, that a
 * later agent then finished: 40, from the run table on 17 Nov 2026. 81 runs
 * have been handed back since 2 October, of 839 that were not imported from
 * a runway file.
 */
const PICKED_UP = "40";

/**
 * A case study from UI-12, filed as CASEY-23. Every figure was measured on
 * 17 Nov 2026: in the Linora repository, in Linora's database (read-only),
 * in Kinora's git history, and in the transcript archive.
 *
 * The lead is Nora's, given 17 Nov 2026: Runway.md was the simple solution,
 * and Linora the next step for managing her work, her agents and her backlog.
 * Linora's own CLAUDE.md gives the switch as the file breaking; she gave it
 * as the next step, and the page leads with hers.
 *
 * The pushback is the one she picked from the transcripts. The archive for
 * this repository starts on 18 October, so the first two weeks, which built
 * most of it, have no transcript to read.
 *
 * The screenshots are of the real page with invented rows, since the real
 * board holds every project's tickets, some of them private.
 * scripts/shootLinora.mjs retakes them without asking the daemon anything.
 */
export function LinoraPage(): React.ReactElement {
  useRouteMeta("/linora");

  return (
    <CaseStudy>
      <ShowcaseHeader
        size="hero"
        eyebrow="Case study · 2026 · a tracker for one person and many agents"
        title="Linora"
        problem="One place that holds my work, my agents and my backlog, where every agent says what it did and why."
        aside={
          <>
            <ShowcaseTile label="Stack" tone="blue">
              Node · TypeScript · Fastify · node:sqlite · MCP · React · Vite ·
              Swift · Zod · Vitest · Playwright
            </ShowcaseTile>
            <ShowcaseTile label="Where it runs" tone="pink">
              On my laptop. One SQLite file, served to the browser, a Mac app
              and every agent session. The only thing that leaves the machine is
              an hourly backup, as text, to a private repository.
            </ShowcaseTile>
            <ShowcaseTile label="Source">
              Private. It holds the tickets of every project I work on,
              including private ones.{" "}
              <Link className="inline-link" to="/contact-me">
                Ask me for a walkthrough
              </Link>
              .
            </ShowcaseTile>
          </>
        }
      >
        <p>
          I needed a more robust system for managing my work, my agents and my
          backlog. The first one was a file: a <code>RUNWAY.md</code> in each
          repository, a table of what had shipped, what was next and why, which
          every agent read and edited. It was the simple solution, and Linora is
          the next step.
        </p>
        <p>
          Several agents were working at once by then, and every one that
          finished an item edited that same file: 470 of Kinora&apos;s 1,168
          commits touched it. Linora keeps the tickets in a database on my
          laptop instead, and in October as many as five agents held tickets in
          one repository at the same time. An agent claims a ticket in one step
          that only one agent can win, works it, and closes it with a summary of
          what it built, what it found, and what the plan got wrong.
        </p>
      </ShowcaseHeader>

      <ShowcaseGame width="100%" thirdParty={false}>
        <CaseStudyMedia
          image={linoraBoard}
          alt="Linora in its dark theme, on the tickets of one app, Linora itself. A sidebar lists the review queue with a count of 4, triage, every ticket, projects, insights, labels and admin, then the apps. The list is grouped by status: two in review, one marked Not shipped; two in progress, each held by a named agent session; four to do; three in the backlog; and three done, folded. Each row has a priority, a key, a title, labels and an age."
          caption="An app's tickets, grouped by status. The page is the real one, driven by a script; the rows are invented, because the real board holds private work."
        />
      </ShowcaseGame>

      <ShowcaseFacts
        facts={[
          {
            value: MOST_AT_ONCE,
            label:
              "agent sessions holding tickets at the same moment, on 14 October: four on Kinora, two on Dinora, one on Nora Bene. On 19 October five held tickets in Kinora alone, where every one of them would once have edited the same runway file.",
          },
          {
            value: PICKED_UP,
            label:
              "tickets handed back by one agent and finished by another, which started by reading why the first stopped. A run that ends early still has to say what it found.",
          },
        ]}
      >
        <CommitHistory
          commits={LINORA_COMMITS}
          releases={LINORA_RELEASES}
          caption="in 47 days, 2 October to 17 November 2026. The first two days built most of it; what came after was found by every project's agents using it."
        />
      </ShowcaseFacts>

      <ShowcaseDetails
        title="How it is built"
        lead="A daemon on one laptop that every agent session reaches over MCP, with one write path for agents and for me, and an event log that nothing is ever deleted from."
        wide={
          <section className="flex flex-col gap-3">
            <h3 className="h3">Where two agents meet</h3>
            <LinoraClaim />
          </section>
        }
      >
        <section className="flex flex-col gap-4">
          <h3 className="h3">One claim, one winner</h3>
          <p className="copy max-w-[64ch]">
            A claim is one transaction. It opens a run, assigns the ticket and
            moves it to in progress, and a second claim on the same ticket is
            refused with the holder&apos;s name. A file could not do that: git
            only sees two edits to it when the second one is merged, after the
            work is done.
          </p>
          <h3 className="h3">The summary is the record</h3>
          <p className="copy max-w-[64ch]">
            A run cannot complete without a summary of what was built, what was
            found on the way, and what the plan got wrong. That is the only
            place the reasoning survives. Of the 21,001 reasoning blocks in my
            transcript archive on 17 November, 1,974 kept their text. The
            summaries since 2 October come to 380,090 words.
          </p>
          <figure className="flex flex-col gap-3">
            <img
              src={linoraTicket}
              alt="The end of a Linora ticket: the last line of a comment from Nora saying to show it on the row too, the box for adding a comment, and a Runs section with one run marked Completed and not shipped, by a named agent session on claude-opus-5-5, with a progress note under it. Its summary has three parts: what was built, what was found on the way, and what the plan got wrong."
              loading="lazy"
              decoding="async"
              className="block aspect-video w-full rounded-xl border border-border object-cover object-top"
            />
            <figcaption className="meta">
              A ticket&apos;s run, with its summary. Invented, in the shape
              every real one takes.
            </figcaption>
          </figure>
          <h3 className="h3">Every commit names its ticket</h3>
          <p className="copy max-w-[64ch]">
            Every commit in every repository carries a <code>Runway:</code>{" "}
            trailer with a ticket key, or <code>none</code>, and a git hook
            checks the key against Linora. If Linora is down the hook lets the
            commit through and says it went unchecked, rather than passing it in
            silence.{" "}
            <Link className="inline-link" to="/noradar">
              Noradar
            </Link>{" "}
            reads the trailer to place agent time on the ticket it was for.
          </p>
          <h3 className="h3">It starts the agents too</h3>
          <p className="copy max-w-[64ch]">
            A ticket can start its own agent, which opens as a pane in one
            shared window. A new app starts from a page that asks the questions
            the project scaffold needs. The newest button, Sweep backlog, starts
            an orchestrator that works through an app&apos;s tickets with a team
            of agents, and asks me at the end, all at once, about anything that
            needs my approval to ship.
          </p>
        </section>
      </ShowcaseDetails>

      <ShowcasePushback>
        <p>
          I asked whether my plan for labels matched how trackers do it now. The
          research found that about thirty tickets already marked themselves as
          flaky in their titles, spelled four different ways, and the plan for
          the labels build included a one-time script to clean them up. I asked
          for the cleanup as its own ticket. It became a tool rather than a
          script: it reads the kinds written into titles, proposes labels, and
          changes nothing until I approve the plan. It also found why the
          prefixes kept appearing. No instruction asked for them; agents copied
          them from the titles already there. So the tools every agent uses now
          say that a ticket&apos;s kind is a label, never part of its title, and
          the next day the same tool cleared 31 titles that opened on
          &ldquo;Bug:&rdquo;. None of the 1,859 titles carries one now.
        </p>
      </ShowcasePushback>
    </CaseStudy>
  );
}
