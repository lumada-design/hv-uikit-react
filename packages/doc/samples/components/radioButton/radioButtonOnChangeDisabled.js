import React from "react";
import HvRadio from "@hv/uikit-react-core/dist/Selectors/RadioButton";

export default (
  <HvRadio
    label="click me!"
    value="A"
    onChange={event => alert(`my value is ${event.target.value}`)}
    disabled
  />
);
