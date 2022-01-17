import { createTheme, CssBaseline, Stack, ThemeProvider } from "@mui/material";
import React from "react";
import { SimpleTableRoot } from "../../src";
import { VaithuhayAvatar } from "../../src/assets/VaiThuHayAvatar";

const theme = createTheme();

const table = (
  <table>
    <thead>
      <tr>
        <th>Header 1</th>
        <th>Header 2</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Cell 1</td>
        <td>Cell 2</td>
      </tr>
    </tbody>
  </table>
);

type Props = {};
export default function (props: Props): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack gap={2}>
        <Stack direction={"row"} gap={1}>
          <SimpleTableRoot>{table}</SimpleTableRoot>
          <SimpleTableRoot rounded>{table}</SimpleTableRoot>
        </Stack>
        <Stack direction={"row"} gap={1}>
          <VaithuhayAvatar sx={{ height: 32, width: 32, bgcolor: "#6C6C6C" }} />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
