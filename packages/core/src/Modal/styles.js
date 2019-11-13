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

const styles = theme => {
  let convertedColor;
  let dropShadowColor;
  if (theme && theme.hv.palette.atmosphere.atmo5) {
    convertedColor = fade(
      convertHexToRGB(theme.hv.palette.atmosphere.atmo5),
      0.8
    );
  }

  if (theme && theme.hv.palette.accent.acce1) {
    dropShadowColor = fade(
      convertHexToRGB(theme.hv.palette.accent.acce1),
      0.12
    );
  }



  return {
    background: {
      background: convertedColor
    },
    paper: {
      background: `${theme.hv.palette.atmosphere.atmo1}`,
      padding: "0px",
      overflow: "hidden",
      filter: `drop-shadow(0px 2px 12px ${dropShadowColor})`
    },
    closeButton: {
      position: "absolute",
      right: 0,
      top: 0,
      padding: 0,
      margin: `${theme.hv.spacing.xs}px`,
      width: 32,
      minWidth: 32,
      "& > span": {
        width: 32
      },
      "&:hover": {
        backgroundColor: "transparent"
      }
    },
    iconContainer: {
      width: "32px",
      height: "32px",
      display: "flex",
      alignItems: "center",
      "&>svg": {
        margin: "0 auto",
      }
    }
  };
};

export default styles;
