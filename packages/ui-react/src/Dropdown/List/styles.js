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
    margin: `${theme.spacing.xs}px 0 0 ${theme.spacing.sm}px`
  },
  list: {
    maxHeight: 320,
    overflow: "auto"
  },
  hidden: {
    display: "none"
  },
  selection: {
    width: "100%",
    userSelect: "none",
    cursor: "pointer"
  },
  singleSelection: {
    padding: `6px ${theme.spacing.xs}px`,
    ...theme.typography.body1,
    cursor: "pointer",
    "&:hover": {
      background: theme.hv.palette.atmosphere.atmo4
    }
  },
  multiSelection: {
    cursor: "pointer"
  },
  selected: {
    background: theme.hv.palette.accent.acce1,
    color: theme.palette.common.white,
    "&:hover": {
      background: theme.hv.palette.accent.acce1,
      color: theme.palette.common.white
    }
  },
  truncate: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  result: {
    display: "block"
  },
  selectAll: {
    margin: `${theme.spacing.xs}px 0 ${theme.spacing.xs}px 0`,
    "& > span": {
      ...theme.typography.subtitle1
    }
  },
  actions: {
    textAlign: "right",
    margin: `${theme.spacing.sm}px ${theme.spacing.sm}px ${
      theme.spacing.sm
    }px 0`
  },
  paddingRight: {
    paddingRight: `${theme.spacing.sm}px`
  },
  marginBottom: {
    marginBottom: `${theme.spacing.sm}px`
  }
});

export default styles;
