/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

const styles = theme => ({
  paper: {
    border: "solid 1px #BCBCBC",
    padding: "10px"
  },
  moreVertContainer: {
    height: "100%"
  },
  moreVertBtn: {
    width: "100%",
    height: "100%",
    minWidth: "32px",
    "&:hover": {
      background: "#414141",
      color: "#FFF"
    }
  },
  activated: {
    background: "#414141",
    color: "#FFF"
  },
  actionBtn: {
    display: "block",
    width: "100%",
    color: "#1273D7",
    textAlign:"Left",
    textTransform:"capitalize"
  }
});

export default styles;
