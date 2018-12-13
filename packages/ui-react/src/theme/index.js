/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import { createMuiTheme } from "@material-ui/core/styles";
import theme from "@hv-ui/themes/dist/theme.json";
import muiAppBar from "./overrides/muiAppBar";
import muiInput from "./overrides/muiInput";
import muiInputAdornment from "./overrides/muiInputAdornment";
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
    MuiInput: {
      root: muiInput.root,
      inputType: muiInput.inputType
    },
    MuiInputAdornment: {
      root: muiInputAdornment.root,
      positionStart: muiInputAdornment.positionStart,
      positionEnd: muiInputAdornment.positionEnd
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
