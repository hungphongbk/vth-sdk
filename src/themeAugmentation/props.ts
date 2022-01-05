import { HighlightFeatureProps } from "../HighlightFeature";

export interface VthComponentsPropsList {
  HighlightFeature: HighlightFeatureProps;
}

declare module "@mui/material/styles" {
  interface ComponentsPropsList extends VthComponentsPropsList {}
}

export {};
