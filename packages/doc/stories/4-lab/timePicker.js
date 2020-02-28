import React from "react";
import { storiesOf } from "@storybook/react";
import TimePicker from "@hv/uikit-react-lab/dist/TimePicker";

storiesOf("Lab", module).add(
  "TimePicker",
  () => <TimePicker onValidate={"test"} />,
  {
    title: "TimePicker",
    description:
      "A TimePicker component with a popup used to choose the time, following specifications provided by " +
      "Design System.",
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
        description:
          "TimePicker triggers an onChange when some of values change",
        src: "lab/timePicker/timePickerOnChange.js"
      }
    ]
  }
);
