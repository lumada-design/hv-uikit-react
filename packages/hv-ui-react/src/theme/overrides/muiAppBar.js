/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import palette from "../palette";

const muiAppBar = {
  root: {
    borderTop: `4px solid ${palette.hitachi.main}`
  },
  colorDefault: {
    backgroundColor: palette.common.white,
    contrastText: palette.grey.inspire
  }
};

export default muiAppBar;
