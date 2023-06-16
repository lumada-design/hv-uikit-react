import type { CSSInterpolation } from "@emotion/css";
import type { ClassNamesContent } from "@emotion/react";

type ClassObject<T extends string> = {
  cc: Record<T, string>;
  classes: Partial<Record<T, string>>;
  styles: Record<T, CSSInterpolation>;
};

export const makeClasses = <T extends string>(
  { css, cx }: Pick<ClassNamesContent, "css" | "cx">,
  { cc, classes, styles }: ClassObject<T>
) =>
  Object.keys(cc).reduce((acc, key) => {
    acc[key] = cx(cc?.[key], css(styles?.[key]), classes?.[key]);
    return acc;
  }, {} as { [P in T]: string });

const deepRename = <T extends object>(
  obj: T,
  mapFn: (key: string) => string
): T => {
  const result: any = {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const newKey = mapFn(key);
      const value = obj[key];
      result[newKey] =
        typeof value === "object" ? deepRename(value as any, mapFn) : value;
    }
  }
  return result;
};

/** Given a `stylesObj`, replaces its keys' `$myClass` with `.{name}-myClass` */
export const replace$ = <T extends object>(stylesObj: T, name: string): T => {
  return deepRename(stylesObj, (key) => {
    const matches = key.match(/\$\w+/g);
    if (!matches?.length) return key;
    const newKey = matches.reduce(
      (acc, match) => acc.replace(match, `.${name}-${match.slice(1)}`),
      key
    );
    return newKey ?? key;
  });
};
