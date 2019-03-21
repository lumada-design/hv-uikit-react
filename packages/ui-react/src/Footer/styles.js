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
    position: "fixed",
    width: "100%",
    height: 40,
    backgroundColor: theme.hv.palette.accent.acce1,
    [theme.breakpoints.down("500")]: {
      minWidth: "320px"
    }
  },
  labelLeft: {
    float: "left",
    marginTop: 10,
    marginLeft: 20,
    fontSize: "16px",
    letterSpacing: "0.02em",
    lineHeight: `${theme.hv.spacing.sm}px`,
    fontWeight: "600",
    color: theme.hv.palette.atmosphere.atmo3,
    [theme.breakpoints.down("500")]: {
      display: "none"
    }
  },
  labelRight: {
    float: "right",
    marginTop: 12,
    marginRight: 20,
    fontSize: "12px",
    letterSpacing: "0.02em",
    lineHeight: "16px",
    fontWeight: "400",
    color: theme.hv.palette.atmosphere.atmo3,
    [theme.breakpoints.down("500")]: {
      minWidth: "320px",
      float: "left",
      marginLeft: 20,
      fontSize: "11px"
    }
  }
});

export default styles;
