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
import muiAppBar from "./overrides/muiAppBar";
import muiToolbar from "./overrides/muiToolbar";
import createTypography from "./typography";
import createPalette from "./palette";
import createSpacing from "./spacing";

const getTheme = uiKitTheme => {
  switch (uiKitTheme) {
    default:
    case "dawn":
      return dawnTheme;
    case "wicked":
      return wickedTheme;
  }
};

const hvTheme = uiKitTheme => {
  const theme = getTheme(uiKitTheme);

  const themeSpacing = createSpacing(theme);
  const themePalette = createPalette(theme);
  const themeTypography = createTypography(themePalette, theme);
  const muiAppBarOverride = muiAppBar(theme);
  const muiToolbarOverride = muiToolbar(theme);

  return createMuiTheme({
    shadows: Array(25).fill("none"),
    spacing: themeSpacing,
    palette: themePalette,
    typography: themeTypography,
    shape: {
      borderRadius: 0
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1270,
        xl: 1920
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
        ...muiAppBarOverride
      },
      MuiToolbar: {
        ...muiToolbarOverride
      }
    },
    hv: theme
  });
};

const defaultTheme = hvTheme();

export { hvTheme as themeBuilder };
export default defaultTheme;
