/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */
import close from "./assets/Close-16.svg";
import success from "./assets/Level0-success-16-color.svg";
import unsuccess from "./assets/Level5-unsuccess-16-color.svg";

const styles = theme => ({
  container: {
    minWidth: "150px",
    maxWidth: "610px"
  },
  inputRoot: {
    margin: "0",
    height: "32px",
    width: "100%",
    background: theme.palette.common.white,
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: theme.palette.grey.plain,
    "&:hover": {
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: theme.palette.grey.inspire,
      background: theme.palette.common.white
    }
  },
  inputRootDisabled: {
    margin: "0",
    height: "32px",
    width: "100%",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: theme.palette.grey.plain,
    background: theme.palette.grey.smokey,
    "&:hover": {
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: theme.palette.grey.plain,
      background: theme.palette.grey.smokey,
      cursor: "not-allowed"
    },
    cursor: "not-allowed"
  },
  inputRootFocused: {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: theme.palette.grey.inspire,
    background: theme.palette.common.white,
    "&:hover": {
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: theme.palette.grey.inspire,
      background: theme.palette.common.white
    }
  },
  input: {
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "10px",
    marginRight: "10px",
    height: "19px",
    fontWeight: theme.typography.body1.fontWeight,
    letterSpacing: theme.typography.body1.letterSpacing,
    color: theme.typography.body1.color,
    fontSize: theme.typography.body1.fontSize,
    lineHeight: theme.typography.body1.lineHeight,
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&::placeholder": {
      fontWeight: theme.typography.disabled.fontWeight,
      letterSpacing: theme.typography.disabled.letterSpacing,
      color: theme.typography.disabled.color,
      fontSize: theme.typography.disabled.fontSize,
      lineHeight: theme.typography.disabled.lineHeight
    }
  },
  inputDisabled: {
    cursor: "not-allowed"
  },
  label: {
    paddingTop: "30px",
    paddingBottom: "10px",
    display: "block",
    fontWeight: theme.typography.subtitle2.fontWeight,
    letterSpacing: theme.typography.subtitle2.letterSpacing,
    color: theme.typography.subtitle2.color,
    fontSize: theme.typography.subtitle2.fontSize,
    lineHeight: theme.typography.subtitle2.lineHeight
  },
  infoText: {
    paddingTop: "10px",
    paddingBottom: "30px",
    display: "block",
    fontWeight: theme.typography.disabled.fontWeight,
    letterSpacing: theme.typography.disabled.letterSpacing,
    color: theme.typography.disabled.color,
    fontSize: theme.typography.disabled.fontSize,
    lineHeight: theme.typography.disabled.lineHeight
  },
  warningInfoText: {
    paddingTop: "10px",
    paddingBottom: "30px",
    display: "block",
    fontWeight: theme.typography.disabled.fontWeight,
    letterSpacing: theme.typography.disabled.letterSpacing,
    color: theme.palette.status.error,
    fontSize: theme.typography.disabled.fontSize,
    lineHeight: theme.typography.disabled.lineHeight
  },
  icon: {
    width: "16px",
    height: "16px",
    margin: "8px"
  },
  iconContainer: {
    width: "32px",
    height: "32px"
  },
  iconClear: {
    background: `url(${close})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    cursor: "pointer"
  },
  iconValid: {
    background: `url(${success})`
  },
  iconInvalid: {
    background: `url(${unsuccess})`
  },
  "@global": {
    "input:-webkit-autofill": {
      "-webkit-box-shadow": "0 0 0px 1000px white inset",
      height: 16
    }
  }
});

export default styles;
