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
    display: "contents"
  },
  icon: {
    height: 33,
    width: 32,
    position: "relative",
    boxSizing: "content-box",
    color: theme.hv.palette.accent.acce1,
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    },
    borderRadius: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  iconSelected: {
    backgroundColor: `${theme.hv.palette.atmosphere.atmo1}`,
    boxShadow: `0 2px 12px rgba(65,65,65,.12)`,
    "&:hover": {
      backgroundColor: `${theme.hv.palette.atmosphere.atmo1}`
    }
  },
  menuList: {
    padding: `${theme.spacing.xs}px`,
    whiteSpace: "nowrap",
    backgroundColor: `${theme.hv.palette.atmosphere.atmo1}`,
    boxShadow: `0 2px 12px rgba(65,65,65,.12)`
  }
});

export default styles;
