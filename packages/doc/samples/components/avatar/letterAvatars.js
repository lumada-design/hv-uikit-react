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
    <HvAvatar>BM</HvAvatar>
    <HvAvatar backgroundColor="sema19">W</HvAvatar>
    <HvAvatar backgroundColor="sema6">CS</HvAvatar>
  </div>
);
