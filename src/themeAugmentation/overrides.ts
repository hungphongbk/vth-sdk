import { HighlightFeatureClassKey } from "../HighlightFeature";

export interface VthComponentNameToClassKey {
  HighlightFeature: HighlightFeatureClassKey;
}

declare module "@mui/material/styles" {
  interface ComponentNameToClassKey extends VthComponentNameToClassKey {}
}

export {};
