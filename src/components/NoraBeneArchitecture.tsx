import React, { useId } from "react";

const BOX = {
  fill: "var(--surface-raised)",
  stroke: "var(--border-strong)",
  strokeWidth: 1,
  rx: 8,
};

/**
 * How Nora Bene is built, as the one thing prose cannot show: the line
 * between the phone and the server, and what crosses it.
 *
 * It replaces a list of seven layers, most of which the page now says
 * elsewhere. What the list could not say is the mechanism: that a thought is
 * safe on the device before anything crosses at all, that the board is drawn
 * from two sources rather than one, and that of the two things which never
 * cross, one is refused on purpose.
 *
 * Drawn at 760 units and given a floor of 660px, so the labels stay at a
 * readable size and the figure scrolls inside its own box on a phone rather
 * than shrinking. The paragraph under it carries the same content in words,
 * both for a reader who cannot see it and for one who would rather not
 * scroll.
 *
 * Every colour is a token, so the drawing follows the theme. One hue carries
 * meaning rather than decoration: the pink is the key that is refused.
 */
export function NoraBeneArchitecture(): React.ReactElement {
  const id = useId();
  const arrow = `${id}-arrow`;

  return (
    <figure className="flex flex-col gap-4">
      <div className="overflow-x-auto pb-1">
        <svg
          viewBox="0 0 760 560"
          role="img"
          aria-labelledby={`${id}-title ${id}-desc`}
          className="block h-auto w-full min-w-[660px]"
        >
          <title id={`${id}-title`}>
            What crosses the line between the phone and the server
          </title>
          <desc id={`${id}-desc`}>
            On the phone: typing goes into an outbox on the device, which draws
            the board together with what the server has sent, and a vault that
            seals everything before it leaves. On the server: Postgres, with
            row-level security forced on every table. Three things cross the
            line: the outbox drains when there is a network, upserting on a
            client-generated identifier so a retry makes one row rather than
            two; the server sends back only what changed since the newest row
            already held; and the vault sends ciphertext. One thing never
            crosses: the key that unlocks the vault. Underneath the device side
            sits the pure domain core, which everything on the phone runs on.
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
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-muted)" />
            </marker>
          </defs>

          {/* The line the whole app is arranged around. */}
          <line
            x1="400"
            y1="16"
            x2="400"
            y2="544"
            stroke="var(--border-strong)"
            strokeWidth="1"
            strokeDasharray="5 5"
          />
          <text
            x="212"
            y="30"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-muted)"
          >
            on the phone
          </text>
          <text
            x="580"
            y="30"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-muted)"
          >
            on the server
          </text>

          {/* The device. */}
          <rect x="24" y="48" width="210" height="44" {...BOX} />
          <text
            x="129"
            y="76"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text)"
          >
            Capture
          </text>

          <rect x="24" y="142" width="210" height="48" {...BOX} />
          <text
            x="129"
            y="164"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text)"
          >
            Outbox
          </text>
          <text
            x="129"
            y="180"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-muted)"
          >
            IndexedDB, on this device
          </text>

          <rect x="24" y="316" width="210" height="44" {...BOX} />
          <text
            x="129"
            y="344"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text)"
          >
            The board
          </text>

          <rect x="24" y="404" width="210" height="44" {...BOX} />
          <text
            x="129"
            y="432"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text)"
          >
            The vault
          </text>

          {/* The pure core, underneath everything the phone does. */}
          <rect
            x="24"
            y="486"
            width="376"
            height="46"
            rx="8"
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <text
            x="212"
            y="507"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text)"
          >
            packages/core
          </text>
          <text
            x="212"
            y="523"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-muted)"
          >
            the rules all of this runs on, and nothing else
          </text>

          {/* The server. */}
          <rect x="470" y="150" width="266" height="170" {...BOX} />
          <text
            x="603"
            y="196"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text)"
          >
            Postgres
          </text>
          <text
            x="603"
            y="222"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-muted)"
          >
            row-level security on every table,
          </text>
          <text
            x="603"
            y="238"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-muted)"
          >
            forced, and refusing by default
          </text>
          <text
            x="603"
            y="264"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-muted)"
          >
            the system holds DELETE on nothing
          </text>

          {/* Typing, which waits for no one. */}
          <line
            x1="129"
            y1="92"
            x2="129"
            y2="140"
            stroke="var(--text-muted)"
            strokeWidth="1.5"
            markerEnd={`url(#${arrow})`}
          />
          <text x="141" y="121" fontSize="11" fill="var(--text-muted)">
            writes and returns, same tick
          </text>

          {/* What makes a reload with no network still show your thought. */}
          <line
            x1="88"
            y1="190"
            x2="88"
            y2="314"
            stroke="var(--text-muted)"
            strokeWidth="1.5"
            markerEnd={`url(#${arrow})`}
          />
          <text x="100" y="246" fontSize="11" fill="var(--text-muted)">
            pending writes, laid over the top
          </text>

          {/* Out, when there is a network. */}
          <line
            x1="234"
            y1="166"
            x2="468"
            y2="186"
            stroke="var(--text-muted)"
            strokeWidth="1.5"
            markerEnd={`url(#${arrow})`}
          />
          <text
            x="305"
            y="202"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-muted)"
          >
            drains whenever the network allows,
          </text>
          <text
            x="305"
            y="218"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-muted)"
          >
            upserting so a retry is one row
          </text>

          {/* Back, and only the part that moved. */}
          <line
            x1="470"
            y1="292"
            x2="236"
            y2="330"
            stroke="var(--text-muted)"
            strokeWidth="1.5"
            markerEnd={`url(#${arrow})`}
          />
          <text
            x="305"
            y="266"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-muted)"
          >
            only what changed since
          </text>
          <text
            x="305"
            y="282"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-muted)"
          >
            the newest row already held
          </text>

          {/* Sealed before it goes. */}
          <line
            x1="234"
            y1="416"
            x2="468"
            y2="322"
            stroke="var(--text-muted)"
            strokeWidth="1.5"
            markerEnd={`url(#${arrow})`}
          />
          <text
            x="364"
            y="414"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-muted)"
          >
            ciphertext, and only ciphertext
          </text>

          {/* The one thing that is refused, in the one colour that means it. */}
          <line
            x1="234"
            y1="442"
            x2="386"
            y2="442"
            stroke="var(--pink)"
            strokeWidth="1.5"
          />
          <line
            x1="391"
            y1="428"
            x2="391"
            y2="456"
            stroke="var(--pink)"
            strokeWidth="3"
          />
          <text
            x="305"
            y="472"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--pink)"
          >
            the key that opens it, never
          </text>
        </svg>
      </div>

      <figcaption className="copy max-w-[64ch] text-sm leading-5">
        A thought is safe on this device before anything crosses, which is why
        capture cannot fail. The board is drawn from two sources at once, the
        server&apos;s rows and the writes still queued, so a reload with no
        network shows what you captured rather than losing it. Two other things
        are worth knowing and are not in the picture: signing in is
        passwordless, an emailed code or a passkey that an edge function
        verifies before the auth service issues a one-time token, so nothing in
        the app mints a session; and every layer above is gated in CI by the
        core&apos;s tests, a browser against a production build, and a schema
        check that refuses to deploy the app ahead of its database.
      </figcaption>
    </figure>
  );
}
