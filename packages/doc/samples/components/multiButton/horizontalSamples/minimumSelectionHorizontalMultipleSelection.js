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
import MultiButton from "@hv/uikit-react-core/dist/MultiButton";

import Map from "@hv/uikit-react-icons/dist/Generic/Map";
import LocationPin from "@hv/uikit-react-icons/dist/Generic/LocationPin";

const buttonsDefinitions = [
  { id: "map", value: "map", icon: <Map /> },
  {
    id: "satellite",
    value: "satellite",
    icon: <LocationPin />,
    selected: true
  },
  { id: "map1", value: "chart", icon: <Map />, selected: true },
  { id: "satellite1", value: "location 1", icon: <LocationPin /> },
  { id: "satellite2", value: "location 2", icon: <LocationPin /> },
  { id: "satellite3", value: "location 3", icon: <LocationPin /> }
];

export default (
  <div style={{ width: "1000px" }}>
    <MultiButton
      buttons={buttonsDefinitions}
      type={"mixed"}
      multi
      minSelection={2}
    />
  </div>
);
