import React from "react";
import { Box, CircularProgress } from "@mui/material";

type LoadingIndicatorProps = {};
export function LoadingIndicator(props: LoadingIndicatorProps): JSX.Element {
  return (
    <Box
      sx={{
        bgcolor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 1,
        borderRadius: "50%",
        boxShadow: 1,
        width: "auto",
        height: "auto",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
