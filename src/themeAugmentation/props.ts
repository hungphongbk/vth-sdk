import { HighlightFeatureProps } from "../highlight-feature";
import { ImageUploaderProps } from "../image-uploader";

export interface VthComponentsPropsList {
  HighlightFeature: HighlightFeatureProps;
  ImageUploader: ImageUploaderProps;
}

declare module "@mui/material/styles" {
  interface ComponentsPropsList extends VthComponentsPropsList {}
}

export {};
