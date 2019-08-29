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
    position: "relative"
  },
  badgePosition: {
    display: "flex",
    alignItems: "center"
  },
  badge: {
    borderRadius: `${theme.hv.spacing.xs}px`,
    backgroundColor: theme.hv.palette.accent.acce1,
    minHeight: "6px",
    minWidth: "6px"
  },
  badgeIcon: {
    position: "absolute",
    top: "2px",
    right: "2px"
  },
  badgeText: {
    position: "absolute",
    top: "0px",
    right: "-6px"
  },
  showCount: {
    ...theme.hv.typography.labelText,
    justifyContent: "center",
    height: "16px",
    width: "16px",
    lineHeight: "0",
    color: theme.hv.palette.atmosphere.atmo1
  },
  showCountIcon: {
    right: "-9px"
  },
  showCountText: {
    right: "-16px"
  },
  badgeTwoDigits: {
    width: `${theme.hv.spacing.md}px`
  },
  badgeTwoDigitsIcon: {
    right: `-23px`
  },
  badgeTwoDigitsText: {
    right: `-30px`
  }
});

export default styles;
