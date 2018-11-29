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

const muiToolbar = {
  root: {
    alignItems: "center",
    "@media (min-width: 600px)": {
      minHeight: "46px"
    }
  },
  gutters: {
    paddingLeft: `${theme.spacing.sm}px`,
    paddingRight: `${theme.spacing.sm}px`,
    "@media (min-width:600px)": {
      paddingLeft: `${theme.spacing.sm}px`,
      paddingRight: `${theme.spacing.sm}px`,
    }
  },
  dense: {
    minHeight: "46px"
  }
};

export default muiToolbar;
