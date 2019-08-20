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
import { storiesOf } from "@storybook/react";
import TimePicker from "@hv/uikit-react-lab/dist/TimePicker";

storiesOf("Lab", module).add(
  "TimePicker",
  () => <TimePicker onValidate={"test"} />,
  {
    title: "TimePicker",
    description:
      "A TimePicker component with a popup used to choose the time, following specifications provided by "
      + "Design System.",
    usage: "import TimePicker from '@hv/uikit-react-core/lab/TimePicker'",
    examples: [
      {
        title: "1. 24-hour format",
        description: "TimePicker to select time in 24-hour format",
        src: "lab/timePicker/timePicker24.js"
      },
      { 
        title: "2. 12-hour format",
        description: "TimePicker to select time in 12-hour format",
        src: "lab/timePicker/timePicker12.js"
      },
      {
        title: "3. With custom default time",
        description: "TimePicker with default custom set time",
        src: "lab/timePicker/timePickerCustomTime.js"
      },
      {
        title: "4. Full width",
        description: "TimePicker occupies all the available width",
        src: "lab/timePicker/timePickerFullWidth.js"
      },
      {
        title: "5. OnChange is triggered",
        description: "TimePicker triggers an onChange when some of values change",
        src: "lab/timePicker/timePickerOnChange.js"
      }
    ]
  }
);
