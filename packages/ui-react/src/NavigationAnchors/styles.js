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
  drawerPaper: {
    width: 200,
    marginLeft: `${theme.hv.spacing.xs}px`,
    background: "none",
    borderRight: "none"
  },
  drawerPaperPositionInherit: {
    position: "inherit"
  }
  ,
  listRoot: {
    borderLeft: `1px solid ${theme.hv.palette.atmosphere.atmo6}`
  },
  listDense: {
    paddingTop: 0,
    paddingBottom: 0
  },
  listItemRoot: {
    height: 32,
    background: "none",
    "&:hover": {
      background: "none"
    },
    "&$listItemSelected": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo3}`
    },
    "&$listItemSelected:hover": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo3}`
    }
  },
  listItemGutters: {
    "@media (min-width: 600px)": {
      paddingLeft: `${theme.hv.spacing.xs}px`
    }
  },
  listItemSelected: {
    left: "-1px",
    borderLeft: `4px solid ${theme.hv.palette.accent.acce1}`,
    "@media (min-width: 600px)": {
      paddingLeft: 7
    }
  },
  listItemTextDense: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: "inherit"
  },
  listItemTextSelected: {
    fontWeight: 600
  }
});

export default styles;
