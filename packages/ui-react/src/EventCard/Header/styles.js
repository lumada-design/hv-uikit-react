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
    padding: `${theme.spacing.sm}px`
  },
  title: theme.hv.typography.mediumTitle,
  subheader: theme.hv.typography.normalText,
  icon: {
    fontSize: "32px",
    margin: "10px"
  },
  info: {
    color: theme.palette.status.success
  },
  warning: {
    color: theme.palette.status.alert
  },
  critical: {
    color: theme.palette.status.error
  }
});

export default styles;
