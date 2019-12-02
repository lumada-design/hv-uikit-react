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
  { id: "map", value: "Map", icon: <Map /> },
  {
    id: "satellite",
    value: "Satellite",
    icon: <LocationPin />
  },
  { id: "map1", value: "Chart", icon: <Map /> },
  { id: "satellite1", value: "Location 1", icon: <LocationPin /> },
  { id: "satellite2", value: "Location 2", icon: <LocationPin /> },
  { id: "satellite3", value: "Location 3", icon: <LocationPin /> }
];

export default (
  <div style={{ width: "1000px" }}>
    <MultiButton
      buttons={buttonsDefinitions}
      type={"mixed"}
      multi
      maxSelection={2}
    />
  </div>
);
