import React from "react";

import { SectionHeading } from "./SectionHeading";

/*
 * Two layouts, one set of slots.
 *
 * Every slot below places itself with an inline `gridArea`, so a page can give
 * them in any order and leave any out. `ProjectShowcase` is the grid the game
 * pages use: a title across the top, the summary beside the game from lg, the
 * details band under both. `CaseStudy` is the second layout on the same slots,
 * stacked as full-width bands, plus two slots of its own: the measured facts
 * and the pushback band. The grids themselves are in index.css.
 */

interface LayoutProps {
  children: React.ReactNode;
}

/** The game pages' layout. Owns nothing but the grid. */
export function ProjectShowcase({ children }: LayoutProps): React.ReactElement {
  return (
    <div className="page-wrap">
      <div className="showcase-grid">{children}</div>
    </div>
  );
}

/**
 * The case-study layout: the same slots as bands, in the order the canvas
 * draws them, with `ShowcaseFacts` and `ShowcasePushback` between them.
 */
export function CaseStudy({ children }: LayoutProps): React.ReactElement {
  return (
    <div className="page-wrap">
      <div className="case-study-grid">{children}</div>
    </div>
  );
}

/* ── Header ──────────────────────────────────────────────────────────────── */

interface ShowcaseHeaderProps {
  /** Project name, the page's h1. */
  title: string;
  /**
   * "title" is the page heading at 36px. "hero" is the case study's 48px
   * display size, one of the two sizes above the shared scale.
   */
  size?: "title" | "hero";
  /** The mono line above the title: "Case study · 2026 · private". */
  eyebrow?: string;
  /** The one-sentence problem, at 22px under the title. */
  problem?: string;
  /** A paragraph under the problem. */
  children?: React.ReactNode;
  /** Beside the text from md: the three tiles, as `ShowcaseTile`s. */
  aside?: React.ReactNode;
}

/** The page's h1, spanning the row above both columns. */
export function ShowcaseHeader({
  title,
  size = "title",
  eyebrow,
  problem,
  children,
  aside,
}: ShowcaseHeaderProps): React.ReactElement {
  const heading = (
    <h1
      className={
        size === "hero"
          ? "h1 text-[36px] leading-[42px] md:text-[48px] md:leading-[54px]"
          : "h1"
      }
    >
      {title}
    </h1>
  );

  if (!eyebrow && !problem && !children && !aside) {
    return (
      <header className="showcase-header" style={{ gridArea: "header" }}>
        {heading}
      </header>
    );
  }

  return (
    <header
      className="showcase-header grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end"
      style={{ gridArea: "header" }}
    >
      <div className="flex flex-col gap-4 md:col-span-8">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        {heading}
        {problem ? (
          <p className="lead max-w-[30ch] text-[20px] leading-[30px] md:text-[22px] md:leading-8">
            {problem}
          </p>
        ) : null}
        {/* Stacked with a gap, as ShowcaseSummary does: the base reset zeroes
            every margin, so two paragraphs handed in here would otherwise run
            together with no space between them. */}
        {children ? (
          <div className="copy flex max-w-[62ch] flex-col gap-4">
            {children}
          </div>
        ) : null}
      </div>
      {aside ? (
        <div className="flex flex-col gap-3 md:col-span-4 md:self-start md:pt-11">
          {aside}
        </div>
      ) : null}
    </header>
  );
}

interface ShowcaseTileProps {
  /** The mono label: "Stack", "Where it runs", "Source". */
  label: string;
  /** Blue and pink are the washes; plain is a hairline on the ground. */
  tone?: "blue" | "pink" | "plain";
  children: React.ReactNode;
}

const TILE_TONES = {
  blue: "bg-wash-blue",
  pink: "bg-wash-pink",
  plain: "border border-border",
} as const;

