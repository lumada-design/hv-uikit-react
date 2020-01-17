import React from "react";
import { HvCheckBox } from "@hv/uikit-react-core/dist/Selectors";

export default (
  <HvCheckBox
    label="Click me!"
    value="A"
    onChange={event => console.log(`my value is ${event.target.value}`)}
    disabled
  />
);
