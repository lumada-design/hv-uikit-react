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

const selected = theme => ({
  background: theme.hv.palette.accent.acce1,
  color: theme.hv.palette.atmosphere.atmo1,
  cursor: "default",
  "& *": {
    background: theme.hv.palette.accent.acce1,
    color: theme.hv.palette.atmosphere.atmo1,
    cursor: "default"
  },
  "& svg *.color0": {
    fill: theme.hv.palette.atmosphere.atmo1
  },
  // hover
  "&:hover": {
    background: theme.hv.palette.accent.acce1,
    color: theme.hv.palette.atmosphere.atmo1,
    "& *": {
      background: theme.hv.palette.accent.acce1,
      color: theme.hv.palette.atmosphere.atmo1
    }
  }
});

const hover = theme => ({
  background: theme.hv.palette.atmosphere.atmo4,
  "& *": {
    background: theme.hv.palette.atmosphere.atmo4
  }
});

const styles = theme => ({
  container: {
    display: "flex",
    background: theme.hv.palette.atmosphere.atmo1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "32px",
    color: theme.hv.palette.atmosphere.acce1,
    marginBottom: "8px",

    // hover
    "&:hover": hover(theme),

    // cursor
    cursor: "pointer",
    "& *": {
      cursor: "pointer"
    },

    "& a, & span": {
      color: "inherit",
      textDecoration: "inherit",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      width: "calc(100% - 84px)", // 64 for both icons witdh + 20 from the margins
      marginLeft: "8px"
    }
  },
  selected: selected(theme),

  iconInfo: {
    width: "32px",
    height: "32px",
    marginLeft: "auto"
  },

  iconUrl: {
    width: "16px",
    height: "16px",
    margin: "8px"
  }
});

export default styles;
