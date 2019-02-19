import React from "react";
import { storiesOf } from "@storybook/react";

import { TextArea } from "../src";

storiesOf("TextArea", module)
  .add("Normal", () => (
    <TextArea label="Text Area" rows={3} />
  ))
  .add("Disabled", () => (
    <TextArea label="Text Area" />
  ));
