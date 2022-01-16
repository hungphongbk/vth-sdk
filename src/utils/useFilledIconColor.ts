import { SvgIconProps } from "@mui/material";
import { useMemo } from "react";

export function useFilledIconColor(color: SvgIconProps["color"]) {
  return useMemo(() => {
    if ((color as string) === "green") return ["#8affce", "#008F54"];
    if ((color as string) === "gray") return ["gray.light", "gray.dark"];
    return ["#fff5ca", "#ffcf00"];
  }, [color]);
}
