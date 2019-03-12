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
  root: {
    flexGrow: 1
  },
  tabsRoot: {
    borderBottom: `1px solid ${theme.palette.grey.rainy}`
  },
  tabsIndicator: {
    backgroundColor: "#1890ff"
  },
  tabRoot: {
    textTransform: "initial",
    marginRight: theme.spacing.unit * 4,
    "&:hover": {
      opacity: 1
    },
    "&$tabSelected": {
    },
    "&:focus": {
    }
  },
  tabSelected: {}
});

export default styles;
