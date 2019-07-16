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
    position: "absolute",
    width: "100%"
  },
  icon: {
    position: "relative"
  },
  iconSelected: {
    zIndex: 10,
    border: `solid 1px ${theme.hv.palette.accent.acce1}`,
    backgroundColor: `${theme.hv.palette.atmosphere.atmo1}`,
    borderBottom: "none"
  },
  iconButton: {
    color: theme.palette.text.main,
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  extenderLine: {
    position: "absolute",
    width: "calc(100% - 30px)",
    top: "-1px",
    right: "31px",
    borderTop: `1px solid ${theme.hv.palette.accent.acce1}`
  },
  paperRoot: {
    position: "absolute",
    zIndex: 1,
    right: "-1px",
    top: 0,
    background: theme.palette.common.white,
    border: `1px solid ${theme.hv.palette.accent.acce1}`,
    borderTop: "none"
  },
  column: {
    display: "flex",
    flexFlow: "column",
    alignItems: "right"
  },
  menuList: {}
});

export default styles;
