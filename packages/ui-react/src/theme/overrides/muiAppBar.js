/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import theme from "@hv-ui/themes/dist/theme";
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
