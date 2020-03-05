import React from "react";
import HvButton from "@hv/uikit-react-core/dist/Button";
import HvProvider from "@hv/uikit-react-core/dist/Provider";

export default (
  <HvProvider>
    <HvButton
      onClick={() => {
        alert("You clicked me");
      }}
      id="test"
    >
      Button
    </HvButton>
  </HvProvider>
);