/** One of the tiles beside a case study's header. */
export function ShowcaseTile({
  label,
  tone = "plain",
  children,
}: ShowcaseTileProps): React.ReactElement {
  return (
    <div className={`flex flex-col gap-1 rounded-xl p-4 ${TILE_TONES[tone]}`}>
      <span className="meta text-text">{label}</span>
      <span className="text-text text-[15px] leading-[22px]">{children}</span>
    </div>
  );
}

/* ── Summary and game ────────────────────────────────────────────────────── */

interface ShowcaseSummaryProps {
  /** The descriptive copy. Give it a list of blocks; it stacks them. */
  children: React.ReactNode;
}

/**
 * The left column. Kept narrow so it reads as a column beside the game rather
 * than as a full-width paragraph.
 */
export function ShowcaseSummary({
  children,
}: ShowcaseSummaryProps): React.ReactElement {
  return (
    <section
      className="showcase-summary mx-auto flex w-full max-w-[640px] flex-col gap-4 lg:mx-0 lg:max-w-none"
      style={{ gridArea: "summary" }}
    >
      {children}
    </section>
  );
}

interface ShowcaseGameProps {
  /**
   * Width of the game column from lg. A number is a fixed column (the default
   * 560 fits the games that are width:100% capped at 560px); "fit-content"
   * suits a game whose width varies, like Mine Sweeper's board; "100%" is
   * what a case study passes so the recording fills its band.
   */
  width?: number | string;
  /** Hide the game below md (some games need the room). */
  hideOnMobile?: boolean;
  /**
   * Whether the contents are a published component that assumes a light host.
   * True by default, which is the safe way round: a new page that embeds a
   * package and forgets this still reads in dark, and our own markup opts out
   * and says so. See the note on `.showcase-game` in index.css.
   */
  thirdParty?: boolean;
  /** The embedded game, a screenshot, or a `CaseStudyMedia`. */
  children: React.ReactNode;
}

