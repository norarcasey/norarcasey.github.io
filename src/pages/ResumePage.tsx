import React from "react";

import { Resume } from "../components/Resume";
import { useRouteMeta } from "../hooks/usePageMeta";

export function ResumePage(): React.ReactElement {
  useRouteMeta("/resume");

  return (
    <div className="page-wrap">
      {/* `react-to-print` rendered the résumé a second time into a hidden
          iframe to print it. A print stylesheet prints the page that is
          already on screen, so the button is the browser's own dialog and the
          dependency is gone. `print-hide` keeps the button off the paper. */}
      <div className="print-hide flex justify-end">
        <button type="button" className="btn btn-blue" onClick={() => print()}>
          Print résumé
        </button>
      </div>
      <div className="mt-6">
        <Resume />
      </div>
    </div>
  );
}
