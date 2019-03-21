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
    maxWidth: 310,
    minWidth: 310,
    background: theme.palette.common.white,
    border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
    "&:hover": {
      border: `1px solid ${theme.hv.palette.accent.acce1}`
    }
  },
  rootActive: {
    border: `1px solid ${theme.hv.palette.accent.acce1}`
  },
  rootDisabled: {
    border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
    background: theme.hv.palette.atmosphere.atmo4,
    "&:hover": {
      border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`
    }
  },
  label: {
    ...theme.typography.subtitle2,
    marginBottom: `${theme.spacing.xs}px`
  },
  header: {
    position: "relative",
    height: 32,
    cursor: "pointer",
    userSelect: "none"
  },
  selection: {
    ...theme.typography.body1,
    padding: `0 ${theme.spacing.md}px 0 ${theme.spacing.xs}px`,
    lineHeight: "32px",
    pointerEvents: "none"
  },
  arrow: {
    position: "absolute",
    pointerEvents: "none",
    top: 0,
    right: 0
  },
  headerDisabled: {
    "&:hover": {
      cursor: "not-allowed"
    }
  },
  list: {
    position: "absolute",
    left: -1,
    maxWidth: 310,
    minWidth: 310,
    background: theme.palette.common.white,
    border: `1px solid ${theme.hv.palette.accent.acce1}`,
    borderTop: "none",
    zIndex: 1000
  },
  listClosed: {
    display: "none"
  },
  listOpen: {
    display: "block"
  },
  icon: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "32px",
    height: "32px",
    cursor: "pointer"
  },
  truncate: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
});

export default styles;
