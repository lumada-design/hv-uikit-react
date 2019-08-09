/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { keys as breakpointKeys } from "@material-ui/core/styles/createBreakpoints";

const GUTTERS = [0, 8, 15, 16, 24, 30, 32, 40];
const GRID_SIZES = ["auto", true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const BREAKPOINT_COL = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 12,
  xl: 12
};

function generateGrid(globalStyles, theme, breakpoint) {
  const styles = {};

  GRID_SIZES.forEach(size => {
    const key = `grid-${breakpoint}-${size}`;

    if (size === true) {
      // For the auto layouting
      styles[key] = {
        flexBasis: 0,
        flexGrow: 1,
        maxWidth: "100%"
      };
      return;
    }

    if (size === "auto") {
      styles[key] = {
        flexBasis: "auto",
        flexGrow: 0,
        maxWidth: "none"
      };
      return;
    }

    // Keep 7 significant numbers.
    const width = `${Math.round((size / BREAKPOINT_COL[breakpoint]) * 10e7) /
      10e5}%`;

    styles[key] = {
      flexBasis: width,
      flexGrow: 0,
      maxWidth: width
    };
  });
  // No need for a media query for the first size.
  if (breakpoint === "xs") {
    Object.assign(globalStyles, styles);
  } else {
    // eslint-disable-next-line no-param-reassign
    globalStyles[theme.breakpoints.up(breakpoint)] = styles;
  }
}

function generateGutter(theme, breakpoint) {
  const styles = {};

  GUTTERS.forEach((spacing, index) => {
    if (index === 0) {
      // Skip the default style.
      return;
    }
    styles[`spacing-${breakpoint}-${spacing}`] = {
      marginTop: -spacing / 2,
      marginBottom: -spacing / 2,

      width: "100%",
      "& > div": {
        padding: spacing / 2
      }
    };
  });

  return styles;
}

const styles = theme => ({
  /* Styles applied to the root element */
  root: {},
  /* Styles applied to the root element if `container={true}`. */
  container: {
    boxSizing: "border-box",
    display: "flex",
    flexWrap: "wrap",
    width: "100%"
  },
  /* Styles applied to the root element if `item={true}`. */
  item: {
    boxSizing: "border-box",
    margin: "0" // For instance, it's useful when used with a `figure` element.
  },
  /* Styles applied to the root element if `zeroMinWidth={true}`. */
  zeroMinWidth: {
    minWidth: 0
  },
  /* Styles applied to the root element if `direction="column"`. */
  "direction-xs-column": {
    flexDirection: "column"
  },
  /* Styles applied to the root element if `direction="column-reverse"`. */
  "direction-xs-column-reverse": {
    flexDirection: "column-reverse"
  },
  /* Styles applied to the root element if `direction="rwo-reverse"`. */
  "direction-xs-row-reverse": {
    flexDirection: "row-reverse"
  },
  /* Styles applied to the root element if `wrap="nowrap"`. */
  "wrap-xs-nowrap": {
    flexWrap: "nowrap"
  },
  /* Styles applied to the root element if `wrap="reverse"`. */
  "wrap-xs-wrap-reverse": {
    flexWrap: "wrap-reverse"
  },
  /* Styles applied to the root element if `alignItems="center"`. */
  "align-items-xs-center": {
    alignItems: "center"
  },
  /* Styles applied to the root element if `alignItems="flex-start"`. */
  "align-items-xs-flex-start": {
    alignItems: "flex-start"
  },
  /* Styles applied to the root element if `alignItems="flex-end"`. */
  "align-items-xs-flex-end": {
    alignItems: "flex-end"
  },
  /* Styles applied to the root element if `alignItems="baseline"`. */
  "align-items-xs-baseline": {
    alignItems: "baseline"
  },
  /* Styles applied to the root element if `alignContent="center"`. */
  "align-content-xs-center": {
    alignContent: "center"
  },
  /* Styles applied to the root element if `alignContent="flex-start"`. */
  "align-content-xs-flex-start": {
    alignContent: "flex-start"
  },
  /* Styles applied to the root element if `alignContent="flex-end"`. */
  "align-content-xs-flex-end": {
    alignContent: "flex-end"
  },
  /* Styles applied to the root element if `alignContent="space-between"`. */
  "align-content-xs-space-between": {
    alignContent: "space-between"
  },
  /* Styles applied to the root element if `alignContent="space-around"`. */
  "align-content-xs-space-around": {
    alignContent: "space-around"
  },
  /* Styles applied to the root element if `justify="center"`. */
  "justify-xs-center": {
    justifyContent: "center"
  },
  /* Styles applied to the root element if `justify="flex-end"`. */
  "justify-xs-flex-end": {
    justifyContent: "flex-end"
  },
  /* Styles applied to the root element if `justify="space-between"`. */
  "justify-xs-space-between": {
    justifyContent: "space-between"
  },
  /* Styles applied to the root element if `justify="space-around"`. */
  "justify-xs-space-around": {
    justifyContent: "space-around"
  },
  /* Styles applied to the root element if `justify="space-evenly"`. */
  "justify-xs-space-evenly": {
    justifyContent: "space-evenly"
  },
  ...generateGutter(theme, "xs"),
  ...breakpointKeys.reduce((accumulator, key) => {
    // Use side effect over immutability for better performance.
    generateGrid(accumulator, theme, key);
    return accumulator;
  }, {})
});

export default styles;
