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

import {
  convertHexToRGB,
  fade
} from "@material-ui/core/styles/colorManipulator";

const useColor = color => ({
  color,
  "& svg .color0": {
    fill: color
  }
});

const styles = theme => {
  const base1RGB = convertHexToRGB(theme.hv.palette.base.base1);
  const convertedColor = fade(base1RGB, 0.3);
  const convertedColorDisabled = fade(base1RGB, 0.1);

  return {
    root: {
      textTransform: "none",
      "&:hover,&:focus": {},
      "&:active": {},
      "&:focus": {
        outline: "5px auto rgba(0, 150, 255, 1)"
      },
      minWidth: "70px",
      padding: `0 ${theme.hv.spacing.xs}px`,
      cursor: "pointer",
      height: "32px",
      minHeight: "32px",
      ...theme.hv.typography.highlightText
    },
    primary: {
      ...useColor(theme.hv.palette.accent.acce0),
      backgroundColor: theme.hv.palette.accent.acce2,
      "&:hover": {
        backgroundColor: theme.hv.palette.accent.acce2h
      },
      "&:active": {
        backgroundColor: theme.hv.palette.accent.acce2
      },
      "&$primaryDisabled": {
        backgroundColor: theme.hv.palette.atmosphere.atmo4,
        color: theme.hv.palette.atmosphere.atmo7,
        cursor: "not-allowed",
        pointerEvents: "auto"
      },
      "&$primaryDisabled&:hover": {
        backgroundColor: theme.hv.palette.atmosphere.atmo4,
        color: theme.hv.palette.atmosphere.atmo7,
        cursor: "not-allowed",
        pointerEvents: "auto"
      }
    },
    primaryDisabled: {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      ...useColor(theme.hv.palette.atmosphere.atmo7),
      cursor: "not-allowed"
    },
    secondary: {
      backgroundColor: theme.hv.palette.atmosphere.atmo1,
      ...useColor(theme.hv.palette.accent.acce1),
      border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
      "&:hover": {
        backgroundColor: theme.hv.palette.atmosphere.atmo4,
        border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`
      },
      "&:active": {
        backgroundColor: theme.hv.palette.atmosphere.atmo1
      },
      "&$secondaryDisabled": {
        backgroundColor: theme.hv.palette.atmosphere.atmo4,
        color: theme.hv.palette.atmosphere.atmo7,
        border: "none",
        cursor: "not-allowed",
        pointerEvents: "auto"
      },
      "&$secondaryDisabled&:hover": {
        backgroundColor: theme.hv.palette.atmosphere.atmo4,
        color: theme.hv.palette.atmosphere.atmo7,
        border: "none",
        cursor: "not-allowed",
        pointerEvents: "auto"
      }
    },
    secondaryDisabled: {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      ...useColor(theme.hv.palette.atmosphere.atmo7),
      cursor: "not-allowed",
      border: "none"
    },
    ghost: {
      ...useColor(theme.hv.palette.accent.acce1),
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: theme.hv.palette.atmosphere.atmo4
      },
      "&:active": {
        backgroundColor: "transparent"
      },
      "&$ghostDisabled": {
        backgroundColor: "transparent",
        color: theme.hv.palette.atmosphere.atmo7,
        border: "none",
        cursor: "not-allowed",
        pointerEvents: "auto"
      },
      "&$ghostDisabled&:hover": {
        backgroundColor: "transparent",
        color: theme.hv.palette.atmosphere.atmo7,
        border: "none",
        cursor: "not-allowed",
        pointerEvents: "auto"
      }
    },
    ghostDisabled: {
      backgroundColor: "transparent",
      ...useColor(theme.hv.palette.atmosphere.atmo7),
      cursor: "not-allowed"
    },
    ghostSecondary: {
      ...useColor(theme.hv.palette.accent.acce2),
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: theme.hv.palette.atmosphere.atmo4
      },
      "&:active": {
        backgroundColor: "transparent"
      },
      "&$ghostSecondaryDisabled": {
        backgroundColor: "transparent",
        color: theme.hv.palette.atmosphere.atmo7,
        border: "none",
        cursor: "not-allowed",
        pointerEvents: "auto"
      },
      "&$ghostSecondaryDisabled&:hover": {
        backgroundColor: "transparent",
        color: theme.hv.palette.atmosphere.atmo7,
        border: "none",
        cursor: "not-allowed",
        pointerEvents: "auto"
      }
    },
    ghostSecondaryDisabled: {
      backgroundColor: "transparent",
      ...useColor(theme.hv.palette.atmosphere.atmo7),
      cursor: "not-allowed"
    },
    semantic: {
      ...useColor(theme.hv.palette.base.base2),
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: convertedColor
      },
      "&:active": {
        backgroundColor: convertedColor
      },
      "&$semanticDisabled": {
        backgroundColor: convertedColorDisabled,
        ...useColor(theme.hv.palette.atmosphere.atmo7),
        border: "none",
        cursor: "not-allowed",
        pointerEvents: "auto"
      },
      "&$semanticDisabled&:hover": {
        backgroundColor: convertedColorDisabled,
        color: theme.hv.palette.atmosphere.atmo7,
        border: "none",
        cursor: "not-allowed",
        pointerEvents: "auto"
      }
    },
    semanticDisabled: {
      backgroundColor: convertedColorDisabled,
      color: theme.hv.palette.atmosphere.atmo7,
      cursor: "not-allowed"
    },
    startIcon: {
      marginLeft: "-8px"
    }
  };
};

export default styles;
