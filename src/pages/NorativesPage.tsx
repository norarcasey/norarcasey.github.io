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
import {
  NORATIVES_COMMITS,
  NORATIVES_RELEASES,
} from "../data/norativesHistory";
import { NORATIVES_TEST_LAYERS } from "../data/norativesTests";
import { useRouteMeta } from "../hooks/usePageMeta";

/**
 * The migrations, and the thing about them worth a paragraph.
 *
 * Counted from `supabase/migrations` on 19 Sep 2026. The second number is the
 * interesting one: everything up to it went in by being pasted into a SQL
 * editor, which applies the file and records nothing, so the history table
 * the tooling reads was empty while the database was thirty migrations deep.
 */
const MIGRATIONS = 35;
const PASTED = 30;

/**
 * The second case study (UI-12). Every figure on it was measured in the
 * Noratives repo on 19 Sep 2026; the decisions are taken from its README,
 * its docs, and the commit messages, which is where this project keeps the
 * record that Nora Bene keeps in a CLAUDE.md.
 *
 * The two calls in the pushback band are drafted from that record and are
 * BRACKETED FOR NORA to confirm they were hers and to say the why in her own
 * words, exactly as the Nora Bene page's were before she confirmed them. The
 * hero is the empty frame until there is a picture or a recording: this app
 * is not screenshot-able the way Nora Bene was, because what is on the screen
 * is the writing.
 */
export function NorativesPage(): React.ReactElement {
  useRouteMeta("/noratives");

  return (
    <CaseStudy>
      <ShowcaseHeader
        size="hero"
        eyebrow="Case study · 2026 · a writing studio, by invitation"
        title="Noratives"
        problem="One place to write, whether the piece is a journal entry nobody will ever read, a short story for one site, or the post you are reading this on."
        aside={
          <>
            <ShowcaseTile label="Stack" tone="blue">
              Vite · React · TypeScript · TipTap · Supabase · Tailwind v4 ·
              Vitest · Playwright
            </ShowcaseTile>
            <ShowcaseTile label="Where it runs" tone="pink">
              noratives.com on Vercel, with Postgres and six edge functions on
              Supabase. It publishes to two sites, one of which is this one.
            </ShowcaseTile>
            <ShowcaseTile label="Source">
              Private, and so is the app: it is invitation-only, and most of
              what is in it is nobody else&apos;s business.{" "}
              <Link className="inline-link" to="/contact-me">
                Ask me for a walkthrough
              </Link>
              .
            </ShowcaseTile>
          </>
        }
      >
        <p>
          A journal entry, a short story and a blog post are the same act. They
          were three tools: a notes app, a folder of drafts, and a repository
          with a build step. Writing in the last one meant being a developer
          first and a writer second, which is a good way to not write.
        </p>
        <p>
          So the studio is the only place any of it happens, and publishing is a
          button rather than a deploy. The blog on this site is the proof:{" "}
          <Link className="inline-link" to="/blog">
            every post
          </Link>{" "}
          was written in it and put here by pressing that button.
        </p>
      </ShowcaseHeader>

      <ShowcaseGame width="100%" thirdParty={false}>
        <CaseStudyMedia
          label="[A picture of the studio: the editor with a piece open, the meta bar, and the publish dialog saying where it is going]"
          caption="Not screenshotted yet. Unlike a board of lists, everything on this screen is writing, so the shot needs prose that is fine to show."
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
            value: `${PASTED} of ${MIGRATIONS}`,
            label:
              "migrations that went in by being pasted into a SQL editor, which applies the file and records nothing. The history the tooling reads was empty while the database was thirty migrations deep, and the notices each migration raised to report what it had checked were swallowed on the way.",
          },
        ]}
      >
        <CommitHistory
          commits={NORATIVES_COMMITS}
          releases={NORATIVES_RELEASES}
          caption="in six months, 17 March to 14 September 2026, with two of those months empty. The gaps are the point: this is a tool that gets used, and picked back up when using it finds something."
        />
      </ShowcaseFacts>

      <ShowcaseDetails
        title="How it is built"
        lead="A private database with one public window cut into it, and everything arranged so that what goes through the window is a decision rather than a default."
        wide={
          <section className="flex flex-col gap-3">
            <h3 className="h3">What crosses the line</h3>
            <NorativesPublishPath />
          </section>
        }
      >
        <section className="flex flex-col gap-4">
          <h3 className="h3">The schema is deployed by hand, on purpose</h3>
          <p className="copy max-w-[64ch]">
            Everything else ships on a push to main: the checks run, the edge
            functions deploy, then the studio, in that order because the studio
            calls the functions and a new studio meeting an old one is the
            failure worth avoiding. The database is not in that sequence.
            Migrations are run deliberately and the app is pushed afterwards,
            because the app reads columns the migration adds. Committing a
            migration does not apply it.
          </p>
          <p className="copy max-w-[64ch]">
            That rule is what the {PASTED} of {MIGRATIONS} above is about. Going
            through the SQL editor applies a file and records nothing, so the
            migration history was empty and the tooling would have offered to
            replay the whole folder against a database that already had all of
            it. The history was repaired in one call and everything since has
            gone in properly. The headers on the first thirty still say to
            paste, and they stay that way: that is how those actually went in,
            and a file that misdescribes its own history is worse than one
            naming a route nobody uses any more.
          </p>
          <p className="copy max-w-[64ch]">
            The same era left a folder of the checks each migration made,
            rewritten as queries anyone could run. Five have a receipt beside
            them recording what the query returned, against which database and
            when. Ten do not, so they are a check with no record of anyone
            having run it, and knowing which is which is the whole value: a
            notice scrolls past in a terminal and is gone, and a receipt lets
            somebody who was not there tell a check that passed from a check
            that was never run.
          </p>
        </section>
      </ShowcaseDetails>

      <ShowcasePushback>
        <p>
          [Your call, drafted from the record: the plan signed people in with a
          magic link, which is what everything does.] It cannot work here. On
          iOS a link in an email cannot get into an app installed to the home
          screen: it opens in the default browser, that browser&apos;s storage
          is a different box from the installed app&apos;s, and the app stays
          signed out however many times you tap. There was nothing to fix on the
          app&apos;s side. So the email is a code and nothing else, and the code
          is the subject line, which makes signing in read-and-type without
          opening the message at all. [The why, in your words.]
        </p>
        <p className="copy">
          [Your second call, also drafted: the plan rebuilt this site by firing
          an event at its repository with a GitHub token.] That works exactly as
          long as the only writer owns the repository. Extending it to anybody
          else means asking them for a token to their own code, which is not a
          thing to ask. A deploy hook is a secret URL that starts a build when
          something posts to it: no scopes, no account, nothing GitHub-shaped,
          and it is what makes somebody else&apos;s site possible later. [The
          why, in your words.]
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
