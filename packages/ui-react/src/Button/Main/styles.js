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
    textTransform: "capitalize",
    "&:hover,&:focus": {},
    "&:active": {},
    minWidth: "70px",
    padding: `0 ${theme.hv.spacing.xs}px`,
    cursor: "pointer",
    height: "32px",
    minHeight: "32px",
    fontWeight: theme.typography.button.fontWeight,
    letterSpacing: theme.typography.button.letterSpacing
  },
  containedPrimary: {
    color: theme.palette.common.white,
    backgroundColor: theme.hv.palette.accent.acce2,
    "&:hover": {
      backgroundColor: theme.hv.palette.accent.acce2h
    },
    "&:active": {
      backgroundColor: theme.hv.palette.accent.acce2
    },
    "&$disabled": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      color: theme.hv.palette.atmosphere.atmo7,
      cursor: "not-allowed",
      pointerEvents: "auto"
    },
    "&$disabled&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      color: theme.hv.palette.atmosphere.atmo7,
      cursor: "not-allowed",
      pointerEvents: "auto"
    }
  },
  outlinedPrimary: {
    backgroundColor: theme.palette.common.white,
    color: theme.hv.palette.accent.acce1,
    border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
    "&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`
    },
    "&:active": {
      backgroundColor: theme.palette.common.white
    },
    "&$disabled": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      color: theme.hv.palette.atmosphere.atmo7,
      border: "none",
      cursor: "not-allowed",
      pointerEvents: "auto"
    },
    "&$disabled&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4,
      color: theme.hv.palette.atmosphere.atmo7,
      border: "none",
      cursor: "not-allowed",
      pointerEvents: "auto"
    }
  },
  textPrimary: {
    color: theme.hv.palette.accent.acce2,
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo3
    },
    "&:active": {
      backgroundColor: "transparent"
    },
    "&$disabled": {
      backgroundColor: "transparent",
      color: theme.hv.palette.atmosphere.atmo7,
      border: "none",
      cursor: "not-allowed",
      pointerEvents: "auto"
    },
    "&$disabled&:hover": {
      backgroundColor: "transparent",
      color: theme.hv.palette.atmosphere.atmo7,
      border: "none",
      cursor: "not-allowed",
      pointerEvents: "auto"
    }
  },
  disabled: {
    backgroundColor: theme.hv.palette.atmosphere.atmo4,
    color: theme.hv.palette.atmosphere.atmo7,
    cursor: "not-allowed"
  }
});

export default styles;
