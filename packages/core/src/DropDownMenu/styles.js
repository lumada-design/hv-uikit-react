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

import { outlineStyles } from "../Focus/styles";

const styles = theme => ({
  root: {
    display: "contents"
  },
  icon: {
    height: "32px",
    width: "32px",
    position: "relative",
    boxSizing: "content-box",
    padding: 0,
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.hv.palette.atmosphere.atmo4
    },
    "&:focus": {
      ...outlineStyles
    },
    "&:disabled": {
      cursor: "not-allowed",
      pointerEvents: "auto"
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
    padding: `${theme.spacing.sm}px`,
    whiteSpace: "nowrap",
    backgroundColor: `${theme.hv.palette.atmosphere.atmo1}`,
    boxShadow: `0 2px 12px rgba(65,65,65,.12)`
  }
});

export default styles;
