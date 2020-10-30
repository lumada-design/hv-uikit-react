import React from "react";

import { HvRadioGroup, HvRadio } from "../..";

export default {
  title: "Tests/Forms/Radio Button Group",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
};

// __________________________________
// Extended robot test scenarios

export const Required = () => (
  <HvRadioGroup
    id="HvRadioGroup"
    description="radioGroup description"
    required
    label="Choose your favorite checkboxes"
    name="favorite"
  >
    <HvRadio label="Radio 1" value="1" />
    <HvRadio label="Radio 2" value="2" />
    <HvRadio label="Radio 3" value="3" />
  </HvRadioGroup>
);
