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
  common: theme.palette.common,
  primary: {
    light: theme.palette.primary.light,
    main: theme.palette.primary.main
  },
  secondary: {
    light: theme.palette.secondary.light,
    main: theme.palette.secondary.main
  },
  hitachi: {
    light: theme.palette.hitachi.light,
    main: theme.palette.hitachi.main
  },
  status: theme.palette.status,
  support: theme.palette.support
});

palette.grey = { ...palette.grey, ...theme.palette.grey };

export default palette;
