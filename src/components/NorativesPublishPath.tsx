import React, { useId } from "react";

// Drawn in the commit chart's language, so the two figures on the page read as
// one pair: hairline structure in the border tokens, the accent carrying the
// paths that are the subject, the marker pink kept for the exception, and
// labels at the chart's 12px.
const BOX = {
  fill: "var(--surface-raised)",
  stroke: "var(--border-strong)",
  strokeWidth: 1,
  rx: 6,
};

/** The crossings are this figure's data, so they are drawn as the bars are. */
const FLOW = {
  stroke: "var(--chart-bar)",
  strokeWidth: 2,
  fill: "none",
};

/**
 * How Noratives publishes, as the one thing prose cannot show: the line
 * between what is private and what is readable by anybody, and which notebook
 * crosses it.
 *
 * The page could say in words that journals stay private. What only a picture
 * says is that this is structural rather than a setting: there is no path out
 * of the box for a journal, because a journal is a notebook nobody gave a
 * destination to, and the thing that crosses the line is a snapshot rather
 * than the entry itself.
 *
 * The journal is drawn first because that is the order it happened in: the
 * app was a journal before it was anything else, and the two notebooks with
 * somewhere to go arrived later, because using it asked for them.
 *
 * Drawn at 760 units and given a floor of 660px, so the labels stay a readable
 * size and the figure scrolls inside its own box on a phone rather than
 * shrinking. The `title` and `desc` inside the SVG carry the same content in
 * words, which is what a screen reader is given; there is no caption, because
 * the drawing turned out to say it and a paragraph restating a picture is a
 * paragraph nobody reads.
 *
 * Every colour is a token, so the drawing follows the theme. One hue carries
 * meaning rather than decoration: the pink is the notebook that never leaves.
 */
