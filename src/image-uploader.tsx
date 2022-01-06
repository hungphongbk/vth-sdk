import React, {
  ChangeEvent,
  EventHandler,
  PropsWithChildren,
  SyntheticEvent,
  useState,
} from "react";
import { styled } from "@mui/material/styles";
import { uniqueId } from "lodash";
import {
  Box,
  CircularProgress,
  css,
  generateUtilityClass,
  generateUtilityClasses,
  IconButton,
  Theme,
  unstable_composeClasses,
  useThemeProps,
} from "@mui/material";
import { sxFlexCenter, sxFullSize } from "./utils/predefinedSx";
import DeleteIcon from "@mui/icons-material/Delete";
import { AspectRatio, AspectRatioProps } from "./AspectRatio";
import { useVthTheme } from "./VthThemeProvider";
import { IMAGE_UPLOADER } from "./constants";

export interface ImageUploaderClasses {
  root: string;
  deleteButton: string;
}
export type ImageUploaderClassKey = keyof ImageUploaderClasses;

const StyledLabel = styled("label")`
  width: 100%;
  height: 100%;
`;
const UploadInput = styled("input")`
  display: none;
`;

export interface UploadEvent<T = Element> extends SyntheticEvent<T> {
  target: EventTarget &
    Omit<T, "value"> & {
      value: File;
    };
}
export type UploadEventHandler<T = Element> = EventHandler<UploadEvent<T>>;

export interface MediaBase {
  mimetype: string;
  path: string;
  type: string;
  preloadUrl: string;
  width: number;
  height: number;
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
    { name, value, onChange, children, ratio = undefined, onDelete } = props;

  const {
    services: { uploadService },
  } = useVthTheme();

  const emitChange = async (
    event: ChangeEvent<HTMLInputElement>,
    value: any
  ) => {
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
  };
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
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
    });
    setUploading(false);
  };

  const handleRemove = async (event: any) => {
    if (onDelete) await onDelete(value!);
    await emitChange(event, undefined);
  };

  const classes = useUtilityClasses(props);

  return (
    <ImageUploaderThumbnail className={classes.root} ratio={ratio}>
      {!value || !value.path ? (
        <StyledLabel htmlFor={id}>
          <UploadInput
            accept={"image/*"}
            id={id}
            type={"file"}
            onChange={handleChange}
          />
          <Box sx={[sxFullSize, sxFlexCenter]}>
            {uploading ? <CircularProgress /> : children}
          </Box>
        </StyledLabel>
      ) : (
        <Box
          sx={{
            position: "relative",
            "& img": { ...sxFullSize, objectFit: "cover" },
          }}
        >
          <img src={value.path ?? ""} alt="preview" />
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
