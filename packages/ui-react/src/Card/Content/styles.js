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
    borderLeft: `1px solid ${theme.palette.grey.plain}`,
    borderRight: `1px solid ${theme.palette.grey.plain}`,
    padding: `0 ${theme.spacing.sm}px ${theme.spacing.sm}px ${theme.spacing.sm}px`
  },
  bottomBorder: {
    borderBottom: `1px solid ${theme.palette.grey.plain}`
  },
  item: {
    padding: `0 0 ${theme.spacing.sm}px 0`
  }
});

export default styles;
