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

const styles = theme => ({
  root: {
    position: "relative",
    maxWidth: 310,
    minWidth: 310,
    background: theme.hv.palette.atmosphere.atmo1,
    border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
    "&:hover": {
      border: `1px solid ${theme.hv.palette.accent.acce1}`
    }
  },
  rootActive: {
    border: `1px solid ${theme.hv.palette.atmosphere.atmo1}`,
    boxShadow: `0 2px 12px rgba(65,65,65,.12)`,
    "&:hover": {
      border: `1px solid ${theme.hv.palette.atmosphere.atmo1}`,
      boxShadow: `0 2px 12px rgba(65,65,65,.12)`
    }
  },
  rootDisabled: {
    border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
    background: theme.hv.palette.atmosphere.atmo4,
    "&:hover": {
      border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`
    }
  },
  label: {
    ...theme.hv.typography.labelText,
    fontFamily: theme.hv.typography.fontFamily,
    marginBottom: `${theme.hv.spacing.xs}px`
  },
  header: {
    position: "relative",
    height: `${theme.hv.spacing.md}px`,
    cursor: "pointer",
    userSelect: "none",
    outline: "none"
  },
  selection: {
    padding: `0 ${theme.hv.spacing.md}px 0 ${theme.hv.spacing.xs}px`,
    lineHeight: "32px",
    pointerEvents: "none"
  },
  selectionDisabled: {
    ...theme.hv.typography.placeholderText,
    lineHeight: "32px"
  },
  arrow: {
    position: "absolute",
    pointerEvents: "none",
    top: 0,
    right: 0
  },
  headerDisabled: {
    "&:hover": {
      cursor: "not-allowed"
    }
  },

  icon: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "32px",
    height: "32px",
    cursor: "pointer"
  },
  truncate: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
});

export default styles;
