import React, {
  ChangeEventHandler,
  useCallback,
  useMemo,
  useState,
} from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  CircularProgress,
  Fade,
  IconButton,
  Paper,
  Popper,
  Stack,
  TextField,
} from "@mui/material";
import { sxFlexCenter, sxFullSize } from "../utils/predefinedSx";
import { ImageUploaderProps, MediaBase } from "./image-uploader";
import PopupState, { bindPopper, bindToggle } from "material-ui-popup-state";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import { SubmitHandler, useForm } from "react-hook-form";

const StyledLabel = styled("label")`
  width: 100%;
  height: 100%;
`;
const UploadInput = styled("input")`
  display: none;
`;
const YT_REGEXP = /^https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z\d]+)/;

type ImageUploaderInputProps<T extends MediaBase = MediaBase> = Pick<
  ImageUploaderProps<T>,
  "children" | "allowYoutube"
> & {
  id: string;
  uploading: boolean;
  handleChange: ChangeEventHandler;
};

type YtForm = { url: string };

export default function ImageUploaderInput({
  id,
  children,
  uploading,
  handleChange,
  allowYoutube = false,
}: ImageUploaderInputProps): JSX.Element {
  const $uploadImageInput = useMemo(
    () => (
      <UploadInput
        accept={"image/*"}
        id={id}
        type={"file"}
        onChange={handleChange}
      />
    ),
    [id, handleChange]
  );
  const [isYtMode, setIsYtMode] = useState(false);
  const { register, handleSubmit } = useForm<YtForm>({
    defaultValues: { url: "" },
  });

  const handleYtChange = useCallback<SubmitHandler<YtForm>>(
    (value, event) => {
      const nativeEvent = event!.nativeEvent || event;
      // @ts-ignore
      const clonedEvent = new nativeEvent.constructor(
        // @ts-ignore
        nativeEvent.type,
        nativeEvent
      );

      Object.defineProperty(clonedEvent, "target", {
        writable: true,
        value: {
          value: value.url.match(YT_REGEXP)![1],
        },
      });

      handleChange(clonedEvent);
    },
    [handleChange]
  );

  if (!allowYoutube)
    return (
      <>
        <StyledLabel htmlFor={id}>
          {$uploadImageInput}
          <Box sx={[sxFullSize, sxFlexCenter]}>
            {uploading ? <CircularProgress /> : children}
          </Box>
        </StyledLabel>
      </>
    );

  return (
    <PopupState variant="popper" popupId={`popup-${id}`}>
      {(popupState) => (
        <>
          <StyledLabel {...bindToggle(popupState)}>
            <Box sx={[sxFullSize, sxFlexCenter]}>
              {uploading ? <CircularProgress /> : children}
            </Box>
          </StyledLabel>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper sx={{ p: 1 }}>
                  {!isYtMode ? (
                    <Stack direction="row" spacing={1}>
                      <IconButton component={"label"} htmlFor={id}>
                        <AddPhotoAlternateIcon />
                        {$uploadImageInput}
                      </IconButton>
                      <IconButton onClick={() => setIsYtMode(true)}>
                        <YouTubeIcon />
                      </IconButton>
                    </Stack>
                  ) : (
                    <Stack
                      direction="row"
                      spacing={1}
                      className={"items-center mt-1"}
                    >
                      <IconButton onClick={() => setIsYtMode(false)}>
                        <ArrowBackIcon />
                      </IconButton>
                      <TextField
                        size={"small"}
                        sx={{ width: "300px" }}
                        label={"Chèn youtube URL vào đây"}
                        {...register("url", {
                          pattern: YT_REGEXP,
                        })}
                      />
                      <IconButton
                        color={"success"}
                        onClick={handleSubmit(handleYtChange)}
                      >
                        <CheckIcon />
                      </IconButton>
                    </Stack>
                  )}
                </Paper>
              </Fade>
            )}
          </Popper>
        </>
      )}
    </PopupState>
  );
}
