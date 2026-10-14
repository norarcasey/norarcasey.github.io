import React, { useId } from "react";

// Drawn in the commit chart's language, like the drawings before it: hairline
// structure in the border tokens, the accent for the flow, the marker pink kept
// for the exception, and labels at the chart's 12px.
const BOX = {
  fill: "var(--surface-raised)",
  stroke: "var(--border-strong)",
  strokeWidth: 1,
  rx: 6,
};

const STEPS = ["Theme", "Grid", "Fill", "Clues", "Publish"] as const;

const LANES = [
  { name: "Me", note: ["the choices"] },
  { name: "Code", note: ["exact, and mostly", "in the browser"] },
  { name: "Claude", note: ["behind a function", "that holds the key"] },
] as const;

interface Cell {
  head: string;
  lines: string[];
  /** The one cell drawn in the marker pink. */
  never?: true;
}

/**
 * Lane by step. A missing cell is a lane with no part in that step. Read off
 * the CruciNora repo at 29f01de: `src/crossword`, `src/builder`, `api/`.
 */
const CELLS: (Cell | null)[][] = [
  [
    { head: "The theme", lines: ["the idea, and the", "answers I keep"] },
    { head: "A template", lines: ["or blocks I place"] },
    null,
    { head: "Every clue", lines: ["accepted, rewritten", "or locked"] },
    { head: "Where it goes", lines: ["crucinora.com,", "or the NYT"] },
  ],
  [
    {
      head: "Measures",
      lines: ["each answer's length", "and the slots it fits"],
    },
    { head: "Lays out, checks", lines: ["symmetry, length,", "connection"] },
    { head: "The solver", lines: ["every other slot,", "from 119,331 words"] },
    { head: "The clue bank", lines: ["my earlier clues", "offered first"] },
    {
      head: "The NYT rules",
      lines: ["checked, then the", "sheet it asks for"],
    },
  ],
  [
    { head: "Proposes", lines: ["theme answers,", "in conversation"] },
    null,
    {
      head: "No letters",
      lines: ["it never places", "one in the grid"],
      never: true,
    },
    { head: "Suggests", lines: ["three for an entry,", "or a whole batch"] },
    null,
  ],
];

const LABEL_X = 24;
const COL_X = 168;
const COL_W = 136;
const COL_GAP = 8;
const HEAD_Y = 36;
const LANE_Y = 52;
const LANE_H = 84;
const LANE_GAP = 12;

function colX(index: number): number {
  return COL_X + index * (COL_W + COL_GAP);
}

function laneY(index: number): number {
  return LANE_Y + index * (LANE_H + LANE_GAP);
}

/**
 * Who does which part of a puzzle, as the one thing the page's prose cannot
 * show at a glance: the parts I keep, the parts code does exactly, and the one
 * part a model is never given. Filling a grid is a search in which every
 * crossing has to be a word both ways, so it belongs to the solver; Claude
 * writes words and clues, and code counts and checks what it writes.
 *
 * The empty cell in my lane under Fill is the reason the app exists.
 *
 * Drawn at 896 units with a floor of 700px, so the labels stay legible and the
 * figure scrolls inside its own box on a phone. The `title` and `desc` carry
 * the same content in words for a screen reader.
 */
export function CruciNoraSplit(): React.ReactElement {
  const id = useId();
  const width = colX(STEPS.length - 1) + COL_W + 24;
  const height = laneY(LANES.length - 1) + LANE_H + 24;

  return (
    <figure>
      <div className="overflow-x-auto pb-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-labelledby={`${id}-title ${id}-desc`}
          className="block h-auto w-full min-w-[700px]"
        >
          <title id={`${id}-title`}>Who makes which part of a puzzle</title>
          <desc id={`${id}-desc`}>
            Five steps, theme, grid, fill, clues and publish, across three
            lanes: me, code, and Claude. The theme is mine; Claude proposes
            answers in conversation, and code measures each one&apos;s length
            and the slots it fits. The grid is a template or blocks I place, and
            code lays it out and checks symmetry, word length and connection.
            The fill is the solver&apos;s alone: it fills every other slot from
            119,331 words, and Claude never places a letter in the grid. For
            clues, Claude suggests three for an entry or a whole batch, code
            offers my earlier clues first, and I accept, rewrite or lock every
            one. To publish, I choose crucinora.com or the NYT, and for the NYT
            code checks the rules and writes the submission sheet.
          </desc>

          {STEPS.map((step, index) => (
            <text
              key={step}
              x={colX(index) + COL_W / 2}
              y={HEAD_Y}
              textAnchor="middle"
              fontSize="13"
              fontWeight="600"
              fill="var(--text)"
            >
              {`${index + 1}. ${step}`}
            </text>
          ))}

          {LANES.map((lane, laneIndex) => {
            const y = laneY(laneIndex);
            return (
              <g key={lane.name}>
                <text
                  x={LABEL_X}
                  y={y + 30}
                  fontSize="14"
                  fontWeight="600"
                  fill="var(--text)"
                >
                  {lane.name}
                </text>
                {lane.note.map((line, lineIndex) => (
                  <text
                    key={line}
                    x={LABEL_X}
                    y={y + 50 + lineIndex * 16}
                    fontSize="12"
                    fill="var(--text-muted)"
                  >
                    {line}
                  </text>
                ))}

                {CELLS[laneIndex].map((cell, stepIndex) => {
                  const x = colX(stepIndex);
                  if (!cell) {
                    return (
                      <rect
                        key={STEPS[stepIndex]}
                        x={x}
                        y={y}
                        width={COL_W}
                        height={LANE_H}
                        rx={6}
                        fill="none"
                        stroke="var(--border)"
                        strokeWidth={1}
                        strokeDasharray="4 4"
                      />
                    );
                  }
                  const ink = cell.never
                    ? "var(--chart-marker)"
                    : "var(--text)";
                  return (
                    <g key={STEPS[stepIndex]}>
                      {cell.never ? (
                        <rect
                          x={x}
                          y={y}
                          width={COL_W}
                          height={LANE_H}
                          rx={6}
                          fill="var(--wash-pink)"
                          stroke="var(--chart-marker)"
                          strokeWidth={1}
                        />
                      ) : (
                        <rect
                          x={x}
                          y={y}
                          width={COL_W}
                          height={LANE_H}
                          {...BOX}
                        />
                      )}
                      <text
                        x={x + 10}
                        y={y + 24}
                        fontSize="13"
                        fontWeight="600"
                        fill={ink}
                      >
                        {cell.head}
                      </text>
                      {cell.lines.map((line, lineIndex) => (
                        <text
                          key={line}
                          x={x + 10}
                          y={y + 46 + lineIndex * 16}
                          fontSize="12"
                          fill={
                            cell.never
                              ? "var(--chart-marker)"
                              : "var(--text-muted)"
                          }
                        >
                          {line}
                        </text>
                      ))}
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}
