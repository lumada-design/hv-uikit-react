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
    padding: `${theme.spacing.sm}px`,
    borderLeft: `1px solid ${theme.palette.grey.plain}`,
    borderRight: `1px solid ${theme.palette.grey.plain}`
  },
  bottomBorder: {
    borderBottom: `1px solid ${theme.palette.grey.plain}`
  },
  title: {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.h3
  },
  subheader: {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.body1,
    paddingTop: `${theme.spacing.sm}px`
  },
  action: {
    marginTop: 0,
    marginRight: "-1px",
    paddingLeft: `${theme.spacing.xs}px`
  },
  icon: {
    fontSize: "32px",
    margin: `${theme.spacing.xs}px`
  },
  info: {
    color: theme.palette.status.success
  },
  warning: {
    color: theme.palette.status.warning
  },
  critical: {
    color: theme.palette.status.error
  }
});

export default styles;
