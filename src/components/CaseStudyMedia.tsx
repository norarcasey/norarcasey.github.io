import React from "react";

export interface MediaSource {
  src: string;
  /** The MIME type, e.g. "video/webm", so the browser picks without fetching. */
  type: string;
}

interface CaseStudyMediaProps {
  /**
   * The still: a screenshot of the thing running. On its own it is the whole
   * of the slot, with no play affordance, because there is nothing to play.
   * With `sources` it becomes the video's poster frame.
   */
  image?: string;
  /** What the still shows, for a reader who cannot see it. */
  alt?: string;
  /**
   * The encoded files, in the order the browser should try them. Which
   * formats, and whether a page loads the file before it is scrolled to, are
   * decisions that wait on real files (see UI-17 in the runway); nothing here
   * assumes an answer.
   */
  sources?: MediaSource[];
  /**
   * What the frame says when there is neither a still nor a file: the
   * bracketed note naming the recording that belongs here.
   */
  label?: string;
  /** One line under the frame. */
  caption?: string;
}

/**
 * The 16:9 slot at the top of a case study: a still until there is a
 * recording, the recording once there is one.
 *
 * A screenshot is shown as a screenshot. It carries no play button and no
 * poster-frame chrome, because a play affordance over something that cannot
 * be played is a promise the page does not keep. The video state is UI-17's
 * and unchanged: muted, looping and inline as UI-12 specified, and with the
 * browser's own controls, which is not a preference but a rule, since moving
 * content that runs longer than five seconds must be pausable (WCAG 2.2.2).
 *
 * The five-stripe rule sits along the bottom edge either way, the one place
 * the motif appears inside a page's content.
 */
export function CaseStudyMedia({
  image,
  alt = "",
  sources = [],
  label,
  caption,
}: CaseStudyMediaProps): React.ReactElement {
  const hasVideo = sources.length > 0;

  return (
    <figure className="flex w-full flex-col gap-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-wash-blue">
        {hasVideo ? (
          <video
            className="block h-full w-full object-cover"
            poster={image}
            aria-label={alt || label}
            muted
            loop
            playsInline
            autoPlay
            controls
          >
            {sources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>
        ) : image ? (
          <img
            src={image}
            alt={alt}
            decoding="async"
            className="block h-full w-full object-cover object-top"
          />
        ) : (
          // Neither yet: the wash, and a note naming what belongs here.
          <div className="flex h-full w-full items-center justify-center px-6 text-center">
            <span className="meta text-text">{label}</span>
          </div>
        )}
        <div
          className="stripe absolute right-0 bottom-0 left-0"
          aria-hidden="true"
        />
      </div>
      {caption ? <figcaption className="meta">{caption}</figcaption> : null}
    </figure>
  );
}