/** The right column, or the recording band. */
export function ShowcaseGame({
  width = 560,
  hideOnMobile = false,
  thirdParty = true,
  children,
}: ShowcaseGameProps): React.ReactElement {
  const gameWidth = typeof width === "number" ? `${width}px` : width;
  return (
    <div
      // Names the third-party boundary: everything inside comes from the
      // published game package, so the a11y sweep scopes itself around it.
      className={`showcase-game justify-center ${thirdParty ? "showcase-game--embedded" : ""} ${hideOnMobile ? "hidden md:flex" : "flex"}`}
      style={
        {
          gridArea: "game",
          "--game-width": gameWidth,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

/* ── Details ─────────────────────────────────────────────────────────────── */

interface ShowcaseDetailsProps {
  /**
   * With a title, the slot is a band: the section mark and heading in the
   * left third, the content beside it. Without one it is the plain full-width
   * band the game pages use, whose content carries its own heading.
   */
  title?: string;
  /** The line under the band's heading. */
  lead?: string;
  children: React.ReactNode;
  /**
   * Content that runs the band's whole width, under the heading and the
   * children both. For the thing that is too wide for the right-hand eight
   * columns: a diagram, a chart, a wide table.
   */
  wide?: React.ReactNode;
}

/** The full-width band below both columns, for the engineering write-up. */
export function ShowcaseDetails({
  title,
  lead,
  children,
  wide,
}: ShowcaseDetailsProps): React.ReactElement {
  if (!title) {
    return (
      <section className="showcase-details" style={{ gridArea: "details" }}>
        {children}
        {wide}
      </section>
    );
  }
  return (
    <ShowcaseBand
      className="showcase-details"
      area="details"
      title={title}
      lead={lead}
      wide={wide}
    >
      {children}
    </ShowcaseBand>
  );
}

/* ── The case study's own slots ──────────────────────────────────────────── */

export interface ShowcaseFact {
  /**
   * The number, as it should read: "230", "1.2s". A node instead of a string
   * is rendered as given, which is how a small chart becomes one of the
   * boxes rather than a band of its own.
   */
  value: React.ReactNode;
  /** What it counts, and against what: "commits since June 2026". */
  label: string;
}

interface ShowcaseFactsProps {
  /** Up to three. Two honest figures beat three. */
  facts: ShowcaseFact[];
  /**
   * A chart that stands in for a tile, above the row, for a number whose
   * shape says more than the number: a commit history, say.
   */
  children?: React.ReactNode;
}

const FACT_COLUMNS = ["", "sm:grid-cols-1", "sm:grid-cols-2", "sm:grid-cols-3"];

/** The measured facts under the recording: a chart, if any, then the tiles. */
export function ShowcaseFacts({
  facts,
  children,
}: ShowcaseFactsProps): React.ReactElement {
  const shown = facts.slice(0, 3);
  return (
    <section
      className="showcase-facts flex flex-col gap-6"
      style={{ gridArea: "facts" }}
      aria-label="Measured"
    >
      {children ? (
        <div className="rounded-xl border border-border px-6 py-5">
          {children}
        </div>
      ) : null}
      <div
        className={`grid grid-cols-1 gap-4 sm:gap-6 ${FACT_COLUMNS[shown.length]}`}
      >
        {shown.map((fact) => (
          <div
            key={fact.label}
            // A number and its line belong close together; a chart needs room
            // between itself and the sentence underneath it.
            className={`flex flex-col rounded-xl border border-border px-6 py-5 ${
              typeof fact.value === "string" ? "gap-1" : "gap-4"
            }`}
          >
            {/* Proportional figures: tabular ones make a big number look loose. */}
            {typeof fact.value === "string" ? (
              <span className="text-text text-right text-4xl leading-10 font-bold">
                {fact.value}
              </span>
            ) : (
              fact.value
            )}
            <span className="copy">{fact.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/** The subtitle the pushback band carries unless a page says otherwise. */
export const PUSHBACK_LEAD =
  "AI wrote most of this code. These are the calls I made against its plan, and why.";

interface ShowcasePushbackProps {
  lead?: string;
  /** The paragraphs, and a `ShowcaseCallout` if there is one. */
  children: React.ReactNode;
}

/** The band that carries the calls made against the plan. */
export function ShowcasePushback({
  lead = PUSHBACK_LEAD,
  children,
}: ShowcasePushbackProps): React.ReactElement {
  return (
    <ShowcaseBand
      className="showcase-pushback"
      area="pushback"
      title="Where I pushed back"
      lead={lead}
    >
      <div className="flex max-w-[64ch] flex-col gap-4 [&>p:first-child]:text-text [&>p:first-child]:text-lg [&>p:first-child]:leading-7">
        {children}
      </div>
    </ShowcaseBand>
  );
}

interface ShowcaseCalloutProps {
  /** The mono label: "Scale lesson". */
  label: string;
  children: React.ReactNode;
}

/** A wash callout inside the pushback band. */
export function ShowcaseCallout({
  label,
  children,
}: ShowcaseCalloutProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl bg-wash-pink px-6 py-5">
      <span className="meta text-text">{label}</span>
      <div className="copy text-text">{children}</div>
    </div>
  );
}

/* ── The band ────────────────────────────────────────────────────────────── */

interface ShowcaseBandProps {
  className: string;
  area: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  wide?: React.ReactNode;
}

/**
 * A section mark and heading in the left third, the content in the rest.
 *
 * `wide` is a second row under both, spanning all twelve columns. Eight
 * columns is a good measure for prose and a poor one for a figure, which is
 * sized by its own content rather than by a line length: a drawing that needs
 * 660px to stay legible spends the difference on a sideways scrollbar.
 */
function ShowcaseBand({
  className,
  area,
  title,
  lead,
  children,
  wide,
}: ShowcaseBandProps): React.ReactElement {
  return (
    <section
      className={`${className} grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8`}
      style={{ gridArea: area }}
    >
      <div className="md:col-span-4">
        <SectionHeading title={title}>{lead}</SectionHeading>
      </div>
      <div className="md:col-span-8">{children}</div>
      {wide ? <div className="md:col-span-12">{wide}</div> : null}
    </section>
  );
}
