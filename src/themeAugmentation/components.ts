import {
  ComponentsOverrides,
  ComponentsProps,
  ComponentsVariants,
} from "@mui/material";

export interface VthComponents {
  HighlightFeature?: {
    defaultProps?: ComponentsProps["HighlightFeature"];
    styleOverrides?: ComponentsOverrides["HighlightFeature"];
    variants?: ComponentsVariants["HighlightFeature"];
  };
}

declare module "@mui/material/styles" {
  interface Components extends VthComponents {}
}
