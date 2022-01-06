import { HighlightFeatureClassKey } from "../highlight-feature";
import { ImageUploaderClassKey } from "../image-uploader";

export interface VthComponentNameToClassKey {
  HighlightFeature: HighlightFeatureClassKey;
  ImageUploader: ImageUploaderClassKey;
}

declare module "@mui/material/styles" {
  interface ComponentNameToClassKey extends VthComponentNameToClassKey {}
}

export {};
