import React from "react";
import { storiesOf } from "@storybook/react";
import HvRadio from "@hv-ui/react/core/Selectors/RadioButton";

storiesOf("Core", module).add("RadioButton", () => <HvRadio />, {
  title: "Radio button selector",
  description:
    "A Radio button selector that allows selecting a value it posses 3 states: empty, full or intermediate",
  designSystemLink: "https://10.76.48.133/hv-design-system/hv-design-system-specs/tree/master",
  usage: "import HvRadio from '@hv-ui/react/core/Selectors/RadioButton'",
  examples: [
    {
      title: "Simple Radio button",
      description: "Simple Radio button with no state management",
      src: "core/radioButton/radioButtonSimple"
    },
    {
      title: "Disabled simple Radio button",
      description:
        "Simple Radio button with no state management but disable not allowing interactions",
      src: "core/radioButton/radioButtonDisabled"
    },
    {
      title: "Radio button with label",
      description: "Radio button that has a label with no state management",
      src: "core/radioButton/radioButtonLabel"
    },
    {
      title: "Disabled Radio button with label",
      description:
        "Radio button that has a label with no state management but disable not allowing interactions",
      src: "core/radioButton/radioButtonLabelDisabled"
    },
    {
      title: "Radio button with click action",
      description:
        "Radio button with click action and no state management the onChange returns the value assigned",
      src: "core/radioButton/radioButtonOnChange"
    },
    {
      title: "Disabled Radio button with click action",
      description:
        "Radio button with click action and no state management but disable not allowing interactions",
      src: "core/radioButton/radioButtonOnChangeDisabled"
    },
    {
      title: "Radio button with state management",
      description:
        "Demostration of how to create a group of Radio button with state management",
      src: "core/radioButton/radioButtonState"
    }
  ]
});
