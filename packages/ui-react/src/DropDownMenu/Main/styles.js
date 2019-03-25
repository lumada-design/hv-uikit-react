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
  root:{
    position: "relative",
    zIndex: 10
  },
  icon: {
    boxSizing: "content-box",
    border: `solid 1px transparent`,
    borderBottom: "none"
  },
  iconSelected: {
    border: `solid 1px ${theme.hv.palette.atmosphere.atmo7}`,
    backgroundColor: `${theme.hv.palette.atmosphere.atmo1}`,
    borderBottom: "none"
  },
  iconButton: {
    boxSizing: "content-box",
    color: theme.palette.text.main,
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  menuList: {
    border: `solid 1px ${theme.hv.palette.atmosphere.atmo7}`,
    padding: `${theme.hv.spacing.xs}px`,
    position: "absolute",
    whiteSpace: "nowrap",
    backgroundColor: `${theme.hv.palette.atmosphere.atmo1}`,
    top: 32,
    zIndex:-1
  },
  right: { justifyContent: "flex-start" },
  center: { justifyContent: "center" },
  left: { justifyContent: "flex-end"},
  rightPx: { left:"0px" },
  leftPx: {  right:"0px" }
});

export default styles;
