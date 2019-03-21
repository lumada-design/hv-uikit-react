/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import createPalette from "@material-ui/core/styles/createPalette";
import theme from "@hv-ui/themes/dist/theme";

const palette = createPalette({
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
    default: theme.palette.atmosphere.atmo2,
  }
});

export default palette;
