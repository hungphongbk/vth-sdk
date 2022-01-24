import { reduce } from "lodash";

export function removeDraftIds<T extends Record<string, any>>(original: T): T;
export function removeDraftIds(original: any): any {
  if (typeof original !== "object") return original;
  if (Array.isArray(original)) return original.map(removeDraftIds);
  return reduce(
    original,
    (acc, v, k) => {
      if (!(k === "id" && /^draft-/.test(v as string))) {
        acc[k] = removeDraftIds(v);
      }
      return acc;
    },
    {} as any
  );
}
