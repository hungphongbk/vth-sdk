import { Box, styled } from "@mui/material";

const GUTTER = 8;

export const SimpleTableRoot = styled(Box)`
  --color: #000;
  --border-color: #ddd;
  --summary-border-color: #aaa;
  --background-color: hsl(0deg 0% 100%);
  --header-background-color: hsl(0deg 0% 97.5%);
  --row-hover-background-color: hsl(0deg 0% 96%);
  --row-selected-background-color: hsl(207deg 76% 92%);
  --row-selected-hover-background-color: hsl(207deg 76% 88%);
  --checkbox-color: hsl(207deg 100% 29%);
  --checkbox-focus-color: hsl(207deg 100% 69%);
  --checkbox-disabled-border-color: #ccc;
  --checkbox-disabled-background-color: #ddd;

  table {
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
    padding: ${GUTTER}px;
  }

  th {
    background-color: #eaeaea;
  }
  td.uneditable {
    background-color: #fafafa;
  }
`;
SimpleTableRoot.TextEditor = styled("input")`
  appearance: none;
  box-sizing: border-box;
  width: calc(100% + ${GUTTER * 2}px);
  height: calc(100% + ${GUTTER * 2}px);
  margin: -${GUTTER}px;
  padding: ${GUTTER}px;
  vertical-align: top;
  color: var(--color);
  background-color: var(--background-color);
  font-family: inherit;
  font-size: var(--font-size);
  border: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #999;
    opacity: 1;
  }
`;