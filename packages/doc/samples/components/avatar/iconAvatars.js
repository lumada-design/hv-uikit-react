import React from "react";

import { HvAvatar } from "@hv/uikit-react-core/dist";

import {
  LogIn,
  Archives,
  Search,
  Bookmark,
} from "@hv/uikit-react-icons/dist/Generic";

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
    <HvAvatar>
      <LogIn color={["atmo1"]} iconSize="XS" />
    </HvAvatar>
    <HvAvatar backgroundColor="sema1">
      <Archives color={["atmo1"]} iconSize="XS" />
    </HvAvatar>
    <HvAvatar backgroundColor="sema2">
      <Search color={["atmo1"]} iconSize="XS" />
    </HvAvatar>
    <HvAvatar backgroundColor="sema3">
      <Bookmark color={["atmo1"]} iconSize="XS" />
    </HvAvatar>
  </div>
);
