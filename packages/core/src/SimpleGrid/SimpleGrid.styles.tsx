import { createClasses } from "@hitachivantara/uikit-react-utils";
import { HvBreakpoints, theme } from "@hitachivantara/uikit-styles";

import type { HvGridBreakpoint } from "./SimpleGrid";

export const { staticClasses, useClasses } = createClasses("HvSimpleGrid", {
  root: {
    display: "grid",
    boxSizing: "border-box",
    gridTemplateColumns: `repeat(var(--cols, 1), minmax(0, 1fr))`,
  },
});

function getSize(size?: number) {
  return size || Number(theme.breakpoints.values.md);
}

function getSortedBreakpoints(breakpoints: HvGridBreakpoint[]) {
  if (breakpoints.length === 0) {
    return breakpoints;
  }

  const property = "maxWidth" in breakpoints[0] ? "maxWidth" : "minWidth";

  if (property === "minWidth") {
    // For minWidth, sort in ascending order (smallest to largest)
    return [...breakpoints].sort(
      (a, b) => getSize(a[property]) - getSize(b[property]),
    );
  }

  // For maxWidth, sort in descending order (largest to smallest)
  return [...breakpoints].sort(
    (a, b) => getSize(b[property]) - getSize(a[property]),
  );
}

export const getContainerStyle = (
  breakpoints?: HvGridBreakpoint[],
  spacing: HvBreakpoints = "sm",
  cols = 1,
) => {
  return {
    // TODO: review/document precedence of cols/spacing vs breakpoints[cols/spacing]
    "--cols": cols,
    gap: theme.space[spacing],

    ...(breakpoints &&
      getSortedBreakpoints(breakpoints).reduce<
        Record<string, React.CSSProperties>
      >(
        (
          acc: Record<string, React.CSSProperties>,
          breakpoint: HvGridBreakpoint,
        ) => {
          const property = "maxWidth" in breakpoint ? "max-width" : "min-width";
          const breakpointSize = getSize(
            property === "max-width"
              ? breakpoint.maxWidth
              : breakpoint.minWidth,
          );

          acc[`@media (${property}: ${breakpointSize}px)`] = {
            ["--cols" as string]: breakpoint.cols,
            gap: theme.space[breakpoint.spacing || spacing] as string,
          };

          return acc;
        },
        {},
      )),
  };
};
