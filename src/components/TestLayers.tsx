import React from "react";

export interface TestLayer {
  /** What the layer is: "The domain core". */
  name: string;
  /** What it covers, and what it costs. */
  note: string;
  files: number;
  tests: number;
}

interface TestLayersProps {
  /** Widest first is how they are counted; this draws them base last. */
  layers: TestLayer[];
  /** One line under the total. */
  caption: string;
}

/**
 * A suite by layer, drawn as the shape the layers actually make.
 *
 * Each bar's width is its share of the tests, so the pyramid is a
 * measurement rather than a diagram: this suite makes one because the domain
 * core is pure and cheap to test exhaustively, not because a pyramid was the
 * target. A suite shaped like an ice cream cone would draw one of those.
 *
 * The fill is an ordinal ramp, one hue light to dark, carrying depth rather
 * than value: the browser tier at the top is the lightest step and the core
 * at the base the darkest. Validated against both surfaces. The count sits
 * inside each bar in whichever of ink or white clears 4.5:1 on that step, and
 * every number is also in the key beneath, so nothing is only in the picture.
 */
export function TestLayers({
  layers,
  caption,
}: TestLayersProps): React.ReactElement {
  const total = layers.reduce((sum, layer) => sum + layer.tests, 0);
  const widest = Math.max(...layers.map((layer) => layer.tests));
  // Narrowest at the top, so the stack reads as the pyramid it is.
  const stacked = [...layers].sort((a, b) => a.tests - b.tests);

  return (
    <figure className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <p className="text-text text-4xl leading-10 font-bold">
          {total.toLocaleString("en-GB")} tests
        </p>
        <p className="copy">{caption}</p>
      </div>

      {/* The shape. Bars are centred so the silhouette reads at a glance, and
          each one's width is its share, so the silhouette is the data. */}
      <div className="flex flex-col gap-1" aria-hidden="true">
        {stacked.map((layer, tier) => (
          <div key={layer.name} className="flex justify-center">
            <div
              className="flex items-center justify-center rounded py-2"
              style={{
                width: `${Math.max((layer.tests / widest) * 100, 12)}%`,
                background: `var(--tier-${tier + 1})`,
                color: `var(--tier-${tier + 1}-ink)`,
              }}
            >
              <span className="text-sm leading-5 font-semibold tabular-nums">
                {layer.tests}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* The key, which is also the table: every value is here in words. */}
      <ol className="flex flex-col gap-3">
        {stacked.map((layer, tier) => (
          <li key={layer.name} className="flex gap-3">
            <span
              className="mt-1.5 h-3 w-3 shrink-0 rounded-sm"
              style={{ background: `var(--tier-${tier + 1})` }}
              aria-hidden="true"
            />
            <div className="flex max-w-[64ch] flex-col gap-0.5">
              <p className="text-text text-base leading-6 font-semibold">
                {layer.name}
                <span className="meta">
                  {" · "}
                  {layer.tests} tests in {layer.files} files
                </span>
              </p>
              <p className="copy text-sm leading-5">{layer.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
