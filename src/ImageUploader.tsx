import React, {
  ChangeEvent,
  EventHandler,
  PropsWithChildren,
  SyntheticEvent,
  useState,
} from "react";
import { styled } from "@mui/material/styles";
import { uniqueId } from "lodash";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { sxFlexCenter, sxFullSize } from "./utils";
import DeleteIcon from "@mui/icons-material/Delete";
import { AspectRatio, AspectRatioProps } from "./AspectRatio";
import { useVthTheme } from "./VthThemeProvider";

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

export type ImageUploaderProps<T extends MediaBase = MediaBase> = Pick<
  AspectRatioProps,
  "ratio"
> & {
  name?: string | undefined;
  value?: T;
  onChange?: UploadEventHandler;
  required?: boolean;
  onDelete?: () => void | Promise<void>;
};

export function ImageUploader<T extends MediaBase = MediaBase>({
  name,
  value,
  onChange,
  children,
  ratio = undefined,
  onDelete,
}: PropsWithChildren<ImageUploaderProps<T>>): JSX.Element {
  const id = uniqueId("file-upload-");
  const [uploading, setUploading] = useState(false);

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
    if (onDelete) await onDelete();
    await emitChange(event, undefined);
  };

  return (
    <AspectRatio
      sx={{ border: 1, borderStyle: "dashed", borderColor: "divider" }}
      ratio={ratio}
    >
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
          <IconButton
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
            onClick={handleRemove}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </AspectRatio>
  );
}
