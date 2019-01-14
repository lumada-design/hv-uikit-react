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
  user: {
    position: "absolute",
    textAlign: "right",
    right: 20
  },
  userInfo: {
    float: "left",
    marginTop: 12,
    marginRight: 10,
    "& p": {
      color: theme.palette.text.main
    }
  },
  userName: {
    color: theme.palette.text.main,
    textTransform: "capitalize",
    fontSize: "15px",
    fontWeight: "400",
    lineHeight: "16px"
  },
  userRole: {
    color: theme.palette.text.secondary,
    textTransform: "capitalize",
    fontSize: "13px",
    fontWeight: "400",
    lineHeight: "16px"
  },
  userButton: {
    color: theme.palette.text.main,
    width: 50,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  userIcon: {
    fontSize: 35,
    position: "relative",
    background: "white"
  },
  dropdown: {
    border: `solid 2px ${theme.palette.grey.passive}`,
    borderBottom: "none",
    bottom: "-1px"
  },
  menuList: {
    border: `solid 2px ${theme.palette.grey.passive}`,
    padding: `${theme.spacing.xs}px`,
    position: "absolute",
    whiteSpace: "nowrap",
    top: 48,
    right: 5,
    zIndex: "-1"
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
