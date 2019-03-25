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
  messageWithoutIcon: {
    paddingLeft: `${theme.hv.spacing.sm}px`
  },
  messageWithoutAction: {
    paddingRight: `${theme.hv.spacing.sm}px`
  },
  actionMessageContainer: {
    padding: `${theme.hv.spacing.xs}px`,
    flex: "0 0 auto"
  },
  messageSpan: {
    display: "flex",
    alignItems: "center"
  }
});

export default styles;
