import React from "react";

import { ExternalLink } from "../components/ExternalLink";
import { useRouteMeta } from "../hooks/usePageMeta";

export function ContactMePage(): React.ReactElement {
  useRouteMeta("/contact-me");

  return (
    <div className="page-wrap page-wrap--narrow">
      <div className="flex flex-col gap-4">
        <h1 className="h1">Contact Me</h1>
        <p className="lead">
          The best way to reach me is by email, or find me on the links below.
        </p>
        {/* Three links and nothing else. The envelope and chain-link glyphs
            that used to sit beside them were FontAwesome's only job on this
            page, and they said nothing the label did not. */}
        <ul className="mt-2 flex list-none flex-col gap-3">
          <li className="copy">
            {/* A plain anchor, not ExternalLink: a mailto opens a mail client,
                not a new tab, so the "(opens in a new tab)" note would be a
                lie to a screen reader. As it always was. */}
            <a className="inline-link" href="mailto:noracasey@duck.com">
              noracasey@duck.com
            </a>
          </li>
          <li className="copy">
            <ExternalLink
              url="https://www.linkedin.com/in/nora-casey/"
              label="LinkedIn"
            />
          </li>
          <li className="copy">
            <ExternalLink url="https://github.com/norarcasey" label="GitHub" />
          </li>
        </ul>
      </div>
    </div>
  );
}
