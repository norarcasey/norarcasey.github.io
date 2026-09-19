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
 * Each bar's width is its share of the tests, so the pyramid is a
 * measurement rather than a diagram: this suite makes one because the domain
 * core is pure and cheap to test exhaustively, not because a pyramid was the
 * target. A suite shaped like an ice cream cone would draw one of those.
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
  // Narrowest at the top, so the stack reads as the pyramid it is.
  const stacked = [...layers].sort((a, b) => a.tests - b.tests);

  return (
    <div className="flex flex-col gap-3">
      {/* The unit belongs in the title, as the commit chart's does. */}
      <span className="text-text text-4xl leading-10 font-bold">
        {total.toLocaleString("en-GB")} tests
      </span>
      <ol className="flex flex-col gap-1">
        {stacked.map((layer, tier) => (
          <li key={layer.name} className="flex items-center justify-center">
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
