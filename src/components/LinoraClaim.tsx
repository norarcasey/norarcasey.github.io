import React, { useId } from "react";

// Drawn in the commit chart's language, like the other case-study drawings:
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

interface Box {
  x: number;
  y: number;
  width: number;
  head: string;
  line: string;
}

function Labelled({ box }: { box: Box }): React.ReactElement {
  return (
    <g>
      <rect x={box.x} y={box.y} width={box.width} height="64" {...BOX} />
      <text
        x={box.x + box.width / 2}
        y={box.y + 27}
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
        fill="var(--text)"
      >
        {box.head}
      </text>
      <text
        x={box.x + box.width / 2}
        y={box.y + 47}
        textAnchor="middle"
        fontSize="12"
        fill="var(--text-muted)"
      >
        {box.line}
      </text>
    </g>
  );
}

/**
 * Why the runway files gave way to a database, as the one thing prose cannot
 * show: where two agents meet.
 *
 * With a file, two sessions finishing two different items in one repository
 * each edit the same file, and they meet at merge, after the work is done, as
 * a conflict. That conflict is the exception the drawing is about, so it takes
 * the marker pink. With Linora they meet at the claim, before any work: one
 * transaction, one winner, and the second is told who holds the ticket.
 * Finishing writes a row, so two tickets closed at once have nothing to merge.
 *
 * Drawn at 760 units with a floor of 660px, so the labels stay a readable size
 * and the figure scrolls inside its own box on a phone rather than shrinking.
 * The `title` and `desc` carry the same content in words for a screen reader.
 */
export function LinoraClaim(): React.ReactElement {
  const id = useId();
  const arrow = `${id}-arrow`;

  return (
    <figure>
      <div className="overflow-x-auto pb-1">
        <svg
          viewBox="0 0 760 456"
          role="img"
          aria-labelledby={`${id}-title ${id}-desc`}
          className="block h-auto w-full min-w-[660px]"
        >
          <title id={`${id}-title`}>
            Where two agents meet: at merge with a file, at the claim with
            Linora
          </title>
          <desc id={`${id}-desc`}>
            With a file: session A finishes one item and session B finishes
            another in the same repository. Each edits its row in RUNWAY.md, and
            when the second rebases onto main it stops on a conflict in that
            file, after the work is done. With Linora: sessions A and B both
            claim the same ticket. Each claim is one transaction, so A is
            granted the ticket and a run opens, and B is refused and told that A
            holds it, before any work starts. Two tickets finished at once are
            two rows, so nothing is left to merge.
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

          {/* ── With a file ──────────────────────────────────────────────── */}
          <text
            x="24"
            y="28"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-muted)"
          >
            With a file: two items, one repository
          </text>
          <Labelled
            box={{
              x: 24,
              y: 44,
              width: 220,
              head: "Session A finishes KIN-12",
              line: "edits its row in RUNWAY.md",
            }}
          />
          <Labelled
            box={{
              x: 24,
              y: 124,
              width: 220,
              head: "Session B finishes KIN-13",
              line: "edits its row in RUNWAY.md",
            }}
          />
          <Labelled
            box={{
              x: 300,
              y: 84,
              width: 180,
              head: "Both rebase",
              line: "onto main",
            }}
          />
          <path
            d="M244,76 H270 V104 H296"
            {...FLOW}
            markerEnd={`url(#${arrow})`}
          />
          <path
            d="M244,156 H270 V128 H296"
            {...FLOW}
            markerEnd={`url(#${arrow})`}
          />
          <path d="M480,116 H526" {...FLOW} markerEnd={`url(#${arrow})`} />

          {/* The exception, in the one colour that means it. */}
          <rect
            x="530"
            y="84"
            width="206"
            height="64"
            rx="6"
            fill="var(--wash-pink)"
            stroke="var(--chart-marker)"
            strokeWidth="1"
          />
          <text
            x="633"
            y="111"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--chart-marker)"
          >
            Conflict in RUNWAY.md
          </text>
          <text
            x="633"
            y="131"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-muted)"
          >
            found after the work is done
          </text>

          <line
            x1="24"
            y1="216"
            x2="736"
            y2="216"
            stroke="var(--border-strong)"
            strokeWidth="1"
            strokeDasharray="5 5"
          />

          {/* ── With Linora ──────────────────────────────────────────────── */}
          <text
            x="24"
            y="250"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-muted)"
          >
            With Linora: two agents, one ticket
          </text>
          <Labelled
            box={{
              x: 24,
              y: 266,
              width: 220,
              head: "Session A",
              line: "claims KIN-12",
            }}
          />
          <Labelled
            box={{
              x: 24,
              y: 346,
              width: 220,
              head: "Session B",
              line: "claims KIN-12",
            }}
          />
          <Labelled
            box={{
              x: 300,
              y: 306,
              width: 180,
              head: "Linora",
              line: "one transaction per claim",
            }}
          />
          <Labelled
            box={{
              x: 530,
              y: 266,
              width: 206,
              head: "Granted to A",
              line: "a run opens, held by A",
            }}
          />
          <Labelled
            box={{
              x: 530,
              y: 346,
              width: 206,
              head: "Refused for B",
              line: "told A holds it, before work",
            }}
          />
          <path
            d="M244,298 H270 V326 H296"
            {...FLOW}
            markerEnd={`url(#${arrow})`}
          />
          <path
            d="M244,378 H270 V350 H296"
            {...FLOW}
            markerEnd={`url(#${arrow})`}
          />
          <path
            d="M480,326 H500 V298 H526"
            {...FLOW}
            markerEnd={`url(#${arrow})`}
          />
          <path
            d="M480,350 H500 V378 H526"
            {...FLOW}
            markerEnd={`url(#${arrow})`}
          />

          <text
            x="380"
            y="440"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-muted)"
          >
            Two tickets finished at once are two rows, so nothing is left to
            merge.
          </text>
        </svg>
      </div>
    </figure>
  );
}
