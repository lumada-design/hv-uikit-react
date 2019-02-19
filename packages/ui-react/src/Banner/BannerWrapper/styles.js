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
    minWidth: "100%",
    position: "relative",
    display: "flex",
    flexWrap: "nowrap"
  },
  baseVariant: {
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
    marginLeft: `${theme.spacing.xs}px`,
    marginRight: "5px",
    maxWidth: "32px",
    maxHeight: "32px",
    minWidth: "32px",
    minHeight: "32px",
    alignSelf: "auto"
  },
  message: {
    ...theme.typography.body1,
    wordBreak: "break-all",
    maxHeight: "80px",
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical"
  },
  messageWithoutIcon: {
    paddingLeft: `${theme.spacing.sm}px`
  },
  messageWithoutAction: {
    paddingRight: `${theme.spacing.sm}px`
  },
  actionMessageContainer: {
    padding: `${theme.spacing.xs}px`,
    flex: "0 0 auto"
  },
  action: {
    padding: `${theme.spacing.xs}px ${theme.spacing.xs}px ${
      theme.spacing.xs
    }px  ${theme.spacing.sm}px`,
    flex: "0 0 auto"
  },
  actionContainer: {
    display: "flex",
    flexDirection: "column"
  },
  actionsInnerContainer: {
    flexDirection: "row",
    paddingRight: `${theme.spacing.xs}px`
  },
  messageSpan: {
    display: "flex",
    alignItems: "center"
  },
  outContainer: {
    width: "100%",
    position: "relative"
  },
  closeAction: {
    alignSelf: "flex-end"
  }
});

export default styles;
