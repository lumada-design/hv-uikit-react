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
    display: "flex",
    height: 32,
    alignItems: "center",
    transition: "none",
    boxShadow: `-1px 1px 0px 0px ${
      theme.hv.palette.atmosphere.atmo6
    }, 1px 1px 0px 0px ${
      theme.hv.palette.atmosphere.atmo6
    }, -1px -1px 0px 0px ${
      theme.hv.palette.atmosphere.atmo6
    }, 1px -1px 0px 0px ${theme.hv.palette.atmosphere.atmo6}`
  },
  iconWidth: {
    minWidth: "32px !important"
  },
  labelPadding: {
    marginLeft: 8
  },
  btnBase: {
    minWidth: 32,
    maxWidth: 200,
    padding: 0,
    border: "none",
    transition:"none",
    "&:focus": {
      zIndex:1
    },
    "&:active": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo4}`
    }
  },
  labelText: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  btnSecondary: {
    flex: "1 0 0px",
    "&:hover": {
      border: "none !important"
    }
  },
  isSelected: {
    zIndex: 1,
    background: theme.hv.palette.atmosphere.atmo1,
    height: 34,
    cursor: "default",
    ...theme.hv.typography.highlightText,
    boxShadow: `1px -1px 0px 0px ${
      theme.hv.palette.accent.acce1
    }, 1px 0px 0px 0px ${theme.hv.palette.accent.acce1}, 0px 0px 0px 1px ${
      theme.hv.palette.accent.acce1
    }, 0px 0px 0px 0px ${theme.hv.palette.accent.acce1}`
  },
  isUnselected: {
    minWidth: "32px !important",
    background: theme.hv.palette.atmosphere.atmo2,
    ...theme.hv.typography.normalText,
    "&:hover": {
      background: theme.hv.palette.atmosphere.atmo4,
    }
  },
  // vertical button display Styling
  rootVertical: {
    flexDirection: "column",
    height:"auto",
    btnSecondary: {
      flex: "1 1 20px"
    },
    "& $btnBase": {
      width: "100%"
    },
    "& $isSelected": {
      height: 32,
      width: `calc(100% + 2px) !important`
    }
  }
});

export default styles;
