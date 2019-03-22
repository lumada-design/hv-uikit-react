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
    backgroundColor: theme.hv.palette.semantic.sema8
  },
  error: {
    backgroundColor: theme.hv.palette.semantic.sema9
  },
  default: {
    backgroundColor: theme.hv.palette.semantic.sema7
  },
  iconVariant: {
    marginLeft: `${theme.hv.spacing.xs}px`,
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
    paddingLeft: `${theme.hv.spacing.sm}px`
  },
  messageWithoutAction: {
    paddingRight: `${theme.hv.spacing.sm}px`
  },
  action: {
    marginRight: `${theme.hv.spacing.sm}px`,
    marginLeft: `${theme.hv.spacing.xs}px`,
    paddingLeft: "0px",
    minWidth: "fit-content"
  },
  messageSpan: {
    display: "flex",
    alignItems: "center",
    margin: `${theme.hv.spacing.xs}px 0`
  }
});

export default styles;
