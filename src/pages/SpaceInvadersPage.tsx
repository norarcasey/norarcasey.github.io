import React from "react";
import { Box, Grid, Typography } from "@mui/material";

export function SpaceInvadersPage(): React.ReactElement {
  return (
    <Grid container display="flex" flexDirection="column" alignItems="center">
      <Grid item xs={12} md={8} lg={6}>
        <section className="tile">
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h3">Space Invaders</Typography>
          </Box>
        </section>
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        lg={6}
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <iframe
          src="https://typescript-dg8ddk.stackblitz.io/"
          style={{
            border: "none",
            overflow: "hidden",
            height: "400px",
            width: "400px",
          }}
        />
      </Grid>
    </Grid>
  );
}
