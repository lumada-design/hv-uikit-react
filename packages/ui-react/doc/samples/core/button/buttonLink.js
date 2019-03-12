import React from "react";
import HvButton, { buttonTypes } from "@hv-ui/react/core/Button";

export default (
  <HvButton
    onClick={() => {
      alert("You clicked me");
    }}
    colorType={buttonTypes.link}
  >
    Button
  </HvButton>
);
