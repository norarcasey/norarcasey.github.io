import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { Box, Button } from "@mui/material";

import { Resume } from "../components/Resume";
import { useRouteMeta } from "../hooks/usePageMeta";

export function ResumePage(): React.ReactElement {
  useRouteMeta("/resume");

  const ref = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: ref,
  });

  return (
    <Box>
      <Box textAlign="right" mr={2}>
        <Button
          variant="text"
          onClick={() => handlePrint()}
          aria-label="Print résumé"
        >
          <FontAwesomeIcon icon={faPrint} size="3x" color="black" />
        </Button>
      </Box>
      <Resume ref={ref} />
    </Box>
  );
}
