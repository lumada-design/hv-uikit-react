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
  success: {
    borderTop: `4px solid ${theme.hv.palette.semantic.sema1}`
  },
  neutral: {
    borderTop: `4px solid ${theme.hv.palette.semantic.sema2}`
  },
  info: {
    borderTop: `4px solid ${theme.hv.palette.semantic.sema3}`
  },
  alert: {
    borderTop: `4px solid ${theme.hv.palette.semantic.sema4}`
  },
  warning: {
    borderTop: `4px solid ${theme.hv.palette.semantic.sema5}`
  },
  error: {
    borderTop: `4px solid ${theme.hv.palette.semantic.sema6}`
  },
  none: {
    borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo6}`
  }
});

export default styles;
