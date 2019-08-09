import React from "react";
import HvCheckBox from "@hv/uikit-react-core/dist/Selectors/CheckBox";

export default (
  <HvCheckBox
    label="click me!"
    value="A"
    onChange={event => alert(`my value is ${event.target.value}`)}
  />
);
