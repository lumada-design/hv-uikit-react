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
  table: {
    ...theme.hv.typography.normalText,
    fontSie: 1,
    borderCollapse: "collapse",
    "& tr": {
    },
    "& th": {
      padding: "10px",
      textAlign: "left",
      borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo5}`,
    },
    "& td": {
      padding: "10px",
      minWidth:"150px",
      borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo5}`
    }
  }
});

export default styles;
