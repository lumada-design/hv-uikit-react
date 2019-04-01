/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const styles = theme => ({
  kpiContainer:{
    width: "100%",
    height: "100%"
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
    marginRight: `${theme.hv.spacing.xs}px`
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
    ...theme.hv.typography.vizText
  },
  titleText: {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.subtitle2
  }
});

export default styles;
