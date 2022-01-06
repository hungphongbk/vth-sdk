import { HighlightFeatureProps } from "../highlight-feature";
import { ImageUploaderProps } from "../image-uploader";
import { ImageListEditorPropsInner } from "../image-list-editor";

export interface VthComponentsPropsList {
  HighlightFeature: HighlightFeatureProps;
  ImageUploader: ImageUploaderProps;
  ImageListEditor: ImageListEditorPropsInner;
}

declare module "@mui/material/styles" {
  interface ComponentsPropsList extends VthComponentsPropsList {}
}

export {};
