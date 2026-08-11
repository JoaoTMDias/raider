export * from "./filterImagesBySize";

export function makeId(...args: (string | number | null | undefined)[]): string {
  return args.filter((a) => a != null).join("-");
}
