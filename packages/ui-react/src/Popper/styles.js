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
  popper: {
    zIndex: 998
  },
  content: {
    display: "inline-block",
    border: `solid 1px ${theme.hv.palette.atmosphere.atmo6} `,
    padding: "10px 12px",
    maxWidth: 532
  },
  contentKey: {
    fontWeight: 600,
    display: "inline-block",
    padding: "10px 5px 10px 8px"
  },
  contentValue: {
    display: "inline-block",
    float: "right",
    padding: "10px 8px 10px 5px"
  }
});

export default styles;
