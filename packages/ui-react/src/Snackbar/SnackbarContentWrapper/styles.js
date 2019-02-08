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
    width: "310px",
    minHeight: "52px",
    maxHeight: "92px",
    padding: 0,
    overflow: "hidden"
  },
  success: {
    backgroundColor: theme.palette.severity.success
  },
  error: {
    backgroundColor: theme.palette.severity.error
  },
  warning: {
    backgroundColor: theme.palette.severity.critical
  },
  info: {
    backgroundColor: theme.palette.severity.warning
  },
  default: {
    backgroundColor: "#D0E1F6"
  },
  iconVariant: {
    marginLeft: "10px",
    maxWidth: "32px",
    maxHeight: "32px",
    minWidth: "32px",
    minHeight: "32px",
    alignSelf: "start"
  },
  message: {
    padding: 0
  },
  messageText: {
    ...theme.typography.body1,
    wordBreak: "break-all",
    maxHeight: "80px",
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical"
  },
  messageWithoutIcon: {
    paddingLeft: "20px"
  },
  messageWithoutAction: {
    paddingRight: "20px"
  },
  action: {
    marginRight: "20px",
    marginLeft: "10px",
    paddingLeft: "0px",
    minWidth: "fit-content"
  },
  messageSpan: {
    display: "flex",
    alignItems: "center",
    margin: "10px 0"
  }
});

export default styles;
