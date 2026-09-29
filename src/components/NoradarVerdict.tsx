import React, { useId } from "react";

// Drawn in the commit chart's language, like the Nora Bene and Noratives
// drawings: hairline structure in the border tokens, the accent carrying the
// paths that are the subject, the marker pink kept for the exception, and
// labels at the chart's 12px.
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

const JOBS = [
  { name: "gate", result: "passed" },
  { name: "e2e", result: "passed" },
] as const;

/**
 * The two things Noradar reads, as the one thing prose cannot show about each.
 *
 * The first is the failure it was built around: a run is green because the
 * deploy job was skipped, and a skipped job does not fail a run. Prose can say
 * that; the picture says that one run gives two honest answers, and only one
 * of them is the question that was being asked. The skipped job takes the
 * marker pink, the one colour that means the exception.
 *
 * The second is how an hour of agent time reaches a runway item: through the
 * commit, because the session a commit came out of and the item its trailer
 * names are both facts, where a session's own topic is a guess.
 *
 * Drawn at 760 units with a floor of 660px, so the labels stay a readable size
 * and the figure scrolls inside its own box on a phone rather than shrinking.
 * The `title` and `desc` carry the same content in words for a screen reader.
 */
export function NoradarVerdict(): React.ReactElement {
  const id = useId();
  const arrow = `${id}-arrow`;

  return (
    <figure>
      <div className="overflow-x-auto pb-1">
        <svg
          viewBox="0 0 760 450"
          role="img"
          aria-labelledby={`${id}-title ${id}-desc`}
          className="block h-auto w-full min-w-[660px]"
        >
          <title id={`${id}-title`}>
            One commit with two answers, and where an hour of agent time lands
          </title>
          <desc id={`${id}-desc`}>
            A run for the head of main has three jobs: gate passed, e2e passed,
            and deploy was skipped. GitHub reports the run as a success, because
            a skipped job does not fail a run. Noradar asks which job deployed
            this commit, finds that none did, and says the commit is not out,
            with a notification. Below that, an hour of agent time is read from
            a session in the transcript archive, reaches the commit that session
            made, and lands on the runway item that the commit&apos;s Runway:
            trailer names. A git hook refuses a commit without the trailer.
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

          {/* ── One run ────────────────────────────────────────────────── */}
          <text
            x="24"
            y="28"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-muted)"
          >
            Is it out?
          </text>

          <rect x="24" y="44" width="330" height="164" {...BOX} />
          <text
            x="189"
            y="68"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text)"
          >
            The run for the head of main
          </text>

          {JOBS.map((job, index) => {
            const y = 80 + index * 30;
            return (
              <g key={job.name}>
                <rect
                  x="40"
                  y={y}
                  width="298"
                  height="26"
                  rx="4"
                  fill="var(--wash-blue)"
                />
                <text
                  x="52"
                  y={y + 17}
                  fontSize="12"
                  fontWeight="600"
                  fill="var(--text)"
                >
                  {job.name}
                </text>
                <text
                  x="326"
                  y={y + 17}
                  textAnchor="end"
                  fontSize="12"
                  fill="var(--text-muted)"
                >
                  {job.result}
                </text>
              </g>
            );
          })}

          {/* The exception, in the one colour that means it. */}
          <rect
            x="40"
            y="140"
            width="298"
            height="26"
            rx="4"
            fill="var(--wash-pink)"
            stroke="var(--chart-marker)"
            strokeWidth="1"
          />
          <text
            x="52"
            y="157"
            fontSize="12"
            fontWeight="600"
            fill="var(--chart-marker)"
          >
            deploy
          </text>
          <text
            x="326"
            y="157"
            textAnchor="end"
            fontSize="12"
            fontWeight="600"
            fill="var(--chart-marker)"
          >
            skipped
          </text>
          <text
            x="189"
            y="190"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-muted)"
          >
            run conclusion: success
          </text>

          <path
            d="M354,92 H390 V86 H420"
            {...FLOW}
            markerEnd={`url(#${arrow})`}
          />
          <rect x="424" y="44" width="312" height="76" {...BOX} />
          <text
            x="444"
            y="70"
            fontSize="14"
            fontWeight="600"
            fill="var(--text)"
          >
            GitHub: green
          </text>
          <text x="444" y="92" fontSize="12" fill="var(--text-muted)">
            It answers whether the run passed, and a
          </text>
          <text x="444" y="108" fontSize="12" fill="var(--text-muted)">
            skipped job does not fail a run.
          </text>

          <path
            d="M354,160 H390 V172 H420"
            {...FLOW}
            markerEnd={`url(#${arrow})`}
          />
          <rect x="424" y="132" width="312" height="76" {...BOX} />
          <text
            x="444"
            y="158"
            fontSize="14"
            fontWeight="600"
            fill="var(--text)"
          >
            Noradar: not out
          </text>
          <text x="444" y="180" fontSize="12" fill="var(--text-muted)">
            It asks which job deployed this commit.
          </text>
          <text x="444" y="196" fontSize="12" fill="var(--text-muted)">
            None did, so it says so, with a notification.
          </text>

          {/* ── Where the hour goes ────────────────────────────────────── */}
          <line
            x1="24"
            y1="246"
            x2="736"
            y2="246"
            stroke="var(--border-strong)"
            strokeWidth="1"
            strokeDasharray="5 5"
          />
          <text
            x="24"
            y="284"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-muted)"
          >
            What did it cost?
          </text>

          {[
            {
              x: 24,
              head: "A session",
              lines: ["read from the transcript", "archive, never written to"],
            },
            {
              x: 270,
              head: "A commit",
              lines: ["Runway: UI-12, and a hook", "refuses one without it"],
            },
            {
              x: 516,
              head: "A runway item",
              lines: ["agent time, sessions and", "models, per item"],
            },
          ].map((box) => (
            <g key={box.head}>
              <rect x={box.x} y="300" width="220" height="92" {...BOX} />
              <text
                x={box.x + 110}
                y="328"
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill="var(--text)"
              >
                {box.head}
              </text>
              {box.lines.map((line, index) => (
                <text
                  key={line}
                  x={box.x + 110}
                  y={352 + index * 18}
                  textAnchor="middle"
                  fontSize="12"
                  fill="var(--text-muted)"
                >
                  {line}
                </text>
              ))}
            </g>
          ))}

          <path d="M244,346 H266" {...FLOW} markerEnd={`url(#${arrow})`} />
          <path d="M490,346 H512" {...FLOW} markerEnd={`url(#${arrow})`} />

          <text
            x="380"
            y="430"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-muted)"
          >
            The commit is the join: which session made it is a fact, and so is
            the item it names.
          </text>
        </svg>
      </div>
    </figure>
  );
}
