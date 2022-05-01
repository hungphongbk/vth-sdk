import React from "react";
import { Box, CircularProgress } from "@mui/material";

type LoadingIndicatorProps = {};
export function LoadingIndicator(props: LoadingIndicatorProps): JSX.Element {
  return (
    <Box
      className="flex items-center justify-center w-auto h-auto"
      sx={{
        bgcolor: "white",
        p: 1,
        borderRadius: "50%",
        boxShadow: 1,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
