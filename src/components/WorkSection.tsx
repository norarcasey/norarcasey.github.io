import React from "react";
import { Link } from "react-router-dom";

import { SectionHeading } from "./SectionHeading";
import { GAMES, PRODUCTS, type Project } from "../data/projects";

/**
 * A product, as a card. A row on a phone (a 96px thumbnail beside the text)
 * and a column above it: stacked cards were what made the phone page 5,332px
 * on the canvas's first pass, and the row is what brought it down.
 */
function ProductCard({ project }: { project: Project }): React.ReactElement {
  return (
    <article className="card flex-row items-start gap-4 overflow-hidden p-4 sm:flex-col sm:gap-0 sm:p-0">
      {/* Not a link: the title beside it already goes there, and a second
          link to the same place is one more thing for a screen reader to read
          out and tab past. The canvas draws it the same way. */}
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-wash-blue sm:aspect-[16/10] sm:h-auto sm:w-full sm:rounded-none">
        {project.screenshot ? (
          <img
            src={project.screenshot}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        ) : null}
      </div>
      <div className="flex min-w-0 flex-col gap-1.5 sm:gap-2 sm:p-5">
        <h3 className="h3 text-lg leading-6 sm:text-xl sm:leading-7">
          <Link to={project.path} className="text-text hover:text-pink">
            {project.name}
          </Link>
        </h3>
        <p className="copy text-[15px] leading-[22px] sm:text-base sm:leading-6">
          {project.blurb}
        </p>
        <p className="meta mt-0.5 text-xs leading-[18px] [overflow-wrap:anywhere] sm:text-[13px] sm:leading-5">
          {project.stack}
        </p>
      </div>
    </article>
  );
}

/** A game, as a square thumbnail over its name and the package it ships as. */
function GameTile({ project }: { project: Project }): React.ReactElement {
  return (
    <Link
      to={project.path}
      className="text-text flex flex-col gap-2.5 hover:text-pink"
    >
      <div className="aspect-square overflow-hidden rounded-lg border border-border bg-surface-raised">
        <img
          src={project.screenshot}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-base leading-[22px] font-semibold">
          {project.name}
        </span>
        <span className="meta text-xs leading-4 [overflow-wrap:anywhere]">
          {project.npmPackage}
        </span>
      </div>
    </Link>
  );
}

/**
 * Work: the products first, then the games.
 *
 * The grid is three columns and fills itself from the data: a project cannot
 * be listed here without a page to point at, so each case study UI-12 writes
 * adds a card. Nora Bene and Noratives have arrived; Kinora, Noravia and
 * Noradar are still to come, which is why the last row is short.
 */
export function WorkSection(): React.ReactElement {
  return (
    <section className="flex flex-col gap-8">
      <SectionHeading title="Work">
        Products first. Each one has a write-up of how it is built, what was
        measured, and where I pushed back on the plan.
      </SectionHeading>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {PRODUCTS.map((project) => (
          <ProductCard key={project.path} project={project} />
        ))}
      </div>

      <div className="flex flex-col gap-5 pt-2">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-baseline lg:gap-4">
          <h3 className="h3 whitespace-nowrap">Games, published on npm</h3>
          <p className="meta">
            Each one is installed from the registry and playable on its page, so
            what you play is the published artifact.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 lg:grid-cols-6 lg:gap-6">
          {GAMES.map((project) => (
            <GameTile key={project.path} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
