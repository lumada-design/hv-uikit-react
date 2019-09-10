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
    minHeight: 34,
    alignItems: "center"
  },
  btnBase: {
    maxWidth: 200,
    borderLeft: "none",
    borderRight: "none",
    borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
    borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
    "&:first-child": {
      borderLeft: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
      paddingRight: 1,
      "&:hover": {
        borderLeft: `1px solid ${theme.hv.palette.atmosphere.atmo6}`
      }
    },
    "&:last-child": {
      borderRight: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
      "&:hover": {
        borderRight: `1px solid ${theme.hv.palette.atmosphere.atmo6}`
      }
    }
  },
  rootVertical: {
    flexDirection: "column",
    border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
    borderTop: "none",
    borderBottom: "none",
    "& $btnBase": {
      borderTop: "none",
      borderBottom: "none",
      "&:first-child": {
        borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
        borderLeft: "none"
      },
      "&:last-child": {
        borderRight: "none",
        borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo6}`
      }
    },
    "& $isSelected": {
      height: 32,
      width: `calc(100% + 4px) !important`,
      borderTop: `1px solid ${theme.hv.palette.accent.acce1} !important`,
      borderBottom: `1px solid ${theme.hv.palette.accent.acce1} !important`,
      "& + button[data-selectionindicator='isSelectedVertical']": {
        borderTop: "none !important"
      }
    },
    "& $isUnselected": {
      "&:first-child:hover": {
        borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo6} !important`
      },
      "&:last-child:hover": {
        borderBottom: `1px solid ${
          theme.hv.palette.atmosphere.atmo6
        } !important`
      },
      "&:hover": {
        borderTop: "none !important",
        borderBottom: "none !important"
      }
    }
  },
  isSelected: {
    border: `1px solid ${theme.hv.palette.accent.acce1}`,
    borderLeft: `1px solid ${theme.hv.palette.accent.acce1} !important`,
    borderRight: `1px solid ${theme.hv.palette.accent.acce1} !important`,
    background: theme.hv.palette.atmosphere.atmo1,
    minHeight: 32,
    ...theme.hv.typography.highlightText,
    "&:hover": {
      background: theme.hv.palette.atmosphere.atmo1,
      border: `1px solid ${theme.hv.palette.accent.acce1}`
    },
    "& + button[data-selectionindicator='isSelected']": {
      borderLeft: "none !important"
    }
  },
  isUnselected: {
    background: theme.hv.palette.atmosphere.atmo2,
    ...theme.hv.typography.normalText,
    height: 32,
    "&:hover": {
      borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo6} !important`,
      borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo6} !important`
    }
  },
  btnSecondary: {
    paddingRight: "1px !important",
    "&:hover": {
      borderRight: "none",
      paddingRight: "1px !important",
      background: theme.hv.palette.atmosphere.atmo1
    }
  }
});

export default styles;
