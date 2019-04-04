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
import HvSlider from "@hv/uikit-react-lab/Slider";

const threeKnobFixedProperties = [
  {
    color: "yellow",
    dragColor: "black",
    trackColor: "red"
  },
  {
    color: "red",
    dragColor: "grey",
    trackColor: "grey"
  },
  {
    color: "purple",
    dragColor: "orange",
    trackColor: "yellow",
    fixed: true
  }
];

const threeKnobFixedPropertiesDefaults = [10, 50, 80];

export default (
  <HvSlider
    markStep={10}
    knobProperties={threeKnobFixedProperties}
    defaultValues={threeKnobFixedPropertiesDefaults}
  />
);
