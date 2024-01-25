import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import { Box, Button, Typography } from "@mui/material";

import { Resume } from "../components/Resume";

export function ResumePage(): React.ReactElement {
  const ref = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  return (
    <Box>
      <Box textAlign="right">
        <Button variant="text" onClick={handlePrint}>
          <Typography variant="h6">Print</Typography>
        </Button>
      </Box>
      <Resume ref={ref} />
    </Box>
  );
}
