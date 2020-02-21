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

import { fade, hexToRgb } from "@material-ui/core";

export const boxShadow = color => ({
  boxShadow: `0 0 0 ${color}, 0 6px 12px ${fade(hexToRgb(color), 0.12)}`
});

const styles = theme => ({
  root: {
    display: "flex",
    width: "100%"
  },
  header: {
    zIndex: theme.zIndex.appBar,
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: 50,
    padding: `0 ${theme.hv.spacing.sm}px`,
    borderTop: `4px solid ${theme.hv.palette.accent.acce3}`,
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    ...boxShadow(theme.hv.palette.accent.acce1),
    "& > *:not(nav)": {
      zIndex: 2
    }
  }
});

export default styles;
