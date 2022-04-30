import React, {
  ChangeEvent,
  EventHandler,
  PropsWithChildren,
  SyntheticEvent,
  useCallback,
  useState,
} from "react";
import { styled } from "@mui/material/styles";
import { uniqueId } from "lodash";
import {
  Box,
  css,
  generateUtilityClass,
  generateUtilityClasses,
  IconButton,
  Theme,
  unstable_composeClasses,
  useThemeProps,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AspectRatio, AspectRatioProps } from "../AspectRatio";
import { useVthTheme } from "../VthThemeProvider";
import { IMAGE_UPLOADER } from "../constants";
import ImageUploaderInput from "./image-uploader-input";
import YouTube from "react-youtube";

export interface ImageUploaderClasses {
  root: string;
  deleteButton: string;
}
export type ImageUploaderClassKey = keyof ImageUploaderClasses;

export interface UploadEvent<T = Element> extends SyntheticEvent<T> {
  target: EventTarget &
    Omit<T, "value"> & {
      value: File;
    };
}
export type UploadEventHandler<T = Element> = EventHandler<UploadEvent<T>>;

export enum MediaFormatType {
  Image = "IMAGE",
  Youtube = "YOUTUBE",
}
export interface MediaBase {
  mimetype: string;
  path: string;
  type: string;
  preloadUrl: string;
  width: number;
  height: number;
  formatType: MediaFormatType;
}

export type ImageUploaderProps<T extends MediaBase = MediaBase> =
  PropsWithChildren<
    Pick<AspectRatioProps, "ratio"> & {
      className?: string;
      classes?: Partial<ImageUploaderClasses>;
      name?: string | undefined;
      value?: T;
      onChange?: UploadEventHandler;
      required?: boolean;
      onDelete?: (value: T) => void | Promise<void>;
      allowYoutube?: boolean;
    }
  >;

export const getImageUploaderClass = (slot: string) =>
  generateUtilityClass(IMAGE_UPLOADER, slot);
export const imageUploaderClasses: ImageUploaderClasses =
  generateUtilityClasses(IMAGE_UPLOADER, ["root", "deleteButton"]);
const useUtilityClasses = <T extends MediaBase = MediaBase>(
  props: ImageUploaderProps<T>
) => {
  const { classes } = props,
    slots = {
      root: ["root"],
      deleteButton: ["deleteButton"],
    };
  return unstable_composeClasses(slots, getImageUploaderClass, classes);
};

const ImageUploaderThumbnail = styled(AspectRatio, {
  name: IMAGE_UPLOADER,
  slot: "root",
  overridesResolver: (props, styles) => styles.root,
})(
  ({ theme }) => css`
    border: 1px dashed ${theme.palette.divider};
  `
);

const ImageUploaderDeleteButton = styled(IconButton, {
  name: IMAGE_UPLOADER,
  slot: "deleteButton",
  overridesResolver: (props, styles) => styles.deleteButton,
})(({ theme }) => css``);

export function ImageUploader<T extends MediaBase = MediaBase>(
  inProps: ImageUploaderProps<T>
): JSX.Element {
  const id = uniqueId("file-upload-");
  const [uploading, setUploading] = useState(false);

  const props = useThemeProps<
      Theme,
      ImageUploaderProps<T>,
      typeof IMAGE_UPLOADER
    >({
      props: inProps,
      name: IMAGE_UPLOADER,
    }),
    {
      name,
      value,
      onChange,
      children,
      ratio = undefined,
      allowYoutube = false,
      onDelete,
    } = props;

  const {
    services: { uploadService },
  } = useVthTheme();

  const emitChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, value: any) => {
      if (onChange) {
        const nativeEvent = event.nativeEvent || event;
        // @ts-ignore
        const clonedEvent = new nativeEvent.constructor(
          nativeEvent.type,
          nativeEvent
        );

        Object.defineProperty(clonedEvent, "target", {
          writable: true,
          value: {
            value,
            name,
          },
        });
        onChange(clonedEvent);
      }
    },
    [name, onChange]
  );
  const handleChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setUploading(true);
      if (
        (event.target.files?.length ?? 0) === 0 ||
        (event.target.value?.length ?? 0) > 0
      ) {
        await emitChange(event, {
          // @ts-ignore
          ...(value?.cid ? { id: value.cid } : {}),
          mimetype: "",
          filename: event.target.value,
          path: event.target.value,
          preloadUrl: "",
          width: 640,
          height: 480,
          formatType: MediaFormatType.Youtube,
        });
      } else {
        const file = event.target.files![0]!,
          mimetype = file.type,
          filename = file.name,
          response = await uploadService(file);

        await emitChange(event, {
          ...(value ?? {}),
          // @ts-ignore
          ...(value?.cid ? { id: value.cid } : {}),
          mimetype,
          filename,
          path: response.path,
          preloadUrl: response.preload,
          width: response.width,
          height: response.height,
          formatType: MediaFormatType.Image,
        });
      }
      setUploading(false);
    },
    [emitChange, uploadService, value]
  );

  const handleRemove = async (event: any) => {
    if (onDelete) {
      await onDelete(value!);
    } else emitChange(event, undefined);
  };

  const classes = useUtilityClasses(props);

  return (
    <ImageUploaderThumbnail className={classes.root} ratio={ratio}>
      {!value || !value.path ? (
        <ImageUploaderInput
          id={id}
          uploading={uploading}
          handleChange={handleChange}
          allowYoutube={allowYoutube}
        >
          {children}
        </ImageUploaderInput>
      ) : (
        <Box
          sx={{
            position: "relative",
          }}
        >
          {value.formatType === MediaFormatType.Image ? (
            <img
              className="h-full w-full object-cover"
              src={value.path ?? ""}
              alt="preview"
            />
          ) : (
            <YouTube
              className="h-full w-full object-cover"
              videoId={value.path}
              opts={{ height: "100%", width: "100%" }}
            />
          )}
          <ImageUploaderDeleteButton
            size={"small"}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
            className={classes.deleteButton}
            onClick={handleRemove}
          >
            <DeleteIcon />
          </ImageUploaderDeleteButton>
        </Box>
      )}
    </ImageUploaderThumbnail>
  );
}
