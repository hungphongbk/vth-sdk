import { useCallback, useState } from "react";

export const useOpenCloseState = () => {
  const [open, setOpen] = useState(false);
  const doOpen = useCallback(() => setOpen(true), []),
    doClose = useCallback(() => setOpen(false), []);

  return [open, doOpen, doClose];
};
