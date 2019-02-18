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
  kpiContainer:{
    width: "100%",
    height: "100%",
    float: "left"
  },
  indicatorsContainer:{
    display: "inline-flex",
    paddingTop: `${theme.spacing.sm}px`
  },
  indicatorUnit: {
    alignSelf: "flex-end",
    paddingBottom: "3px"
  },
  spacingToTheRight: {
    paddingRight: `${theme.spacing.xs}px`
  },
  comparisons:{
    float: "left"
  },
  infoText: {
    ...theme.typography.visualization
  }
});

export default styles;
