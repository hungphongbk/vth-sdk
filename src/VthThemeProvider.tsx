import React, {
  ComponentType,
  createContext,
  PropsWithChildren,
  useContext,
} from "react";
import { DialogProps, TextFieldProps } from "@mui/material";

export type VthThemeContext = {
  components: {
    Dialog: ComponentType<DialogProps>;
    TextField: ComponentType<TextFieldProps>;
    MultilineTextField: ComponentType<TextFieldProps>;
  };
  services: {
    uploadService: (file: File) => Promise<string>;
  };
};
type VthThemeProviderProps = PropsWithChildren<{
  config: VthThemeContext;
}>;

export const VthThemeContext = createContext<VthThemeContext | undefined>(
  undefined
);

export default function VthThemeProvider({
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
