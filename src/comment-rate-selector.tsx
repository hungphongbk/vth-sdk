import React from "react";
import {
  css,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from "@mui/material";
import { CommentRateMaps } from "./constants";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(
  ({ theme }) => css`
    .MuiToggleButtonGroup-grouped {
      margin: ${theme.spacing(0.5)};
      border: 0;

      &.Mui-selected {
        color: white;
      }
      text-transform: capitalize;
      height: 20px;
      padding: 0 10px;

      &:not(:first-of-type) {
        border-radius: 10px;
      }
      &:first-of-type {
        border-radius: 10px;
      }
    }
  `
);
const StyledToggleButton = styled(ToggleButton)<{ selectedColor: string }>(
  ({ selectedColor }) => css`
    font-size: 11px;
    &.Mui-selected {
      &,
      &:hover {
        background-color: ${selectedColor};
      }
    }
  `
);

type CommentRateSelectorProps = Omit<ToggleButtonGroupProps, "children">;
export function CommentRateSelector(
  props: CommentRateSelectorProps
): JSX.Element {
  return (
    <StyledToggleButtonGroup {...props}>
      {Object.entries(CommentRateMaps).map(([_enum, { label, color }]) => (
        <StyledToggleButton key={_enum} selectedColor={color} value={_enum}>
          {label}
        </StyledToggleButton>
      ))}
    </StyledToggleButtonGroup>
  );
}
