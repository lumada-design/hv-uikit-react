/*
 * Copyright 2020 Hitachi Vantara Corporation
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

const hover = theme => ({
  background: theme.hv.palette.atmosphere.atmo4,
  "& *": {
    background: theme.hv.palette.atmosphere.atmo4
  }
});

const selected = theme => ({
  background: theme.hv.palette.accent.acce1,
  color: theme.hv.palette.atmosphere.atmo1,
  "& *": {
    background: theme.hv.palette.accent.acce1,
    color: theme.hv.palette.atmosphere.atmo1
  },
  "& svg *.color0": {
    fill: theme.hv.palette.atmosphere.atmo1
  }
});

const styles = theme => ({
  optionsRoot: {},
  root: {
    display: "block",
    paddingLeft: `${theme.hv.spacing.sm}px`,
    paddingRight: `${theme.hv.spacing.sm}px`,
    paddingTop: `${theme.hv.spacing.md}px`,
    background: theme.hv.palette.atmosphere.atmo1,
    "& :not(:last-child)": {
      marginBottom: "8px"
    }
  },
  action: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "32px",
    color: theme.hv.palette.atmosphere.acce1,
    "&:hover": hover(theme),
    "&:focus": hover(theme),
    cursor: "pointer",
    "& *": {
      cursor: "pointer"
    }
  },
  noIcon: {
    paddingLeft: `${theme.hv.spacing.xs}px`
  },
  li: {
    listStyle: "none"
  },
  selected: {
    ...selected(theme),
    "&:hover": selected(theme),
    "&:focus": selected(theme)
  }
});

export default styles;
