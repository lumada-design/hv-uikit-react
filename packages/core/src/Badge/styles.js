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
    position: "relative",
    "&>*": { float: "left" }
  },
  badgeContainer: {
    width: 0
  },
  badge: {
    borderRadius: `${theme.hv.spacing.xs}px`,
    backgroundColor: theme.hv.palette.accent.acce1,
    float: "left",
    minHeight: "6px",
    minWidth: "6px"
  },
  badgeIcon: {
    position: "relative",
    top: "1px",
    left: "-7px"
  },
  showCount: {
    ...theme.hv.typography.labelText,
    fontFamily: theme.hv.typography.fontFamily,
    padding: "0 5px",
    maxWidth: 30,
    color: theme.hv.palette.atmosphere.atmo1
  },
  badgeOneDigit: {
    padding: 0,
    width: "16px",
    textAlign: "center"
  },
});

export default styles;
