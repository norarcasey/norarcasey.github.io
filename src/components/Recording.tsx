import React from "react";

export interface RecordingSource {
  src: string;
  /** The MIME type, e.g. "video/webm", so the browser picks without fetching. */
  type: string;
}

interface RecordingProps {
  /**
   * What the recording shows, in a sentence. It is the video's accessible
   * name, and until a file exists it is also what the frame says.
   */
  label: string;
  /** The poster frame. Shown before playback, and as the whole frame until a
   *  file exists. */
  poster?: string;
  /**
   * The encoded files, in the order the browser should try them. Which
   * formats, and whether a page loads the file before it is scrolled to, are
   * decisions that wait on real files (see UI-17 in the runway); nothing here
   * assumes an answer, and an empty list renders the frame without a player.
   */
  sources?: RecordingSource[];
  /** One line under the frame: "Muted, loops, no sound." */
  caption?: string;
}

/**
 * The 16:9 recording slot on a case-study page: the first video on the site.
 *
 * It is muted, it loops, and it plays inline, as UI-12 specified, and it also
 * carries the browser's own controls. Not a design choice but a rule: moving
 * content that runs longer than five seconds must be pausable (WCAG 2.2.2),
 * and a looping recording with no pause is exactly that. The five-stripe rule
 * sits along the bottom edge of the frame, which is the one place the motif
 * appears inside a page's content.
 */
export function Recording({
  label,
  poster,
  sources = [],
  caption,
}: RecordingProps): React.ReactElement {
  return (
    <figure className="flex w-full flex-col gap-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-wash-blue">
        {sources.length > 0 ? (
          <video
            className="block h-full w-full object-cover"
            poster={poster}
            aria-label={label}
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
        ) : (
          // No file yet: the poster if there is one, else the wash, with the
          // play glyph and the label where the picture will be.
          <div className="flex h-full w-full items-center justify-center">
            {poster ? (
              <img
                src={poster}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : null}
            <div className="relative flex flex-col items-center gap-3 px-6 text-center">
              <span
                className="flex h-16 w-16 items-center justify-center rounded-full bg-pink"
                aria-hidden="true"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="meta text-text">{label}</span>
            </div>
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
