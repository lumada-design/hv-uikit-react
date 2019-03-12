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
  icon: {
    border: `solid 1px transparent`
  },
  iconSelected: {
    border: `solid 1px ${theme.palette.grey.passive}`,
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
    border: `solid 1px ${theme.palette.grey.passive}`,
    padding: `${theme.spacing.xs}px`,
    position: "absolute",
    whiteSpace: "nowrap",
    backgroundColor: `${theme.palette.common.white}`,
    top: 31,
    right: -1,
    zIndex: "-1"
  }
});

export default styles;
