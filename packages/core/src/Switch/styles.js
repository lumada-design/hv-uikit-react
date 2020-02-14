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

const switchWidth = 52;

const thumbPosition = {
  position: "relative",
  left: -16,
  width: 16,
  height: 16
};

const styles = theme => ({
  root: {
    display: "inline-flex"
  },
  switch: {
    padding: 0,
    width: switchWidth,
    height: `${theme.hv.spacing.sm}px`,
    cursor: "pointer"
  },

  switchBase: {
    width: switchWidth,
    height: `${theme.hv.spacing.sm}px`,
    padding: 0,
    // increase CSS specificity
    "&:hover": {
      backgroundColor: "transparent"
    },
    "&$checked": {
      transform: "translateX(32px)",
      "& + $track": {
        opacity: 1
      },
      "&:hover": {
        backgroundColor: "transparent"
      }
    }
  },

  track: {
    borderRadius: 16,
    border: `solid 1px ${theme.hv.palette.accent.acce1}`,
    backgroundColor: theme.hv.palette.atmosphere.atmo2,
    opacity: "unset"
  },

  thumb: {
    ...thumbPosition,
    border: `solid 1px ${theme.hv.palette.accent.acce1}`,
    backgroundColor: theme.hv.palette.atmosphere.atmo2
  },

  checked: {},

  disabled: {
    color: theme.hv.palette.atmosphere.atmo4,
    borderColor: theme.hv.palette.atmosphere.atmo6,
    cursor: "no-drop",
    "& + $track": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo4} !important`,
      border: `solid 1px ${theme.hv.palette.atmosphere.atmo6}`,
      opacity: 1,
      cursor: "no-drop"
    },
    "& $thumb": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo4}`,
      border: `solid 1px ${theme.hv.palette.atmosphere.atmo6}`
    }
  },

  disabledLabel: {
    ...theme.hv.typography.placeholderText,
    height: `${theme.hv.spacing.sm}px`,
    cursor: "no-drop"
  },

  labelDeselected: {
    ...theme.hv.typography.normalText,
    height: `${theme.hv.spacing.sm}px`,
    cursor: "pointer"
  },
  labelSelected: {
    height: `${theme.hv.spacing.sm}px`,
    cursor: "default"
  },

  leftLabel: {
    paddingRight: `${theme.hv.spacing.xs}px`
  },

  rightLabel: {
    paddingLeft: `${theme.hv.spacing.xs}px`
  },

  checkedIcon: {
    ...thumbPosition,
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    border: "none",
    borderRadius: "50%"
  }
});

export default styles;
