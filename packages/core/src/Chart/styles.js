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
  root: {
    padding: "40px",
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  },
  titleContainer: {
    backgroundColor: theme.hv.palette.atmosphere.atmo1
  },
  subtitle: {
    marginTop: `${theme.hv.spacing.xs}px`
  },
  defaultColors: {
    ...theme.hv.viz.palette.categorical
  },
  vizText: {
    ...theme.hv.typography.vizText,
    fontFamily: theme.hv.typography.fontFamily,
    fontSize: 10
  },
  lineColor: theme.hv.palette.atmosphere.atmo6,
  gridColor: theme.hv.palette.atmosphere.atmo5,
  paddingTop: {
    paddingTop: "20px"
  },
  plotColor: theme.hv.palette.atmosphere.atmo1
});

export default styles;
