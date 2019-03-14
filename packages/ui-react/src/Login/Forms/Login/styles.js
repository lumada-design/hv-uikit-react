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
    position: "absolute",
    width: "310px",
    height: "calc(100% - 50px)",
    margin: 0,
    padding: 0,
    top: 50
  },
  title: {
    display: "flex",
    position: "relative",
    width: "310px",
    zIndex: 1,
    margin: "60px 0 20px",
    overflow: "auto"
  },
  h3: {
    margin: "0px"
  },
  inputUser: {
    position: "relative",
    top: "-20px"
  },
  inputPassword: {
    position: "relative",
    marginTop: "-10px",
    top: "-50px"
  },
  button: {
    width: "120px",
    float: "right",
    position: "relative"
  },
  buttonsContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px"
  },
  buttonsContainerWithRemember: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px"
  },
  separator: {
    width: "20px"
    //  display: "block",
    // float: "right",
    // position: "relative"
  },
  forgotCredentials: {
    marginTop: "60px",
    display: "flex",
    justifyContent: "center"
  },
  checkBoxTypography: {
    color: theme.typography.body2.color,
    fontSize: theme.typography.body2.fontSize,
    letterSpacing: theme.typography.body2.letterSpacing,
    lineHeight: theme.typography.body2.lineHeight,
    fontWeight: theme.typography.body2.fontWeight
  },

  linkButtonTypography: {
    fontSize: theme.typography.body2.fontSize
  },
  showMessage: {
    backgroundColor: theme.palette.severity.error,
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingRight: "10px"
  },
  icon: {
    margin: "0 10px",
    maxWidth: "32px",
    maxHeight: "32px",
    minWidth: "32px",
    minHeight: "32px"
  },
  errorMessageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "static",
    height: "52px"
  }
});

export default styles;
