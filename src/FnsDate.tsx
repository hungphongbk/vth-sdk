import { useMemo } from "react";
import { format } from "date-fns";

type FnsDateProps = {
  value: string | Date;
  format: string;
};
export function FnsDate(props: FnsDateProps) {
  const value = useMemo(() => {
    if (typeof props.value === "string") return new Date(props.value);
    return props.value;
  }, [props.value]);
  return format(value, props.format);
}
