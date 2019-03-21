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
    padding: `${theme.hv.spacing.sm}px`,
    borderLeft: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
    borderRight: `1px solid ${theme.hv.palette.atmosphere.atmo6}`
  },
  bottomBorder: {
    borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo6}`
  },
  title: {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.h3
  },
  subheader: {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.body1,
    paddingTop: `${theme.hv.spacing.sm}px`
  },
  action: {
    marginTop: 0,
    marginRight: "-1px",
    paddingLeft: `${theme.hv.spacing.xs}px`
  }
});

export default styles;
