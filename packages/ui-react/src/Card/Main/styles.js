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
  info: {
    borderTop: `4px solid ${theme.palette.status.success}`
  },
  warning: {
    borderTop: `4px solid ${theme.palette.status.warning}`
  },
  error: {
    borderTop: `4px solid ${theme.palette.status.error}`
  },
  none: {
    borderTop: `1px solid ${theme.palette.grey.plain}`
  }
});

export default styles;
