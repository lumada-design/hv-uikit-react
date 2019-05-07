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
import dawnTheme from "@hv/uikit-common-themes/dist/dawn";
import wickedTheme from "@hv/uikit-common-themes/dist/wicked";
import muiAppBarFunc from "./overrides/muiAppBar";
import muiToolbarFunc from "./overrides/muiToolbar";
import typography from "./typography";
import palette from "./palette";

let theme = null;

const muiTheme = uiKitTheme => {

  switch (uiKitTheme) {
    case "dawn":
      theme = dawnTheme;
      break;
    case "wicked":
      theme = wickedTheme;
      break;
    default:
      theme = dawnTheme;
      break;
  }

  const paletteTheme = palette(theme);
  const typographyTheme = typography(paletteTheme, theme);
  const muiAppBar = muiAppBarFunc(theme);
  const muiToolbar = muiToolbarFunc(theme);

  const muiCreatedTheme = createMuiTheme({
    shadows: Array(25).fill("none"),
    palette: paletteTheme,
    typography: typographyTheme,
    shape: {
      borderRadius: 0
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 720,
        lg: 840,
        xl: 1990
      }
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

  muiCreatedTheme.spacing = { ...muiTheme.spacing, ...theme.spacing};

  return Object.assign({}, muiCreatedTheme, { hv: theme });
};

const defaultTheme = muiTheme();

export { muiTheme as themeBuilder };
export default defaultTheme;
