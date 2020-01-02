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
import HvDatePicker from "@hv/uikit-react-core/dist/DatePicker";

storiesOf("Components", module).add(
  "DatePicker",
  () => <HvDatePicker onValidate={"test"} />,
  {
    title: "DatePicker",
    description:
      "A DatePicker component with a popup calendar used to choose dates, following specifications provided by " +
      "Design System." +
      "<br />The dates selection is limited between `1000-01-01` and `9999-12-31`.",
    usage: "import HvDatePicker from '@hv/uikit-react-core/dist/DatePicker'",
    examples: [
      {
        title: "1. Empty",
        description: "Empty datepicker",
        src: "components/datePicker/datePickerEmpty.js"
      },
      {
        title: "2. Value Set",
        description: "Datepicker with value (date)",
        src: "components/datePicker/datePickerWithValue.js"
      },
      {
        title: "3. Localized datepicker in Portuguese (pt-PT)",
        description: "Localized Datepicker",
        src: "components/datePicker/datePickerLocalized.js"
      },
      {
        title: "4. Datepicker with action buttons",
        description: "Datepicker with action buttons",
        src: "components/datePicker/datePickerWithActions.js"
      },
      {
        title: "5. Datepicker with Label and custom action button labels",
        description: "Datepicker with Label custom action button labels",
        src: "components/datePicker/datePickerWithLabel.js"
      },
      {
        title: "6. Empty range",
        description: "Empty DatePicker range ",
        src: "components/datePicker/datePickerRangeEmpty.js"
      },
      {
        title: "7. Range mode with values",
        description: "Range mode with values",
        src: "components/datePicker/datePickerRangeWithValues.js"
      },
      {
        title: "8. Near invalid dates",
        description: "Near invalid dates",
        src: "components/datePicker/datePickerNearInvalidDates.js"
      }
    ]
  }
);
