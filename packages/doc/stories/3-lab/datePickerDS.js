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
import HvDatePickerDS from "@hv/uikit-react-lab/dist/DatePickerDS";

storiesOf("Lab", module).add("DatePickerDS", () => <HvDatePickerDS onValidate={"test"}/>, {
  title: "DatePickerDS",
  description:
    "A datepicker component with a popup calendar used to choose dates, this component is meant to follow  the Design System specifications. This component will be used as a replacement for the current DatePicker compoment existing in the Lab section.",
  usage: "import HvDatePickerDS from '@hv/uikit-react-core/lab/DatePickerDS'",
  examples: [
    {
      title: "1. Empty",
      description: "Empty datepicker",
      src: "lab/datePickerDS/datePickerDSEmpty.js"
    },
    {
      title: "2. Value Set",
      description: "Datepicker with value (date)",
      src: "lab/datePickerDS/datePickerDSWithValue.js"
    },
    {
      title: "3. Localized datepicker in Portuguese (pt-PT)",
      description: "Localized Datepicker",
      src: "lab/datePickerDS/datePickerDSLocalized.js"
    },
    {
      title: "4. Datepicker with action buttons",
      description: "Datepicker with action buttons",
      src: "lab/datePickerDS/datePickerDSWithActions.js"
    },
    {
      title: "5. Datepicker with Label",
      description: "Datepicker with Label",
      src: "lab/datePickerDS/datePickerDSWithLabel.js"
    }
  ]
});