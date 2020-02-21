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

import { fade, hexToRgb } from "@material-ui/core";

const styles = theme => ({
  background: {
    background: fade(hexToRgb(theme.hv.palette.atmosphere.atmo5), 0.8)
  },
  paper: {
    background: `${theme.hv.palette.atmosphere.atmo1}`,
    padding: "0px",
    overflow: "hidden",
    filter: `drop-shadow(0px 2px 12px ${fade(
      hexToRgb(theme.hv.palette.accent.acce1),
      0.12
    )})`
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 0,
    margin: `${theme.hv.spacing.xs}px`,
    minWidth: "unset"
  },
  iconContainer: {
    width: "32px",
    height: "32px"
  }
});

export default styles;
