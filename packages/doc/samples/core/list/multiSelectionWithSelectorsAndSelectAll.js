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

import React from "react";
import List from "@hv/uikit-react-core/dist/List";

const data = [
  {
    label: "Arhauss is somewhere",
    selected: false
  },
  {
    label: "Allentown is not are 51",
    selected: false
  },
  {
    label: "Bergamo where you can eat",
    selected: true
  },
  {
    label: "Bergen city",
    selected: false
  },
  {
    label: "Boston of the Seven Seas",
    selected: false
  }
];

export default (
  <div style={{ width: 200 }}>
    <List values={data} multiSelect={true} showSelectAll useSelector />
  </div>
);