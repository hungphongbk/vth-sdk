import { useCallback, useState } from "react";

export const useOpenCloseState = () => {
  const [open, setOpen] = useState(false);
  const doOpen: () => void = useCallback(() => setOpen(true), []),
    doClose: () => void = useCallback(() => setOpen(false), []);

  return [open, doOpen, doClose];
};
