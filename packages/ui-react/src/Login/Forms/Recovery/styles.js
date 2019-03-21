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
    height: "100%",
    margin: 0,
    padding: 0
  },
  title: {
    display: "flex",
    position: "relative",
    width: "100%",
    zIndex: 1,
    marginTop: `${theme.hv.spacing.lg}px`,
    justifyContent: "center"
  },
  instructions: {
    position: "relative",
    margin: "0px",
    textAlign: "center"
  },
  input: {
    position: "relative",
    paddingTop: "100px"
  },
  cancelButton: {
    position: "relative",
    width: "120px"
  },
  submitButton: {
    position: "relative",
    width: "120px",
    float: "right"
  },
  buttonsContainer: {
    position: "relative",
    display: "inherit",
    alignItems: "center",
    marginTop: `${theme.hv.spacing.sm}px`
  },
  buttonsContainerError: {
    position: "relative",
    display: "inherit",
    alignItems: "center",
    marginTop: "4px"
  },
  showOkMessage: {
    backgroundColor: theme.hv.palette.semantic.sema1_200,
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingRight: `${theme.hv.spacing.xs}px`
  },
  iconError: {
    margin: `0 ${theme.hv.spacing.xs}px`,
    maxWidth: "32px",
    maxHeight: "32px",
    minWidth: "32px",
    minHeight: "32px"
  },
  messageContainer: {
    top: `${theme.hv.spacing.sm}px`,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "52px"
  }
});

export default styles;
