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
    "&::before": {
      background: value
    }
  }));

  return {
    root: {
      boxSizing: "content-box",
      "&::before": {
        content: "''",
        height: 2,
        width: "100%",
        display: "block",
        background: theme.hv.palette.atmosphere.atmo6
      }
    },
    ...semantics,
    selectable: {
      cursor: "pointer",
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
