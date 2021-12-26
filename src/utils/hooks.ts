import { useCallback, useState } from "react";

type Cb = () => void;
export const useOpenCloseState = (): [boolean, Cb, Cb] => {
  const [open, setOpen] = useState(false);
  const doOpen = useCallback(() => setOpen(true), []),
    doClose = useCallback(() => setOpen(false), []);

  return [open, doOpen, doClose];
};
