import { HighlightFeatureClassKey } from "../highlight-feature";
import { ImageUploaderClassKey } from "../image-uploader";
import { ImageListEditorClassKey } from "../image-list-editor";
import { SvgImageUploaderClassKey } from "../svg-image-uploader";

export interface VthComponentNameToClassKey {
  HighlightFeature: HighlightFeatureClassKey;
  ImageUploader: ImageUploaderClassKey;
  ImageListEditor: ImageListEditorClassKey;
  SvgImageUploader: SvgImageUploaderClassKey;
}

declare module "@mui/material/styles" {
  interface ComponentNameToClassKey extends VthComponentNameToClassKey {}
}

export {};
