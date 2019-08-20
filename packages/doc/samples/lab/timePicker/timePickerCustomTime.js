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
import TimePicker from "@hv/uikit-react-lab/dist/TimePicker";

const TimePickerToExport = () => (
  <div style={{ width: "200px" }}>
    <TimePicker hours={14} minutes={35} seconds={45} period="AM" timeFormat={12} />
  </div>
);

export default <TimePickerToExport />;
