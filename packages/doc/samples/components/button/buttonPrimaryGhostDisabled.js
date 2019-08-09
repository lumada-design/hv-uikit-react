import React from "react";
import HvButton from "@hv/uikit-react-core/dist/Button";

export default (
  <HvButton
    onClick={() => {
      alert("You clicked me");
    }}
    category="ghost"
    disabled
  >
    Button
  </HvButton>
);
