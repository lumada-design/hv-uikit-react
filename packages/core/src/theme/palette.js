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

import createPalette from "@material-ui/core/styles/createPalette";

const palette = theme => createPalette({
  primary: {
    main: theme.palette.accent.acce2,
    light: theme.palette.accent.acce2h
  },
  secondary: {
    main: theme.palette.accent.acce1,
    light: theme.palette.atmosphere.atmo7
  },
  text: {
    primary: theme.palette.accent.acce1,
    disabled: theme.palette.atmosphere.atmo7
  },
  background: {
    default: theme.palette.atmosphere.atmo3
  }
});

export default palette;
