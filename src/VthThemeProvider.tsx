import React, {
  ComponentType,
  createContext,
  PropsWithChildren,
  useContext,
} from "react";
import { DialogProps, TextFieldProps } from "@mui/material";

export type UploadResponse = {
  id: string;
  path: string;
  preload: string;
  width: number;
  height: number;
};
export type VthThemeContext = {
  components: {
    Dialog: ComponentType<DialogProps>;
    TextField: ComponentType<TextFieldProps>;
    MultilineTextField: ComponentType<TextFieldProps>;
  };
  services: {
    uploadService: (file: File) => Promise<UploadResponse>;
  };
};
type VthThemeProviderProps = PropsWithChildren<{
  config: VthThemeContext;
}>;

export const VthThemeContext = createContext<VthThemeContext | undefined>(
  undefined
);

export function VthThemeProvider({
  config,
  children,
}: VthThemeProviderProps): JSX.Element {
  return (
    <VthThemeContext.Provider value={config}>
      {children}
    </VthThemeContext.Provider>
  );
}

export const useVthTheme = () => {
  return useContext(VthThemeContext)!;
};
