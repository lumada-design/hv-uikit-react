import React from "react";
import HvButton from "@hv/uikit-react-core/dist/Button";

export default (
  <div style={{ backgroundColor: "#D3E3F6" }}>
    <HvButton
      onClick={() => {
        alert("You clicked me");
      }}
      category="semantic"
      disabled
    >
      Button
    </HvButton>
  </div>
);
