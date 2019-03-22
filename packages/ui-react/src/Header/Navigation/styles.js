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
  menu: {
    display: "flex",
    flex: 1,
    justifyContent: "left",
    "& > a, > div": {
      paddingRight: `${theme.spacing.xs}px`
    },
    "& > a:last-child, > div:last-child": {
      paddingRight: "0px"
    }
  },
  "@media (max-width: 1120px)": {
    menu: {
      display: "none"
    }
  },
  listItem: {
    position: "relative",
    width: "unset",
    maxWidth: "170px",
    padding: `0 ${theme.spacing.xs}px 0 ${theme.spacing.xs}px`,
    "&:focus": {
      backgroundColor: theme.palette.common.white
    }
  },
  listItemText: {
    color: theme.palette.text.main,
    textTransform: "capitalize",
    padding: 0
  },
  label: {
    color: theme.palette.text.main,
    fontSize: "14px",
    letterSpacing: "0.02em",
    lineHeight: "32px"
  },
  selected: {
    "& p": {
      fontWeight: "bold",
      color: theme.hv.palette.accent.acce3
    }
  },
  selector: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: -7,
    left: 0,
    borderTop: `4px solid ${theme.hv.palette.accent.acce3}`
  }
});

export default styles;
