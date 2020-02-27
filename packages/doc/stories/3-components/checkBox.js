import React from "react";
import { storiesOf } from "@storybook/react";
import { HvCheckBox } from "@hv/uikit-react-core/dist/Selectors";

storiesOf("Components/Selection mechanisms", module).add(
  "Checkbox",
  () => <HvCheckBox />,
  {
    title: "Checkbox selector",
    description:
      "A checkbox selector used to present the user with a range of options, from which the user may select any number of options to complete their task.",
    usage: "import { HvCheckbox } from '@hv/uikit-react-core/dist/Selectors'",
    examples: [
      {
        title: "1. Enabled",
        src: "components/checkbox/checkboxSimple"
      },
      {
        title: "2. Disabled ",
        src: "components/checkbox/checkboxDisabled"
      },
      {
        title: "3. With label",
        src: "components/checkbox/checkboxLabel"
      },
      {
        title: "4. Disabled with label",
        src: "components/checkbox/checkboxLabelDisabled"
      },
      {
        title: "5. With click action",
        description: "Returns the value assigned on click",
        src: "components/checkbox/checkboxOnChange"
      },
      {
        title: "6. Disabled with no click action",
        description: "When disabled prevents click actions to be triggered",
        src: "components/checkbox/checkboxOnChangeDisabled"
      },
      {
        title: "7. With state management",
        description:
          "Demonstration of how to create a group of checkbox with state management",
        src: "components/checkbox/checkboxState"
      }
    ]
  }
);
