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

import theme from "@hv/uikit-common-themes/dist/theme";
import palette from "../palette";

const muiAppBar = {
  root: {
    borderTop: `4px solid ${theme.palette.accent.acce3}`,
    "@media (min-width: 600px)": {
      height: "50px"
    }
  },
  colorDefault: {
    backgroundColor: theme.palette.atmosphere.atmo1,
    contrastText: theme.palette.accent.acce1
  }
};

export default muiAppBar;
