import { useMemo } from "react";

import { useCss } from "./useCss";
import { useTheme } from "./useTheme";

/** Filter out `undefined` entries from `props` object. */
export function filterProps(props: Record<string, any>) {
  return Object.keys(props).reduce((acc, key) => {
    if (props[key] !== undefined) {
      acc[key] = props[key];
    }
    return acc;
  }, {} as typeof props);
}

/** Injects into `props` the props defined in the theme `componentName`. */
export function useDefaultProps<T extends Record<string, any>>(
  /** Name of the theme component key to inject defaultProps */
  componentName: string, // keyof HvThemeComponents,
  props: T
): T {
  const { activeTheme } = useTheme();
  const { css, cx } = useCss();

  const themeDefaultProps = activeTheme?.components?.[componentName];

  const classes = useMemo(() => {
    const themeClasses = themeDefaultProps?.classes || {};
    const propsClasses = props?.classes || {};
    const classKeys = [
      ...Object.keys(themeClasses),
      ...Object.keys(propsClasses),
    ];
    return classKeys.reduce((acc, key) => {
      acc[key] = cx(
        themeClasses[key] && css(themeClasses[key]),
        propsClasses[key]
      );
      return acc;
    }, {} as Record<string, string>);
  }, [css, cx, props?.classes, themeDefaultProps?.classes]);

  return {
    ...themeDefaultProps,
    ...filterProps(props),
    classes,
  };
}
