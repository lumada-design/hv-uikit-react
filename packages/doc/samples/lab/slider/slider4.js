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

const scaledKnobProperties = [
  {
    color: "#72cccb",
    dragColor: "#96d9d8",
    defaultValue: 0.3
  },
  {
    color: "#72cccb",
    dragColor: "#96d9d8",
    defaultValue: 0.5
  }
];

const scaledKnobPropertiesDefaults = [0.3, 0.5];

export default (
  <HvSlider
    markStep={10}
    knobProperties={scaledKnobProperties}
    defaultValues={scaledKnobPropertiesDefaults}
    minPointValue={0.1}
    maxPointValue={0.7}
    divisionQuantity={30}
    noOverlap={false}
    markDigits={2}
  />
);
