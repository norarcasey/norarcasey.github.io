import React from "react";

export interface TestLayer {
  /** What the layer is, short enough to sit inside its bar: "domain core". */
  name: string;
  files: number;
  tests: number;
}

interface TestLayersProps {
  layers: TestLayer[];
}

/**
 * A suite by layer, as the shape the layers actually make.
 *
 * Each bar's width is its share of the tests, so the shape is a measurement
 * rather than a diagram: it widens downward because the domain core is pure
 * and cheap to test exhaustively, not because that shape was the target. A
 * suite weighted the other way would draw itself the other way.
 *
 * The bars start from a common left edge rather than a shared centre. Centred,
 * the eye compares two edges at once and does neither well; against one edge
 * the lengths are read directly, which is the only comparison the chart is
 * for.
 *
 * The fill is an ordinal ramp, one hue light to dark, carrying depth rather
 * than value: the browser tier at the top is the lightest step and the core
 * at the base the darkest. Validated against both surfaces.
 *
 * The layer's name sits inside its bar and the count just outside it. Both
 * inside would be tidier, and the narrowest bar cannot hold both: at a
 * phone's width it is about sixty pixels. So the count moves out rather than
 * being clipped, and the name is the half that stays, because length already
 * tells the eye roughly what the count is. The names are short for the same
 * reason, which is why the top one is "e2e".
 */
export function TestLayers({ layers }: TestLayersProps): React.ReactElement {
  const total = layers.reduce((sum, layer) => sum + layer.tests, 0);
  const widest = Math.max(...layers.map((layer) => layer.tests));
  // Shortest at the top, so the layers run from the slow browser tier down
  // to the cheap one, which is also the order they are worth reading in.
  const stacked = [...layers].sort((a, b) => a.tests - b.tests);

  return (
    // Title, bars and the sentence beneath read as three things, so they are
    // spaced as three rather than as a block.
    <div className="flex flex-col gap-4">
      {/* The unit belongs in the title, as the commit chart's does. Ranged
          right to match the tile beside it, where the figure is the thing
          being compared and the sentence under it is the reading. */}
      <span className="text-text text-right text-4xl leading-10 font-bold">
        {total.toLocaleString("en-GB")} tests
      </span>
      <ol className="flex flex-col gap-1">
        {stacked.map((layer, tier) => (
          <li key={layer.name} className="flex items-center">
            <span
              className="flex h-7 items-center rounded px-2"
              style={{
                width: `${(layer.tests / widest) * 100}%`,
                background: `var(--tier-${tier + 1})`,
                color: `var(--tier-${tier + 1}-ink)`,
              }}
            >
              <span
                className="meta whitespace-nowrap"
                style={{ color: "inherit" }}
              >
                {layer.name}
              </span>
            </span>
            <span className="meta ml-2 shrink-0 tabular-nums">
              {layer.tests}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
