import type { CSSInterpolation } from "@emotion/serialize";

import { useCss } from "../hooks/useCss";

export type ExtractNames<
  T extends (...args: any) => { classes: Record<string, any>; cx: any },
> = Partial<ReturnType<T>["classes"]>;

export const getClasses = <T extends string, N extends string>(
  keys: T[],
  name: N,
) => {
  const classesObj: Record<string, string> = {};
  keys.forEach((key: string) => {
    classesObj[key] = `${name}-${key}`;
  });
  return classesObj as { [P in T]: `${N}-${P}` };
};

const deepRenameKeys = <T extends object>(
  obj: T,
  mapFn: (key: string) => string,
): T => {
  const result: any = {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const newKey = mapFn(key);
      const value = obj[key];
      result[newKey] =
        typeof value === "object" ? deepRenameKeys(value as any, mapFn) : value;
    }
  }
  return result;
};

/** Given a `stylesObj`, replaces its keys' `$myClass` with `.{name}-myClass`. */
export const replace$ = <T extends object>(stylesObj: T, name: string): T => {
  return deepRenameKeys(stylesObj, (key) => {
    const matches = key.match(/\$\w+/g);
    if (!matches?.length) return key;
    const newKey = matches.reduce(
      (acc, match) => acc.replace(match, `.${name}-${match.slice(1)}`),
      key,
    );
    return newKey ?? key;
  });
};

/** Utility function to create classes for a component. */
export function createClasses<Name extends string, ClassName extends string>(
  /** Component name in PascalCase (ie. `HvTableCell`). */
  name: Name,
  stylesObject: Record<ClassName, CSSInterpolation>,
) {
  const styles = replace$(stylesObject, name);

  const staticClasses = getClasses(Object.keys(styles) as ClassName[], name);

  /**
   * Hook that takes in a component's `classesProp` overrides, and returns the
   * concatenated static/internal/override `classes`, and the cached `cx` and `css` utilities.
   */
  function useClasses(
    classesProp: Partial<Record<ClassName, string>> = {},
    /** Whether to add the static classes. Disable when included by `classesProp` */
    addStatic = true,
  ) {
    const { cx, css } = useCss();

    const mergeClasses = (key: string) =>
      cx(addStatic && `${name}-${key}`, css(styles[key]), classesProp?.[key]);

    const classes = Object.fromEntries(
      Object.keys(styles).map((key) => [key, mergeClasses(key)]),
    ) as { [P in ClassName]: string };

    return { classes, css, cx };
  }

  return { useClasses, staticClasses };
}
