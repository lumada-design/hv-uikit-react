import type { CSSInterpolation } from "@emotion/serialize";

import { useCss } from "../hooks/useCss";

export type ExtractNames<
  T extends (...args: any) => { classes: Record<string, any>; cx: any },
> = Partial<ReturnType<T>["classes"]>;

/** Maps over an object, preserving the original keys */
function mapObject<T extends Record<string, any>, Value extends any>(
  /** Input object to convert */
  inputObject: T,
  /** Function to map over each entry */
  mapFn: (key: string, value: T[keyof T]) => Value,
) {
  return Object.entries(inputObject).reduce(
    (acc, [key, value]) => {
      acc[key as keyof T] = mapFn(key, value);
      return acc;
    },
    {} as { [J in keyof T]: Value },
  );
}

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
const replace$ = <T extends object>(stylesObj: T, name: string): T => {
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
export function createClasses<
  Name extends string,
  Styles extends Record<string, CSSInterpolation>,
>(
  /** Component name in PascalCase (ie. `HvTableCell`). */
  name: Name,
  stylesObject: Styles,
) {
  const styles = replace$(stylesObject, name);

  const staticClasses = mapObject(styles, (key) => `${name}-${key}`);

  /**
   * Hook that takes in a component's `classesProp` overrides, and returns the
   * concatenated static/internal/override `classes`, and the cached `cx` and `css` utilities.
   */
  function useClasses(
    classesProp: Partial<Record<keyof Styles, string>> = {},
    /** Whether to add the static classes. Disable when included by `classesProp` */
    addStatic = true,
  ) {
    const { cx, css } = useCss();

    /** Object with the merged static+internal+external classes */
    const classes = mapObject(styles, (key) =>
      cx(addStatic && `${name}-${key}`, css(styles[key]), classesProp?.[key]),
    );

    return { classes, css, cx } as const;
  }

  return { useClasses, staticClasses } as const;
}
