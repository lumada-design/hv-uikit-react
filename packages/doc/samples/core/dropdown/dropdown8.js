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
import HvDropdown from "@hv-ui/react/core/Dropdown";

const data = [
  {
    label: "value 1",
    selected: false
  },
  {
    label: "value 2",
    selected: false
  },
  {
    label: "value 3",
    selected: true
  },
  {
    label: "value 4",
    selected: false
  },
  {
    label: "value 5 value 5 value 5 555555555555 value value 5",
    selected: false
  },
  {
    label: "value 6"
  },
  {
    label: "value 7"
  },
  {
    label: "value 8",
    selected: true
  },
  {
    label: "value 9",
    selected: true
  },
  {
    label: "value 10"
  },
  {
    label: "value 11"
  },
  {
    label: "value 12"
  }
];

export default (
  <HvDropdown values={data} multiSelect showSearch={false} disabled />
);
