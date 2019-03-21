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
  mediaContainer: {
    width: "100%",
    paddingBottom: `${theme.hv.spacing.sm}px`,
    borderLeft: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
    borderRight: `1px solid ${theme.hv.palette.atmosphere.atmo6}`
  },
  media: {
    height: "100%",
    width: "100%",
  }
});

export default styles;
