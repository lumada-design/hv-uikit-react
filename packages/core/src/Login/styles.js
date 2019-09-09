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

  if (theme && theme.hv.palette.atmosphere.atmo2) {
    convertedColor = fade(
        convertHexToRGB(theme.hv.palette.atmosphere.atmo2),
        1
    );
  }

  return {
    container: {
      background: `0 / auto`,
      justifyContent: "flex-end",
      width: "100%",
      height: "100%",
    },
    root: {

    },
    rightContainer: {
      background: convertedColor,
      position:"relative",
      maxWidth:500
    },
    panelPosition:{
      position:"absolute"
    }
  };
};

export default styles;