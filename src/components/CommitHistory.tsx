import React, { useId, useMemo, useState } from "react";

export interface CommitDay {
  /** "YYYY-MM-DD" */
  date: string;
  commits: number;
}

export interface Release {
  /** "YYYY-MM-DD" */
  date: string;
  /** What became usable that day, in a sentence. */
  label: string;
}

interface CommitHistoryProps {
  /** Days with commits; days without are drawn as gaps. */
  commits: CommitDay[];
  /** The release points, drawn as numbered markers on a rail under the axis. */
  releases: Release[];
  /** One line under the total: "in 21 days, from an empty repo". */
  caption: string;
}

// Plot geometry, in SVG units. The width is the viewBox's; the SVG scales to
// its container, so these are proportions rather than pixels.
const WIDTH = 1000;
const PLOT_HEIGHT = 200;
const AXIS_BAND = 28;
const RAIL_BAND = 44;
const HEIGHT = PLOT_HEIGHT + AXIS_BAND + RAIL_BAND;
const PAD_LEFT = 36;
const PAD_RIGHT = 12;
const BAR_MAX = 24;
const DAY_MS = 86_400_000;

function parse(date: string): number {
  return Date.parse(`${date}T00:00:00Z`);
}

function shortDate(date: string): string {
  return new Date(parse(date)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

function longDate(date: string): string {
  return new Date(parse(date)).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

/** A clean tick step for the y axis: 5, 10, 20, 50... */
function tickStep(max: number): number {
  const raw = max / 3;
  const pow = 10 ** Math.floor(Math.log10(raw));
  const unit = raw / pow;
  const step = unit >= 5 ? 5 : unit >= 2 ? 2 : 1;
  return step * pow;
}

/**
 * Commits per day, with the release points on a rail beneath.
 *
 * One series, so one hue and no legend; the hero number above the plot is the
 * title. The extreme days are labelled directly and the rest are in the
 * tooltip, which every bar carries on hover and on keyboard focus, and in the
 * table under the figure, so no value is gated behind the chart. Days with no
 * commit are drawn as gaps rather than skipped: the shape of when the work
 * happened is what the chart is for. The release markers are numbered on the
 * rail and spelled out in the key beneath, because seven labels do not fit
 * beside seven dots on an axis forty pixels a day wide.
 */
export function CommitHistory({
  commits,
  releases,
  caption,
}: CommitHistoryProps): React.ReactElement {
  const id = useId();
  const [active, setActive] = useState<number | null>(null);

  const { days, total, max, ticks } = useMemo(() => {
    const byDate = new Map(commits.map((d) => [d.date, d.commits]));
    const first = parse(commits[0].date);
    const last = parse(commits[commits.length - 1].date);
    const days: CommitDay[] = [];
    for (let t = first; t <= last; t += DAY_MS) {
      const date = new Date(t).toISOString().slice(0, 10);
      days.push({ date, commits: byDate.get(date) ?? 0 });
    }
    const total = commits.reduce((sum, d) => sum + d.commits, 0);
    const max = Math.max(...commits.map((d) => d.commits));
    const step = tickStep(max);
    const ticks: number[] = [];
    for (let v = step; v <= max; v += step) ticks.push(v);
    return { days, total, max, ticks };
  }, [commits]);

  const slot = (WIDTH - PAD_LEFT - PAD_RIGHT) / days.length;
  const barWidth = Math.min(BAR_MAX, slot - 2);
  const x = (i: number) => PAD_LEFT + i * slot + (slot - barWidth) / 2;
  const y = (v: number) => PLOT_HEIGHT - (v / max) * (PLOT_HEIGHT - 20);
  const indexOf = (date: string) => days.findIndex((d) => d.date === date);
  const maxDays = new Set(
    days.filter((d) => d.commits === max).map((d) => d.date)
  );
  // The second-highest day is worth a label too when it is close to the top.
  const second = Math.max(...days.map((d) => d.commits).filter((c) => c < max));
  const labelled = new Set([
    ...maxDays,
    ...(second >= max * 0.8
      ? days.filter((d) => d.commits === second).map((d) => d.date)
      : []),
  ]);
  const railY = PLOT_HEIGHT + AXIS_BAND + 18;

  return (
    <figure className="flex flex-col gap-4" aria-labelledby={`${id}-title`}>
      <div className="flex flex-col gap-1">
        <p
          id={`${id}-title`}
          className="text-text text-4xl leading-10 font-bold"
        >
          {total} commits
        </p>
        <p className="copy">{caption}</p>
      </div>

      {/* Below about 640px the axis labels would shrink past reading, so the
          figure keeps a legible minimum width and scrolls inside its own box
          rather than shrinking, as the minimax diagram does. The key and the
          table beneath carry the same facts for anyone who would rather not
          scroll. */}
      <div className="overflow-x-auto pb-1">
        <div className="relative min-w-[640px]">
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="block h-auto w-full"
            aria-hidden="true"
            onPointerLeave={() => setActive(null)}
          >
            {/* Gridlines: hairline, solid, one step off the surface. */}
            {ticks.map((v) => (
              <g key={v}>
                <line
                  x1={PAD_LEFT}
                  x2={WIDTH - PAD_RIGHT}
                  y1={y(v)}
                  y2={y(v)}
                  stroke="var(--border)"
                  strokeWidth={1}
                />
                <text
                  x={PAD_LEFT - 8}
                  y={y(v) + 4}
                  textAnchor="end"
                  fontSize="12"
                  fill="var(--text-muted)"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {v}
                </text>
              </g>
            ))}
            <line
              x1={PAD_LEFT}
              x2={WIDTH - PAD_RIGHT}
              y1={PLOT_HEIGHT}
              y2={PLOT_HEIGHT}
              stroke="var(--border-strong)"
              strokeWidth={1}
            />

            {/* Bars: square at the baseline, rounded at the data end. */}
            {days.map((d, i) =>
              d.commits === 0 ? null : (
                <g key={d.date}>
                  <path
                    d={`M${x(i)},${PLOT_HEIGHT} v${-(PLOT_HEIGHT - y(d.commits)) + 4} a4,4 0 0 1 4,-4 h${barWidth - 8} a4,4 0 0 1 4,4 v${PLOT_HEIGHT - y(d.commits) - 4} z`}
                    fill={
                      active === i
                        ? "var(--chart-bar-hover)"
                        : "var(--chart-bar)"
                    }
                  />
                  {labelled.has(d.date) ? (
                    <text
                      x={x(i) + barWidth / 2}
                      y={y(d.commits) - 6}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight={600}
                      fill="var(--text)"
                    >
                      {d.commits}
                    </text>
                  ) : null}
                </g>
              )
            )}

            {/* Hit targets: the whole day's slot, wider than the bar. */}
            {days.map((d, i) => (
              <rect
                key={d.date}
                x={PAD_LEFT + i * slot}
                y={0}
                width={slot}
                height={PLOT_HEIGHT}
                fill="transparent"
                onPointerEnter={() => setActive(i)}
              />
            ))}

            {/* Week ticks on the x axis. */}
            {days.map((d, i) =>
              i % 7 === 0 ? (
                <text
                  key={d.date}
                  x={PAD_LEFT + i * slot + slot / 2}
                  y={PLOT_HEIGHT + 18}
                  textAnchor="middle"
                  fontSize="12"
                  fill="var(--text-muted)"
                >
                  {shortDate(d.date)}
                </text>
              ) : null
            )}

            {/* The rail, and the release markers on it. */}
            <line
              x1={PAD_LEFT}
              x2={WIDTH - PAD_RIGHT}
              y1={railY}
              y2={railY}
              stroke="var(--border)"
              strokeWidth={1}
            />
            {releases.map((r, n) => {
              const i = indexOf(r.date);
              if (i < 0) return null;
              const cx = PAD_LEFT + i * slot + slot / 2;
              return (
                <g key={r.date}>
                  <circle
                    cx={cx}
                    cy={railY}
                    r={11}
                    fill="var(--chart-marker)"
                    stroke="var(--surface)"
                    strokeWidth={2}
                  />
                  <text
                    x={cx}
                    y={railY + 4}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight={700}
                    fill="var(--chart-marker-ink)"
                  >
                    {n + 1}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* The tooltip: value first, then the day, then what shipped. */}
          {active !== null ? (
            <div
              role="status"
              className="pointer-events-none absolute top-0 rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm leading-5 shadow-none"
              style={{
                left: `${((PAD_LEFT + active * slot + slot / 2) / WIDTH) * 100}%`,
                transform: "translateX(-50%)",
              }}
            >
              <span className="text-text font-semibold">
                {days[active].commits}{" "}
                {days[active].commits === 1 ? "commit" : "commits"}
              </span>
              <span className="copy text-sm">
                {" "}
                · {longDate(days[active].date)}
              </span>
            </div>
          ) : null}
        </div>
      </div>

      {/* The key to the rail. Numbered to match the markers, and the only
          place their labels live: a table twin, not a repeat. */}
      <ol className="flex flex-col gap-1.5">
        {releases.map((r, n) => (
          <li key={r.date} className="flex items-baseline gap-3">
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
              style={{
                background: "var(--chart-marker)",
                color: "var(--chart-marker-ink)",
              }}
              aria-hidden="true"
            >
              {n + 1}
            </span>
            <span className="copy text-sm leading-5">
              <span className="meta">{shortDate(r.date)}</span> · {r.label}
            </span>
          </li>
        ))}
      </ol>

      {/* The table twin: every value, with no hover and no picture. */}
      <details className="copy text-sm">
        <summary className="cursor-pointer">
          Commits per day, as a table
        </summary>
        <table className="mt-2 border-collapse tabular-nums">
          <thead>
            <tr>
              <th scope="col" className="pr-6 text-left font-semibold">
                Day
              </th>
              <th scope="col" className="text-right font-semibold">
                Commits
              </th>
            </tr>
          </thead>
          <tbody>
            {days.map((d) => (
              <tr key={d.date}>
                <td className="pr-6">{shortDate(d.date)}</td>
                <td className="text-right">{d.commits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>

      {/* Keyboard access to the same readout the pointer gets: one focusable
          per day, announced through the status region above. */}
      <div className="visually-hidden">
        {days.map((d, i) => (
          <button
            key={d.date}
            type="button"
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
          >
            {longDate(d.date)}: {d.commits}{" "}
            {d.commits === 1 ? "commit" : "commits"}
          </button>
        ))}
      </div>
    </figure>
  );
}
