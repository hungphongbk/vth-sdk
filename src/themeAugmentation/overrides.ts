import { HighlightFeatureClassKey } from "../highlight-feature";
import { ImageUploaderClassKey } from "../image-uploader";
import { ImageListEditorClassKey } from "../image-list-editor";

export interface VthComponentNameToClassKey {
  HighlightFeature: HighlightFeatureClassKey;
  ImageUploader: ImageUploaderClassKey;
  ImageListEditor: ImageListEditorClassKey;
}

declare module "@mui/material/styles" {
  interface ComponentNameToClassKey extends VthComponentNameToClassKey {}
}

export {};
