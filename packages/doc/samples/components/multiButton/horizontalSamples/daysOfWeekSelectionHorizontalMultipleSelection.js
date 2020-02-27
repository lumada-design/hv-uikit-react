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

const buttonsDefinitions = [
  { id: "monday", value: "M", selected: true },
  { id: "tuesday", value: "T" },
  { id: "wednesday", value: "W", selected: true },
  { id: "thursday", value: "T", selected: true },
  { id: "friday", value: "F" },
  { id: "saturday", value: "S", selected: true },
  { id: "sunday", value: "S" }
];

export default (
  <div style={{ width: "224px" }}>
    <MultiButton
      buttons={buttonsDefinitions}
      type={"text"}
      multi
    />
  </div>
);
