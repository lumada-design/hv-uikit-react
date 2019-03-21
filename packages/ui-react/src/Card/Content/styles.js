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
  content: {
    borderLeft: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
    borderRight: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
    padding: `0 ${theme.hv.spacing.sm}px ${theme.hv.spacing.sm}px ${theme.hv.spacing.sm}px`
  },
  bottomBorder: {
    borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo6}`
  },
  item: {
    padding: `0 0 ${theme.hv.spacing.sm}px 0`
  }
});

export default styles;
