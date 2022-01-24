import { reduce } from "lodash";

export function removeDraftIds<T extends Record<string, any>>(original: T): T {
  if (typeof original !== "object") return original;
  return reduce(
    original,
    (acc, v, k) => {
      if (!(k === "id" && /^draft-/.test(v as string))) {
        // @ts-ignore
        acc[k] = removeDraftIds(v);
      }
      return acc;
    },
    {} as T
  );
}
