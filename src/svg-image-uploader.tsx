import { styled } from "@mui/material/styles";
import React, { ChangeEvent, PropsWithChildren } from "react";
import { AspectRatio, AspectRatioProps } from "./AspectRatio";
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
import { SVG_IMAGE_UPLOADER } from "./constants";
import { sxFlexCenter, sxFullSize } from "./utils/predefinedSx";
import { uniqueId } from "lodash";
import DeleteIcon from "@mui/icons-material/Delete";
import { UploadEventHandler } from "./image-uploader";

export interface SvgImageUploaderClasses {
  root: string;
  deleteButton: string;
}
export type SvgImageUploaderClassKey = keyof SvgImageUploaderClasses;

const StyledLabel = styled("label")`
  width: 100%;
  height: 100%;
`;
const UploadInput = styled("input")`
  display: none;
`;

export type SvgImageUploaderProps = PropsWithChildren<
  Pick<AspectRatioProps, "ratio"> & {
    className?: string;
    classes?: Partial<SvgImageUploaderClasses>;
    name?: string | undefined;
    value?: string;
    onChange?: UploadEventHandler;
    required?: boolean;
    onDelete?: (value: string) => void | Promise<void>;
  }
>;

export const getSvgImageUploaderClass = (slot: string) =>
  generateUtilityClass(SVG_IMAGE_UPLOADER, slot);
export const svgImageUploaderClasses: SvgImageUploaderClasses =
  generateUtilityClasses(SVG_IMAGE_UPLOADER, ["root", "deleteButton"]);
const useUtilityClasses = (props: SvgImageUploaderProps) => {
  const { classes } = props,
    slots = {
      root: ["root"],
      deleteButton: ["deleteButton"],
    };
  return unstable_composeClasses(slots, getSvgImageUploaderClass, classes);
};

const SvgImageUploaderThumbnail = styled(AspectRatio, {
  name: SVG_IMAGE_UPLOADER,
  slot: "root",
  overridesResolver: (props, styles) => styles.root,
})(
  ({ theme }) => css`
    border: 1px dashed ${theme.palette.divider};
  `
);

const SvgImageUploaderDeleteButton = styled(IconButton, {
  name: SVG_IMAGE_UPLOADER,
  slot: "deleteButton",
  overridesResolver: (props, styles) => styles.deleteButton,
})(({ theme }) => css``);

export const readSvgFileAsBase64 = (file: File) =>
  new Promise<string>((resolve) => {
    const fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result as string);
    };
    fr.readAsDataURL(file);
  });

export function SvgImageUploader(inProps: SvgImageUploaderProps): JSX.Element {
  const id = uniqueId("svg-file-upload-");
  const props = useThemeProps<
      Theme,
      SvgImageUploaderProps,
      typeof SVG_IMAGE_UPLOADER
    >({
      props: inProps,
      name: SVG_IMAGE_UPLOADER,
    }),
    { name, value, onChange, children, ratio = undefined, onDelete } = props;
  const emitChange = (event: ChangeEvent<HTMLInputElement>, value: any) => {
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

  const doChange = (event: ChangeEvent<HTMLInputElement>, value: any) => {
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
    doChange(event, await readSvgFileAsBase64(event.target.files![0]!));
  };

  const handleRemove = async (event: any) => {
    if (onDelete) {
      await onDelete(value!);
    } else emitChange(event, undefined);
  };

  const classes = useUtilityClasses(props);

  return (
    <SvgImageUploaderThumbnail className={classes.root} ratio={ratio}>
      {!value ? (
        <StyledLabel htmlFor={id}>
          <UploadInput
            accept={"image/svg+xml"}
            id={id}
            type={"file"}
            onChange={handleChange}
          />
          <Box sx={[sxFullSize, sxFlexCenter]}>{children}</Box>
        </StyledLabel>
      ) : (
        <Box
          sx={{
            position: "relative",
            "& img": { ...sxFullSize, objectFit: "cover" },
          }}
        >
          <img src={value} alt="svg preview" />
          <SvgImageUploaderDeleteButton
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
          </SvgImageUploaderDeleteButton>
        </Box>
      )}
    </SvgImageUploaderThumbnail>
  );
}
