import { MuiThemeProvider } from "@material-ui/core";

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
    backgroundColor: theme.hv.palette.atmosphere.atmo2
  },
  mainContainer:  {
    display: "flex",
    backgroundColor: theme.hv.palette.atmosphere.atmo3
  },
  navContainer: {
    maxWidth: "200px",
    paddingTop: `${theme.hv.spacing.md}px`
  },
  componentContainer: {
    width: "100%",
    maxHeight: "400px",
    overflowY: "auto",
    padding: `${theme.hv.spacing.md}px`
  },
  title: {
    ...theme.hv.typography.xlargeTitle,
    padding: `${theme.hv.spacing.sm}px 0`
  },
  groupTitle: {
    ...theme.hv.typography.mediumTitle
  },
  footer: {
    padding: `${theme.hv.spacing.sm}px`,
    textAlign: "right"
  }
});

export default styles;
