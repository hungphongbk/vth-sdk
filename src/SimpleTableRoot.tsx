import { Box } from "@mui/material";
import { css, styled } from "@mui/material/styles";
import React from "react";
import InputUnstyled, { InputUnstyledProps } from "@mui/base/InputUnstyled";

const GUTTER = 8;

export const SimpleTableRoot = styled(Box)<{ rounded?: true; error?: boolean }>`
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
  ${(props) =>
    props.error &&
    css`
      --color: ${props.theme.palette.error.main};
      --border-color: ${props.theme.palette.error.main};
    `}

  table {
    border-collapse: collapse;
    width: 100%;
    color: var(--color);
  }

  td,
  th {
    border: 1px solid var(--border-color);
    text-align: left;
    padding: ${GUTTER}px;
  }

  th {
    background-color: #eaeaea;
  }
  td.uneditable {
    background-color: #fafafa;
  }

  ${(props) =>
    props.rounded &&
    css`
      overflow: hidden;
      border-radius: 12px;
      border: 1px solid var(--border-color);
      > table {
        margin: -1px;
        width: calc(100% + 2px);
      }
    `}
`;

const TextEditorBase = styled("input")<{ error?: boolean }>`
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
  display: block;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #999;
    opacity: 1;
  }
`;

const TextEditor = function TextEditor(props: InputUnstyledProps) {
  return (
    <InputUnstyled
      components={{ Root: "div", Input: TextEditorBase }}
      {...props}
    />
  );
};

SimpleTableRoot.TextEditor = TextEditor;
