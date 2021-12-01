import { SxProps } from "@mui/system";

export const sxFullWidth: SxProps = {
  width: "100%",
};
export const sxFullSize = {
  width: "100%",
  height: "100%",
} as const;
export const sxFullSizeAbsolute = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
} as const;
export const sxFullSizeFixed = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
} as const;

export const roundBorder: SxProps = {
  borderTopLeftRadius: "100px",
  borderTopRightRadius: "100px",
  borderBottomLeftRadius: "100px",
  borderBottomRightRadius: "100px",
};

export const sxFlexCenter = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
} as const;

// noinspection JSSuspiciousNameCombination
export const sxSize = (width: any, height: any = width) =>
  ({ width, height } as const);
