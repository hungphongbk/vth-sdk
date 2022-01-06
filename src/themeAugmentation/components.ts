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
  ImageUploader?: {
    defaultProps?: ComponentsProps["ImageUploader"];
    styleOverrides?: ComponentsOverrides["ImageUploader"];
    variants?: ComponentsVariants["ImageUploader"];
  };
}

declare module "@mui/material/styles" {
  interface Components extends VthComponents {}
}
