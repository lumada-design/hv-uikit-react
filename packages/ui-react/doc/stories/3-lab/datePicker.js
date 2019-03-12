import React from "react";
import { storiesOf } from "@storybook/react";
import HvDatePicker from "@hv-ui/react/core/DatePicker";

storiesOf("Lab", module).add("datePicker", () => <HvDatePicker />, {
  title: "DatePicker",
  description:
    "A datepicker component used to choose dates, still in development",
  usage: "import HvDatePicker from '@hv-ui/react/core/DatePicker'",
  examples: [
    {
      title: "Simple datepicker",
      description: "basic datepicker",
      src: "lab/datePicker/datePickerSimple.js"
    }
  ]
});
