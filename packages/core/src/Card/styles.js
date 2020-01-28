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

import _ from "lodash";

const styles = theme => {
  const semantics = _.mapValues(theme.hv.palette.semantic, value => ({
      position: "absolute",
      backgroundColor: value,
      width: "100%",
      height: "2px",
      top: -1,
      right: 0,
      zIndex: 1
  }));

  return {
    root: {
      boxSizing: "content-box",
      position: "relative"
    },
    sema0 : {
      position: "absolute",
      backgroundColor: theme.hv.palette.atmosphere.atmo6,
      width: "100%",
      height: "2px",
      top: -1,
      right: 0,
      zIndex: 1
    },
    ...semantics,
    semanticSelected: {
      height: "4px",
    },
    semanticContainer: {
      width: "100%",
      position: "relative",
    },
    cardOutLine: {
      width: "98%",
      height: "98%",
      position: "absolute",
      zIndex: "1",
      border: `2px solid Highlight`,
      top: 0,
      left: "0.5%",
      backgroundColor: "transparent",
      display: "none"
    },
    upperAreaReference: {
      position: "relative",
     // "&:focus-within > div > div": {
       // display: "block"
     // }
    },
    upperArea: {
     // outline: "none"
    },
    upperAreaSelectable: {
      cursor: "pointer"
    },
    selectable: {
      "&:hover": {
        outline: `1px solid ${theme.hv.palette.atmosphere.atmo6}`
      }
    },
    selected: {
      outline: `1px solid ${theme.hv.palette.accent.acce1}`,
      "&:hover": {
        outline: `1px solid ${theme.hv.palette.accent.acce1}`
      }
    }
  };
};

export default styles;
