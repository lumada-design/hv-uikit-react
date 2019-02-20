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
  visualIndicatorContainer: {
    height: "40px",
    backgroundColor: "transparent",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
  },
  comparisonContainer: {
    minHeight: "16px",
    display: "flex",
    alignItems: "flex-end",
  },
  visualComparisonContainer: {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.subtitle1
  },
  indicatorsContainer:{
    display: "inline-flex",
    minHeight: "16px",
    alignItems: "flex-end",
    marginTop: `9px`,
    marginBottom: `1px`
  },
  indicatorUnit: {
    alignSelf: "flex-end",
    paddingBottom: "3px",
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.body2
  },
  spacingToTheRight: {
    marginRight: `${theme.spacing.xs}px`
  },
  comparisons:{
    float: "left"
  },
  indicatorText: {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.h1
  },
  infoText: {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.visualization
  },
  titleText: {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.subtitle2
  }
});

export default styles;
