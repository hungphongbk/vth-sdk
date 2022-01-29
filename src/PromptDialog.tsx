import React, {
  createContext,
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { LoadingButton } from "@mui/lab";

export type PromptArg = {
  message: ReactNode;
  title?: ReactNode;
  okLabel?: ReactNode;
  cancelLabel?: ReactNode;
  disableCancel?: boolean;
  // only use this arg when you want to turn ok button as loadable
  onOk?: () => void | Promise<void>;
};
export type PromptFunc = (arg: PromptArg) => Promise<{
  status: "ok" | "cancel";
}>;
export type PromptHandler = { open: PromptFunc };
const PromptDialog = forwardRef<PromptHandler>(function PromptDialog(
  props,
  ref
): JSX.Element {
  const [open, setOpen] = useState<any>(undefined),
    [loading, setLoading] = useState(false);
  const arg = useRef<PromptArg>({ message: "" });
  const handleCancel = () => {
    (open as any)({ status: "cancel" });
    setOpen(undefined);
    arg.current = { message: "" };
  };
  const handleOk = async () => {
    (open as any)({ status: "ok" });
    if (arg.current.onOk) {
      setLoading(true);
      await arg.current.onOk();
      setLoading(false);
    }
    setOpen(undefined);
    arg.current = { message: "" };
  };

  useImperativeHandle(
    ref,
    () => ({
      open: (_arg) => {
        arg.current = _arg;
        setLoading(false);
        return new Promise((resolve) => {
          setOpen(() => resolve);
        });
      },
    }),
    [setOpen]
  );

  return (
    <div>
      <Dialog
        open={typeof open !== "undefined"}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {arg.current.title && (
          <DialogTitle id="alert-dialog-title">{arg.current.title}</DialogTitle>
        )}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {arg.current.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {!arg.current.disableCancel && (
            <Button onClick={handleCancel}>
              {arg.current.cancelLabel ?? "Cancel"}
            </Button>
          )}
          <LoadingButton onClick={handleOk} autoFocus loading={loading}>
            {arg.current.okLabel ?? "OK"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
});

const PromptContext = createContext<PromptFunc | undefined>(undefined);

export const PromptProvider = ({
  children,
}: PropsWithChildren<unknown>): JSX.Element => {
  const [ref, setRef] = useState<PromptHandler | null>(null);
  return (
    <PromptContext.Provider value={ref?.open}>
      {children}
      <PromptDialog ref={setRef} />
    </PromptContext.Provider>
  );
};

export const usePrompt = (): PromptFunc => {
  const open = useContext(PromptContext);

  return open!;
};
