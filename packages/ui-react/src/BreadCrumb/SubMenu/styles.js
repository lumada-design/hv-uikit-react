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
  menuItem: {
    display: "flex",
    alignItems: "center",
    height: "32px",
    fontFamily: theme.typography.fontFamily,
    color: `${theme.hv.palette.accent.acce1}`,
    textAlign: "left",
    fontSize: "12px",
    textTransform: "capitalize",
    maxWidth: "170px",
    padding: `0 ${theme.hv.spacing.xs}px`,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&:hover": {
      background: `${theme.hv.palette.atmosphere.atmo4}`
    }
  },
  menuList: {
    border: `solid 1px ${theme.hv.palette.accent.acce2}`,
    padding: `${theme.hv.spacing.sm}px`,
    position: "absolute",
    whiteSpace: "nowrap",
    backgroundColor: `${theme.hv.palette.atmosphere.atmo1}`,
    top: 32,
    zIndex: -1
  },
  iconSelected: {
    border: `solid 1px ${theme.hv.palette.accent.acce2}`,
    backgroundColor: `${theme.hv.palette.atmosphere.atmo1}`,
    borderBottom: "none"
  }
});

export default styles;