export function NorativesPublishPath(): React.ReactElement {
  const id = useId();
  const arrow = `${id}-arrow`;

  return (
    <figure>
      <div className="overflow-x-auto pb-1">
        <svg
          viewBox="0 0 760 520"
          role="img"
          aria-labelledby={`${id}-title ${id}-desc`}
          className="block h-auto w-full min-w-[660px]"
        >
          <title id={`${id}-title`}>
            What crosses the line between the studio and a public site
          </title>
          <desc id={`${id}-desc`}>
            In the studio, every table is owner-only: an entry belongs to a
            notebook the writer made, and a notebook publishes to at most one
            site. The journal this app began as publishes to none, so it is not
            publishable at all. Publishing writes a snapshot into
            published_entries, which is still owner-only; a view over it,
            public_posts, is what is readable, and it carries no user_id. Two
            sites read that view. novellanora.com reads it on every request.
            noracasey.com is built as static files, so publishing also calls an
            edge function that holds a deploy hook and posts to it, and the
            rebuilt site then reads the same view with its own credentials.
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

          {/* ── In the studio ──────────────────────────────────────────── */}
          <text
            x="24"
            y="28"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-muted)"
          >
            In the studio
          </text>

          <rect x="24" y="44" width="330" height="150" {...BOX} />
          <text
            x="189"
            y="68"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text)"
          >
            An entry, in a notebook the writer made
          </text>

          {/* The one that never leaves, in the one colour that means it, and
              first because it is what the app was before it was anything
              else. It also keeps the publish arrow below the box from
              appearing to come out of the row that has nowhere to go. */}
          <rect
            x="40"
            y="80"
            width="298"
            height="26"
            rx="4"
            fill="var(--wash-pink)"
            stroke="var(--chart-marker)"
            strokeWidth="1"
          />
          <text
            x="52"
            y="97"
            fontSize="12"
            fontWeight="600"
            fill="var(--chart-marker)"
          >
            Journal
          </text>
          <text
            x="326"
            y="97"
            textAnchor="end"
            fontSize="12"
            fontWeight="600"
            fill="var(--chart-marker)"
          >
            nowhere to publish it to
          </text>

          {/* The two that came later, each with somewhere to go. */}
          <rect
            x="40"
            y="110"
            width="298"
            height="26"
            rx="4"
            fill="var(--wash-blue)"
          />
          <text
            x="52"
            y="127"
            fontSize="12"
            fontWeight="600"
            fill="var(--text)"
          >
            Writing
          </text>
          <text
            x="326"
            y="127"
            textAnchor="end"
            fontSize="12"
            fill="var(--text-muted)"
          >
            novellanora.com
          </text>

          <rect
            x="40"
            y="140"
            width="298"
            height="26"
            rx="4"
            fill="var(--wash-blue)"
          />
          <text
            x="52"
            y="157"
            fontSize="12"
            fontWeight="600"
            fill="var(--text)"
          >
            Technical
          </text>
          <text
            x="326"
            y="157"
            textAnchor="end"
            fontSize="12"
            fill="var(--text-muted)"
          >
            noracasey.com
          </text>

          <text
            x="384"
            y="68"
            fontSize="13"
            fontWeight="600"
            fill="var(--text)"
          >
            Owner-only, at the row level
          </text>
          <text x="384" y="92" fontSize="12" fill="var(--text-muted)">
            Every table checks who is asking and refuses by
          </text>
          <text x="384" y="110" fontSize="12" fill="var(--text-muted)">
            default. Which notebooks exist is the writer&apos;s to
          </text>
          <text x="384" y="128" fontSize="12" fill="var(--text-muted)">
            decide; whether one can publish, and where to, is
          </text>
          <text x="384" y="146" fontSize="12" fill="var(--text-muted)">
            a property of the notebook rather than a checkbox.
          </text>

          {/* ── The snapshot ───────────────────────────────────────────── */}
          <path d="M189,194 V228" {...FLOW} markerEnd={`url(#${arrow})`} />
          <text x="200" y="217" fontSize="12" fill="var(--text-muted)">
            publish
          </text>

          <rect x="24" y="232" width="330" height="58" {...BOX} />
          <text
            x="189"
            y="256"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text)"
          >
            published_entries
          </text>
          <text
            x="189"
            y="276"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-muted)"
          >
            a copy of what went out, still owner-only
          </text>

          <path d="M354,261 H420" {...FLOW} markerEnd={`url(#${arrow})`} />
          <rect x="424" y="232" width="250" height="58" {...BOX} />
          <text
            x="549"
            y="256"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text)"
          >
            trigger-rebuild
          </text>
          <text
            x="549"
            y="276"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-muted)"
          >
            an edge function, holding the hook
          </text>

          {/* ── The line ───────────────────────────────────────────────── */}
          <line
            x1="24"
            y1="320"
            x2="736"
            y2="320"
            stroke="var(--border-strong)"
            strokeWidth="1"
            strokeDasharray="5 5"
          />
          <text
            x="24"
            y="312"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-muted)"
          >
            private above this line
          </text>

          {/* ── Public ─────────────────────────────────────────────────── */}
          <path d="M189,290 V352" {...FLOW} markerEnd={`url(#${arrow})`} />

          <rect x="24" y="356" width="330" height="86" {...BOX} />
          <text
            x="189"
            y="382"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text)"
          >
            public_posts
          </text>
          <text
            x="189"
            y="402"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-muted)"
          >
            a view over the snapshots: readable, and
          </text>
          <text
            x="189"
            y="420"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-muted)"
          >
            nothing else. It carries no user_id.
          </text>

          <path d="M354,380 H420" {...FLOW} markerEnd={`url(#${arrow})`} />
          <rect x="424" y="356" width="250" height="58" {...BOX} />
          <text
            x="549"
            y="380"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text)"
          >
            novellanora.com
          </text>
          <text
            x="549"
            y="400"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-muted)"
          >
            reads it on every request
          </text>

          <path
            d="M354,414 H390 V471 H420"
            {...FLOW}
            markerEnd={`url(#${arrow})`}
          />
          <rect x="424" y="442" width="250" height="58" {...BOX} />
          <text
            x="549"
            y="466"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text)"
          >
            noracasey.com
          </text>
          <text
            x="549"
            y="486"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-muted)"
          >
            static files, so it has to be rebuilt
          </text>

          {/* The rebuild: the only message sent anywhere on this page, and it
              carries nothing except the fact that there is something new. The
              site still reads the view itself, which is the arrow above. */}
          <path
            d="M674,261 H706 V471 H678"
            {...FLOW}
            markerEnd={`url(#${arrow})`}
          />
          <text
            x="698"
            y="338"
            textAnchor="end"
            fontSize="12"
            fill="var(--text-muted)"
          >
            start a build
          </text>
        </svg>
      </div>
    </figure>
  );
}
