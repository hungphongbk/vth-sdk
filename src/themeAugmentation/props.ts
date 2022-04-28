import { HighlightFeatureProps } from "../highlight-feature";
import { ImageUploaderProps } from "../image-uploader/image-uploader";
import { ImageListEditorPropsInner } from "../image-list-editor";
import { SvgImageUploaderProps } from "../svg-image-uploader";

export interface VthComponentsPropsList {
  HighlightFeature: HighlightFeatureProps;
  ImageUploader: ImageUploaderProps;
  ImageListEditor: ImageListEditorPropsInner;
  SvgImageUploader: SvgImageUploaderProps;
}

declare module "@mui/material/styles" {
  interface ComponentsPropsList extends VthComponentsPropsList {}
}

export {};
