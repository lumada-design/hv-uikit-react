/**
 * Copyright (c) 2019 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

const styles = theme => ({
  root: {
    background: "transparent",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center"
  },

  container: {
    maxWidth: "670px",
    display: "flex",
    alignItems: "center"
  },

  iconContainer: {
    height: "120px",
    width: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  textContainer: {
    background: "transparent",
    maxWidth: "510px",
    overflow: "hidden",
    marginLeft: `${theme.hv.spacing.lg}px`
  },
  title: {
    ...theme.typography.h4,
  },
  message: {
    ...theme.typography.body1,
    marginTop: `${theme.hv.spacing.xs}px`,
  }
});

export default styles;
