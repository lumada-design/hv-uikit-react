import { CSSObject } from "@emotion/serialize";

import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";

import { Spacing, Breakpoint } from "./types";

export const { staticClasses, useClasses } = createClasses("HvSimpleGrid", {
  root: {},
});

function size(props: { size: any; sizes: any }) {
  if (typeof props.size === "number") {
    return props.size;
  }

  return props.sizes[props.size] || props.size || props.sizes.md;
}

function getSortedBreakpoints(breakpoints: Breakpoint[]) {
  if (breakpoints.length === 0) {
    return breakpoints;
  }

  const property = "maxWidth" in breakpoints[0] ? "maxWidth" : "minWidth";
  const sorted = [...breakpoints].sort(
    (a, b) =>
      size({ size: b[property], sizes: theme.breakpoints }) -
      size({ size: a[property], sizes: theme.breakpoints })
  );

  return property === "minWidth" ? sorted.reverse() : sorted;
}

export const getContainerStyle = ({
  breakpoints,
  spacing,
  cols,
}: {
  breakpoints?: Breakpoint[];
  spacing: Spacing;
  cols?: number;
}): CSSObject => {
  return {
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gap: theme.space[spacing],
    ...(breakpoints &&
      getSortedBreakpoints(breakpoints).reduce((acc, breakpoint) => {
        const property = "maxWidth" in breakpoint ? "max-width" : "min-width";
        const breakpointSize = size({
          size:
            property === "max-width"
              ? breakpoint.maxWidth
              : breakpoint.minWidth,
          sizes: theme.breakpoints,
        });

        acc[
          `@media (${property}: ${
            breakpointSize + (property === "max-width" ? 0 : 1)
          }px)`
        ] = {
          gridTemplateColumns: `repeat(${breakpoint.cols}, minmax(0, 1fr))`,
          gap: theme.space[spacing],
        };

        return acc;
      }, {})),
  };
};
