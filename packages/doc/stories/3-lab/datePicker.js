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
import HvDatePicker from "@hv/uikit-react-lab/DatePicker";

storiesOf("Lab", module).add("DatePicker", () => <HvDatePicker />, {
  title: "DatePicker",
  description:
    "A datepicker component used to choose dates, still in development",
  usage: "import HvDatePicker from '@hv/uikit-react-core/DatePicker'",
  examples: [
    {
      title: "1. Simple",
      description: "basic datepicker",
      src: "lab/datePicker/datePickerSimple.js"
    }
  ]
});
