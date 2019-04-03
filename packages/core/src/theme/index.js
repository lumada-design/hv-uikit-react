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

import { createMuiTheme } from "@material-ui/core/styles";
import theme from "@hv/uikit-common-themes/dist/theme";
import muiAppBar from "./overrides/muiAppBar";
import muiToolbar from "./overrides/muiToolbar";
import typography from "./typography";
import palette from "./palette";

const muiTheme = createMuiTheme({
  shadows: Array(25).fill("none"),
  palette,
  typography,
  shape: {
    borderRadius: 0
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    },
    MuiInput: {
      disableUnderline: true
    }
  },
  overrides: {
    MuiAppBar: {
      root: muiAppBar.root,
      colorDefault: muiAppBar.colorDefault
    },
    MuiToolbar: {
      root: muiToolbar.root,
      gutters: muiToolbar.gutters,
      dense: muiToolbar.dense
    }
  }
});

muiTheme.spacing = { ...muiTheme.spacing, ...theme.spacing };

export default Object.assign({}, muiTheme, { hv: theme });
