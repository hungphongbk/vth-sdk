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
  ImageListEditor?: {
    defaultProps?: ComponentsProps["ImageListEditor"];
    styleOverrides?: ComponentsOverrides["ImageListEditor"];
    variants?: ComponentsVariants["ImageListEditor"];
  };
}

declare module "@mui/material/styles" {
  interface Components extends VthComponents {}
}
