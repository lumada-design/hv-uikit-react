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
  settings: {
    position: "absolute",
    textAlign: "right",
    right: 10
  },
  settingsButton: {
    boxSizing: "content-box",
    color: theme.palette.text.main,
    width: 50,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  settingsIcon: {
    fontSize: 35,
    border: `solid 2px transparent`,
    borderBottomWidth: "0px",
    position: "relative",
    background: `${theme.palette.common.white}`
  },
  dropdown: {
    border: `solid 2px ${theme.palette.grey.passive}`,
    borderBottomWidth: "0px",
    zIndex: "999"
  },
  menuList: {
    border: `solid 2px ${theme.palette.grey.passive}`,
    padding: `${theme.spacing.xs}px`,
    position: "absolute",
    whiteSpace: "nowrap",
    backgroundColor: `${theme.palette.common.white}`,
    top: 47,
    right: 17,
    zIndex: "998"
  },
  menuItem: {
    display: "block",
    padding: `${theme.spacing.xs}px`,
    fontFamily: theme.typography.fontFamily,
    color: `${theme.palette.secondary.main}`,
    textAlign: "left",
    fontSize: "15px",
    textTransform: "capitalize",
    "&:hover": {
      background: `${theme.palette.grey.clear}`
    }
  }
});

export default styles;
