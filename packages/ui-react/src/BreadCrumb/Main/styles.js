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
    display: "flex",
    alignItems: "center",
    marginTop: `${theme.hv.spacing.xs}px`,
    marginLeft: `${theme.hv.spacing.md}px`,
    zIndex: 0
  },
  centerContainer: {
    display: "flex",
    alignItems: "center"
  },
  link: {
    textDecoration: "none",
    color: theme.hv.palette.accent.acce2,
    fontSize: "12px",
    maxWidth: "170px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&:hover": {
      textDecoration: "none",
      color: theme.hv.palette.accent.acce2h
    }
  },
  iconContainer: {
    display: "inherit"
  },
  separator: {
    margin: "0 -4px",
    display: "inherit"
  }
});

export default styles;
