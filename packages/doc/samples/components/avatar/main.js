import React from "react";

import { HvAvatar } from "@hv/uikit-react-core/dist";

import { LogIn } from "@hv/uikit-react-icons/dist/Generic";

import man2 from "./resources/man-2.png";

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
    <HvAvatar />
    <HvAvatar backgroundColor="sema19">CS</HvAvatar>
    <HvAvatar alt="Wayne" src={man2} />
    <HvAvatar backgroundColor="sema2">
      <LogIn color={["atmo1"]} iconSize="XS" />
    </HvAvatar>
  </div>
);
