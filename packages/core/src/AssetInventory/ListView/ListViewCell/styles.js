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

import mapValues from "lodash/mapValues";

const styles = theme => {
  const semantics = mapValues(theme.hv.palette.semantic, value => ({
    "&::before": {
      background: value
    }
  }));

  const atmosphere = mapValues(theme.hv.palette.atmosphere, value => ({
    "&::before": {
      background: value
    }
  }));

  return {
    root: {
      position: "relative",
      padding: `${theme.hv.spacing.xs}px 0 ${theme.hv.spacing.xs}px 0`
    },
    semanticBar: {
      "&::before": {
        content: "''",
        height: "100%",
        width: 2,
        display: "block",
        background: theme.hv.palette.semantic.sema1,
        position: "absolute",
        top: 0,
        left: 0
      }
    },
    ...semantics,
    ...atmosphere
  };
};

export default styles;
