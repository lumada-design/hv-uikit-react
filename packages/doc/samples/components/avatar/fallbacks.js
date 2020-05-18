import React from "react";

import { HvAvatar } from "@hv/uikit-react-core/dist";

const exampleStyles = {
  display: "flex",
  flexWrap: "wrap",
  maxWidth: "300px",
  padding: "0",
  alignItems: "center",
  justifyContent: "space-evenly",
};

export default (
  <div style={exampleStyles}>
    <HvAvatar id="fallback_to_children" alt="Clara Soul" src="/broken-image.jpg">
      CS
    </HvAvatar>
    <HvAvatar id="falback_to_alt" alt="Clara Soul" src="/broken-image.jpg" />
    <HvAvatar id="fallback_to_default_icon" src="/broken-image.jpg" />
  </div>
);
