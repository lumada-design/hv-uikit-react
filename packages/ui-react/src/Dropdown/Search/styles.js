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
    position: "relative",
    background: theme.hv.palette.atmosphere.atmo2,
    borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo5}`,
    height: 30,
    marginTop: 20
  },
  input: {
    border: "none",
    width: "100%",
    height: 30,
    padding: `5px ${theme.spacing.md}px 5px 5px`,
    background: "transparent",
    "&:focus": {
      outline: "none"
    },
    ...theme.typography.body1
  },
  icon: {
    position: "absolute",
    right: 0,
    width: "32px",
    height: "32px"
  }
});

export default styles;
