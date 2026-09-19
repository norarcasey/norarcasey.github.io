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
import norativesEditor from "../assets/screens/noratives-editor.webp";
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
 * The framing is Nora\'s own account, given 19 Sep 2026, and it replaced an
 * invented one. The first draft had the studio designed as one place for
 * three kinds of writing, which is what it looks like finished and is not how
 * it happened: it was a journal, because writing in Google Drive meant naming
 * a file and finding it again, and everything else arrived because using it
 * asked for it. That order is the whole argument of the page, so it leads.
 *
 * The two calls in the pushback band are drafted from that record and are
 * BRACKETED FOR NORA to confirm they were hers and to say the why in her own
 * words, exactly as the Nora Bene page's were before she confirmed them.
 *
 * The hero and the home page's card were taken by driving the real app with
 * every Supabase call answered in the browser, so the dev server, the
 * components and the rendering are real and only the rows are invented. The
 * writing in them is written for the shot rather than copied out of anybody's
 * journal, which is the part a writing studio makes harder than a board of
 * lists. The driver is scripts/shootNoratives.mjs.
 */
export function NorativesPage(): React.ReactElement {
  useRouteMeta("/noratives");

  return (
    <CaseStudy>
      <ShowcaseHeader
        size="hero"
        eyebrow="Case study · 2026 · a writing studio, by invitation"
        title="Noratives"
        problem="A journal that asks nothing of me before I can write in it. No file to name, no date to type, no folder to choose, and nothing to go looking for six weeks later."
        aside={
          <>
            <ShowcaseTile label="Stack" tone="blue">
              Vite · React · TypeScript · TipTap · Supabase · Tailwind v4 ·
              Vitest · Playwright
            </ShowcaseTile>
            <ShowcaseTile label="Where it runs" tone="pink">
              noratives.com on Vercel, with Postgres and six edge functions on
              Supabase. It publishes to two sites of mine, one of which is this
              one, and to somebody else&apos;s.
            </ShowcaseTile>
            <ShowcaseTile label="Source">
              Private, and so is the app: an invitation is the account, and most
              of what is in it is nobody else&apos;s business.{" "}
              <Link className="inline-link" to="/contact-me">
                Ask me for a walkthrough
              </Link>
              .
            </ShowcaseTile>
          </>
        }
      >
        <p>
          I used to write in Google Drive. Every entry meant naming a file,
          dating it and deciding where to put it, and every entry after a gap
          meant first finding where I had put the last one. There was a folder
          structure for a while. None of that is writing, and there was enough
          of it that each session was its own small event rather than a habit.
        </p>
        <p>
          So the first version was a journal and nothing else. Everything since
          came from using it. Writing more made me want somewhere for the days I
          felt like writing but not like journaling, so creative work got its
          own notebook, and a generated prompt for when the page was blank. Some
          of that turned out to be worth publishing, so it went to a creative
          site. Then the technical writing went to{" "}
          <Link className="inline-link" to="/blog">
            this one
          </Link>
          . Then a friend&apos;s birthday was coming up and what they wanted was
          a blog, and the whole thing had to stop being one person&apos;s app.
        </p>
      </ShowcaseHeader>

      <ShowcaseGame width="100%" thirdParty={false}>
        {/* A screenshot until there is a recording, and shown as one: no play
            button over something that cannot be played. */}
        <CaseStudyMedia
          image={norativesEditor}
          alt="The Noratives editor with a technical post open: a Field notes badge and the dateline along the top, then the word count and an amber Unpublished changes marker, the title and its tags, the formatting toolbar, and three paragraphs of prose set in a serif."
          caption="A piece open, and the studio saying what is true of it: which notebook it is in, and that what is live is no longer what is written."
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
          caption="in six months, 17 March to 14 September 2026, with two of those months empty. The gaps are the point: it gets used, and picked back up when using it asks for something. The tall week in August is the one where it stopped being mine alone."
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
          opening the message at all. This one matters more than a login usually
          would: the app exists because the friction around writing was what
          stopped the writing, and a sign-in that does not work on the thing in
          your hand is exactly that friction back again. [The why, in your
          words.]
        </p>
        <p className="copy">
          [Your second call, also drafted: the plan rebuilt this site by firing
          an event at its repository with a GitHub token.] That works exactly as
          long as the only writer owns the repository, and by then I knew they
          would not be. Extending it means asking somebody for a token to their
          own code, which is not a thing to ask a person whose birthday present
          this is. A deploy hook is a secret URL that starts a build when
          something posts to it: no scopes, no account, nothing GitHub-shaped.
          Most of what was built in that fortnight is the same move made
          elsewhere, turning the two sites into rows anyone can own and the
          three notebooks into whatever a writer says they are. [The why, in
          your words.]
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
