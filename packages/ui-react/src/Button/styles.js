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
    padding: "0 10px",
    cursor: "pointer",
    height: "32px",
    fontWeight: theme.hv.typography.buttonText.fontWeight,
    letterSpacing: theme.hv.typography.buttonText.letterSpacing
  },
  containedPrimary: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.light
    },
    "&:active": {
      backgroundColor: theme.palette.primary.main
    },
    "&$disabled": {
      backgroundColor: theme.palette.grey.clear,
      color: theme.palette.grey.passive,
      cursor: "not-allowed",
      pointerEvents: "auto"
    },
    "&$disabled&:hover": {
      backgroundColor: theme.palette.grey.clear,
      color: theme.palette.grey.passive,
      cursor: "not-allowed",
      pointerEvents: "auto"
    }
  },
  outlinedPrimary: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.grey.inspire,
    border: `1px solid ${theme.palette.grey.plain}`,
    "&:hover": {
      backgroundColor: theme.palette.grey.rainy,
      border: `1px solid ${theme.palette.grey.plain}`,
    },
    "&:active": {
      backgroundColor: theme.palette.common.white
    },
    "&$disabled": {
      backgroundColor: theme.palette.grey.clear,
      color: theme.palette.grey.passive,
      border: "none",
      cursor: "not-allowed",
      pointerEvents: "auto"
    },
    "&$disabled&:hover": {
      backgroundColor: theme.palette.grey.clear,
      color: theme.palette.grey.passive,
      border: "none",
      cursor: "not-allowed",
      pointerEvents: "auto"
    } 
  },
  textPrimary: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.grey.foggy,
    },
    "&:active": {
      backgroundColor: theme.palette.common.white
    },
    "&$disabled": {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.grey.passive,
      border: "none",
      cursor: "not-allowed",
      pointerEvents: "auto"
    },
    "&$disabled&:hover": {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.grey.passive,
      border: "none",
      cursor: "not-allowed",
      pointerEvents: "auto"
    }
  },
  disabled: {
    backgroundColor: theme.palette.grey.clear,
    color: theme.palette.grey.passive,
    cursor: "not-allowed",
  }
});

export default styles;
