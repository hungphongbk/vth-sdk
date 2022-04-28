import React, { ChangeEventHandler } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  CircularProgress,
  Fade,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import { sxFlexCenter, sxFullSize } from "../utils/predefinedSx";
import { ImageUploaderProps, MediaBase } from "./image-uploader";
import PopupState, { bindPopper, bindToggle } from "material-ui-popup-state";

const StyledLabel = styled("label")`
  width: 100%;
  height: 100%;
`;
const UploadInput = styled("input")`
  display: none;
`;

type ImageUploaderInputProps<T extends MediaBase = MediaBase> = Pick<
  ImageUploaderProps<T>,
  "children" | "allowYoutube"
> & {
  id: string;
  uploading: boolean;
  handleChange: ChangeEventHandler;
};
export default function ImageUploaderInput({
  id,
  children,
  uploading,
  handleChange,
  allowYoutube = false,
}: ImageUploaderInputProps): JSX.Element {
  if (!allowYoutube)
    return (
      <>
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
      </>
    );

  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <>
          <StyledLabel htmlFor={id} {...bindToggle(popupState)}>
            <Box sx={[sxFullSize, sxFlexCenter]}>
              {uploading ? <CircularProgress /> : children}
            </Box>
          </StyledLabel>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <Typography sx={{ p: 2 }}>
                    The content of the Popper.
                  </Typography>
                </Paper>
              </Fade>
            )}
          </Popper>
        </>
      )}
    </PopupState>
  );
}
