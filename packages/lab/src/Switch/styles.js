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

// Warning: Material-UI: the key `track` provided to the classes property is not implemented in Switch.
// You can only override one of the following: root,icon,iconChecked,switchBase,checked,colorPrimary,colorSecondary,disabled,bar.

const styles = theme => ({
  root: {
    width: 52,
    display: "flex"
  },

  switchBase: {
    width: 52,
    height: `${theme.hv.spacing.sm}px`,
    "&$checked": {
      "& input": {
        width: 51,
        left: -32,
        height: 21
      },
      "& + $bar": {
        backgroundColor: theme.hv.palette.accent.acce2,
        border: `solid 1px ${theme.hv.palette.accent.acce2h}`,
        opacity: 1
      }
    }
  },

  bar: {
    borderRadius: 15,
    width: 52,
    height: `${theme.hv.spacing.sm}px`,
    left: 17,
    top: 8,
    border: `solid 1px ${theme.hv.palette.atmosphere.atmo7}`,
    backgroundColor: theme.hv.palette.atmosphere.atmo2,
    opacity: 1
  },

  icon: {
    width: 16,
    height: 16,
    border: `solid 1px ${theme.hv.palette.atmosphere.atmo7}`,
    backgroundColor: theme.hv.palette.accent.acce0,
    marginLeft: -32,
    marginTop: 2
  },

  checked: {
    transform: "translateX(32px)",
    width: `${theme.hv.spacing.sm}px`,
    height: `${theme.hv.spacing.sm}px`,
    top: 1
  },

  iconChecked: {
    backgroundColor: theme.hv.palette.accent.acce0,
    border: `solid 1px ${theme.hv.palette.accent.acce2h}`,
    marginLeft: "unset",
    marginTop: 0
  },

  disabled: {
    color: theme.hv.palette.atmosphere.atmo4,
    borderColor: theme.hv.palette.atmosphere.atmo6,
    cursor: "no-drop",
    "& + $bar": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo4} !important`,
      border: `solid 1px ${theme.hv.palette.atmosphere.atmo6}`,
      opacity: 1,
      cursor: "no-drop"
    },
    "& $icon": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo6}`
    }
  },

  disabledLabel: {
    ...theme.hv.typography.placeholderText,
    height: `${theme.hv.spacing.sm}px`,
    cursor: "no-drop"
  },

  labelDeselected: {
    ...theme.hv.typography.placeholderText,
    height: `${theme.hv.spacing.sm}px`,
    cursor: "pointer"
  },
  labelSelected: {
    height: `${theme.hv.spacing.sm}px`,
    cursor: "default"
  },

  labelLeftPositioning: {
    paddingRight: `${theme.hv.spacing.xs}px`
  },

  labelRightPositioning: {
    paddingLeft: `${theme.hv.spacing.xs}px`
  },

  uncheckedHoverClass: {
    border: `1px solid ${theme.hv.palette.accent.acce1} !important`,
    backgroundColor: theme.hv.palette.atmosphere.atmo2
  },

  uncheckedIconHoverClass: {
    border: `1px solid ${theme.hv.palette.accent.acce1} !important`
  },

  checkedHoverClass: {
    backgroundColor: `${theme.hv.palette.accent.acce2h} !important`,
    opacity: 1
  },

  checkedIcon: {
    clipPath: "circle(8px)",
    WebkitClipPath: "circle(8px)",
    marginLeft: 0,
    width: "16px !important",
    height: "16px !important"
  }
});

export default styles;
