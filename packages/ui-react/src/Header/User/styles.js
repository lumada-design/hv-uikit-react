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
  userContainer: {
    paddingLeft: `${theme.hv.spacing.lg}px`,
    height: "100%",
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    marginLeft: "auto"
  },
  userContainerPointer: {
    cursor: "pointer"
  },
  iconContainer: {
    display: "inherit",
    maxHeight: "46px"
  },
  iconContainerHover: {
    "&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo4
    }
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",

    marginRight: `${theme.hv.spacing.xs}px`,
    "& p": {
      color: theme.palette.text.main
    }
  },
  userRole: {
    ...theme.hv.typography.vizText
  }
});

export default styles;
