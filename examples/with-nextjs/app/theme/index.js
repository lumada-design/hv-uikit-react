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

const muiTheme = createMuiTheme({
  shadows: Array(25).fill("none"),
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiButton: {}
  }
});

export default muiTheme;
