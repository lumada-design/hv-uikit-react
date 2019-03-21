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
  root:{
    position: "relative",
    zIndex: 10
  },
  icon: {
    boxSizing: "content-box",
    border: `solid 1px transparent`,
    borderBottom: "none"
  },
  iconSelected: {
    border: `solid 1px ${theme.hv.palette.atmosphere.atmo7}`,
    backgroundColor: `${theme.palette.common.white}`,
    borderBottom: "none"
  },
  iconButton: {
    boxSizing: "content-box",
    color: theme.palette.text.main,
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  menuList: {
    border: `solid 1px ${theme.hv.palette.atmosphere.atmo7}`,
    padding: `${theme.hv.spacing.xs}px`,
    position: "absolute",
    whiteSpace: "nowrap",
    backgroundColor: `${theme.palette.common.white}`,
    top: 32,
    zIndex:-1
  },
  right: { justifyContent: "flex-start" },
  center: { justifyContent: "center" },
  left: { justifyContent: "flex-end"},
  rightPx: { left:"0px" },
  leftPx: {  right:"0px" }
});

export default styles;
