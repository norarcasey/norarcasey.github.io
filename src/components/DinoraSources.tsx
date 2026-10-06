import React, { useId } from "react";

// Drawn in the commit chart's language, like the three drawings before it:
// hairline structure in the border tokens, the accent carrying the paths that
// are the subject, the marker pink kept for the exception, and labels at the
// chart's 12px.
const BOX = {
  fill: "var(--surface-raised)",
  stroke: "var(--border-strong)",
  strokeWidth: 1,
  rx: 6,
};

const FLOW = {
  stroke: "var(--chart-bar)",
  strokeWidth: 2,
  fill: "none",
};

/** Who answers each night, and for what. Read off `api/` and the migrations. */
const SOURCES = [
  { name: "SimpleFIN Bridge", what: "US cards and brokerages" },
  { name: "Plaid", what: "the lenders SimpleFIN misses" },
  { name: "European Central Bank", what: "the euro's rate each day" },
  { name: "RentCast · MarketCheck", what: "the home and the car" },
  { name: "LBMA", what: "gold and silver, by the ounce" },
  { name: "Gemini", what: "a coin's close each day" },
] as const;

const DATABASE = [
  "row-level security, forced",
  "nothing is ever hard-deleted",
  "amounts in whole cents",
  "each conversion keeps its rate",
] as const;

const SCREENS = [
  { x: 24, head: "A browser", lines: ["the one web build"] },
  {
    x: 270,
    head: "The phone",
    lines: ["installed; with no signal it", "shows the last read, dated"],
  },
  {
    x: 516,
    head: "A Mac window",
    lines: ["onto the same build,", "deciding nothing"],
  },
] as const;

/**
 * Where the money's data comes from and where it lives, which is the question
 * Nora started Dinora with: "where does this data live and who are the
 * players". Six sources each answer one thing, a nightly job asks all of them,
 * one database holds the answers, and three ways of opening the app read it.
 *
 * The one thing the picture is for is the arrow that is not there. Every
 * source is linked read-only, so nothing in the app holds a credential that
 * can move money, and that is said in the marker pink, the colour every
 * drawing on this site keeps for the exception.
 *
 * Drawn at 760 units with a floor of 660px, so the labels stay a readable size
 * and the figure scrolls inside its own box on a phone rather than shrinking.
 * The `title` and `desc` carry the same content in words for a screen reader.
 */
export function DinoraSources(): React.ReactElement {
  const id = useId();
  const arrow = `${id}-arrow`;

  return (
    <figure>
      <div className="overflow-x-auto pb-1">
        <svg
          viewBox="0 0 760 560"
          role="img"
          aria-labelledby={`${id}-title ${id}-desc`}
          className="block h-auto w-full min-w-[660px]"
        >
          <title id={`${id}-title`}>
            Who answers each night, where it is kept, and where it is read
          </title>
          <desc id={`${id}-desc`}>
            Six sources: SimpleFIN Bridge for US cards and brokerages, Plaid for
            the lenders SimpleFIN misses, the European Central Bank for the
            euro&apos;s rate, RentCast and MarketCheck for the home and the car,
            the LBMA for gold and silver, and Gemini for a coin&apos;s close. A
            nightly job asks all of them, and asks again two hours later for a
            bank that was slow. The answers go to one Postgres database at
            Supabase, with row-level security forced on every table, nothing
            ever hard-deleted, amounts in whole cents, and every currency
            conversion stored with its rate. A browser, the installed phone app
            and a Mac window all read it through the same web build. Nothing
            flows the other way: every source is linked read-only, so nothing in
            the app can move money.
          </desc>

          <defs>
            <marker
              id={arrow}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--chart-bar)" />
            </marker>
          </defs>

          <text
            x="24"
            y="28"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-muted)"
          >
            Who answers
          </text>

          {SOURCES.map((source, index) => {
            const y = 44 + index * 52;
            return (
              <g key={source.name}>
                <rect x="24" y={y} width="220" height="46" {...BOX} />
                <text
                  x="38"
                  y={y + 19}
                  fontSize="13"
                  fontWeight="600"
                  fill="var(--text)"
                >
                  {source.name}
                </text>
                <text x="38" y={y + 36} fontSize="12" fill="var(--text-muted)">
                  {source.what}
                </text>
                <path d={`M244,${y + 23} H268`} {...FLOW} />
              </g>
            );
          })}

          {/* The six converge on one bus, and one arrow leaves it. */}
          <path d="M268,67 V327" {...FLOW} />
          <path d="M268,197 H292" {...FLOW} markerEnd={`url(#${arrow})`} />

          <rect x="296" y="147" width="170" height="100" {...BOX} />
          <text
            x="381"
            y="177"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text)"
          >
            A nightly job
          </text>
          {[
            "Vercel Cron, and again",
            "two hours later for a",
            "bank that was slow",
          ].map((line, index) => (
            <text
              key={line}
              x="381"
              y={199 + index * 16}
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-muted)"
            >
              {line}
            </text>
          ))}

          <path d="M466,197 H498" {...FLOW} markerEnd={`url(#${arrow})`} />

          <rect x="502" y="132" width="234" height="130" {...BOX} />
          <text
            x="619"
            y="160"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text)"
          >
            Postgres, at Supabase
          </text>
          {DATABASE.map((line, index) => (
            <text
              key={line}
              x="619"
              y={184 + index * 18}
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-muted)"
            >
              {line}
            </text>
          ))}

          {/* One build, opened three ways. */}
          <text
            x="24"
            y="392"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-muted)"
          >
            Where it is read
          </text>
          <path d="M626,262 V368" {...FLOW} />
          <path d="M134,368 H626" {...FLOW} />
          {SCREENS.map((screen) => (
            <path
              key={screen.head}
              d={`M${screen.x + 110},368 V408`}
              {...FLOW}
              markerEnd={`url(#${arrow})`}
            />
          ))}
          {SCREENS.map((screen) => (
            <g key={screen.head}>
              <rect x={screen.x} y="412" width="220" height="80" {...BOX} />
              <text
                x={screen.x + 110}
                y="438"
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill="var(--text)"
              >
                {screen.head}
              </text>
              {screen.lines.map((line, index) => (
                <text
                  key={line}
                  x={screen.x + 110}
                  y={460 + index * 16}
                  textAnchor="middle"
                  fontSize="12"
                  fill="var(--text-muted)"
                >
                  {line}
                </text>
              ))}
            </g>
          ))}

          {/* The arrow that is not there, in the one colour for the exception. */}
          <text
            x="380"
            y="536"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--chart-marker)"
          >
            Nothing flows the other way: every source is read-only, so nothing
            here can move money.
          </text>
        </svg>
      </div>
    </figure>
  );
}
