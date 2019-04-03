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
  menuItem: {
    display: "flex",
    alignItems: "center",
    height: "32px",
    fontFamily: theme.typography.fontFamily,
    color: `${theme.hv.palette.accent.acce1}`,
    textAlign: "left",
    fontSize: "12px",
    textTransform: "capitalize",
    maxWidth: "170px",
    padding: `0 ${theme.hv.spacing.xs}px`,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&:hover": {
      background: `${theme.hv.palette.atmosphere.atmo4}`
    }
  },
  menuList: {
    border: `solid 1px ${theme.hv.palette.accent.acce2}`,
    padding: `${theme.hv.spacing.sm}px`,
    position: "absolute",
    whiteSpace: "nowrap",
    backgroundColor: `${theme.hv.palette.atmosphere.atmo1}`,
    top: `${theme.hv.spacing.md}px`,
    zIndex: -1
  },
  iconSelected: {
    border: `solid 1px ${theme.hv.palette.accent.acce2}`,
    backgroundColor: `${theme.hv.palette.atmosphere.atmo1}`,
    borderBottom: "none"
  }
});

export default styles;
