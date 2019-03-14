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
  root: {
    flex: 1,
    display: "flex",
    width: "100%",
    minHeight: 580,
    background: `0 / cover fixed`,
    justifyContent: "flex-end"
  },
  rightContainer: {
    width: "30%",
    minWidth: "380px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("500")]: {
      minWidth: "320px",
      width: "100%"
    }
  },
  formContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    height: "100%",
    background: "rgba(255,255,255,0.9)",
    "&:before": {
      zIndex: "-1",
      content: '""',
      width: "100%",
      height: "100%",
      position: "relative",
      filter: "blur(2px)"
    }
  }
});

export default styles;
