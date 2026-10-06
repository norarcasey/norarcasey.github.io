import React from "react";

export interface Screen {
  image: string;
  alt: string;
  caption: string;
}

interface ScreenGalleryProps {
  /** Desktop screenshots at 1280 by 900, two to a row from md. */
  screens: Screen[];
  /** Phone screenshots at 390 by 844, side by side and narrower. */
  phones?: Screen[];
}

/**
 * Several screenshots of one app, for a case study whose hero cannot show
 * everything (CASEY-2: Dinora is a dashboard, a budget, an asset's page and a
 * phone, and one frame holds one of them).
 *
 * Every image is below the fold, so each is lazy and reserves its box with an
 * aspect utility at the ratio the driver shoots, and the captions do not jump
 * when a file lands. The ratios are the viewports in `scripts/shootDinora.mjs`;
 * a screenshot taken at another size wants its own.
 */
export function ScreenGallery({
  screens,
  phones = [],
}: ScreenGalleryProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {screens.map((screen) => (
          <figure key={screen.image} className="flex flex-col gap-3">
            <img
              src={screen.image}
              alt={screen.alt}
              loading="lazy"
              decoding="async"
              className="block aspect-[64/45] w-full rounded-xl border border-border bg-wash-blue object-cover object-top"
            />
            <figcaption className="meta">{screen.caption}</figcaption>
          </figure>
        ))}
      </div>
      {phones.length > 0 ? (
        <div className="grid grid-cols-2 gap-6 sm:flex sm:gap-8">
          {phones.map((phone) => (
            <figure
              key={phone.image}
              className="flex flex-col gap-3 sm:w-[240px]"
            >
              <img
                src={phone.image}
                alt={phone.alt}
                loading="lazy"
                decoding="async"
                className="block aspect-[195/422] w-full rounded-xl border border-border bg-wash-blue object-cover object-top"
              />
              <figcaption className="meta">{phone.caption}</figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </div>
  );
}
