/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import MoreVert from "./images/MoreVert.svg";
import MoreVertActive from "./images/MoreVertActive.svg";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    "&:hover": {
      background: `url(${MoreVertActive}) ${
        theme.palette.grey.inspire
      } no-repeat center`,
      cursor: "pointer"
    },
    background: `url(${MoreVert}) no-repeat center`
  },
  active: {
    background: `url(${MoreVertActive}) ${
      theme.palette.grey.inspire
    } no-repeat center`
  }
});

export default styles;
