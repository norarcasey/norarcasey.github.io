import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { Box, Button } from "@mui/material";

import { Resume } from "../components/Resume";

export function ResumePage(): React.ReactElement {
  const ref = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  return (
    <Box>
      <Box textAlign="right" mr={2}>
        <Button variant="text" onClick={handlePrint}>
          <FontAwesomeIcon
            aria-label="print resume"
            icon={faPrint}
            size="3x"
            color="black"
          />
        </Button>
      </Box>
      <Resume ref={ref} />
    </Box>
  );
}
