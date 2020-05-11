import React from "react";

import { HvAvatar } from "@hv/uikit-react-core/dist";

import { Bookmark } from "@hv/uikit-react-icons/dist/Generic";

import woman1 from "./resources/woman-1.png";

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
    <HvAvatar backgroundColor="sema6" size="XS">
      NA
    </HvAvatar>
    <HvAvatar backgroundColor="sema2" size="S" />
    <HvAvatar size="M" backgroundColor="sema3">
      <Bookmark iconSize="S" color={["atmo1"]} />
    </HvAvatar>
    <HvAvatar size="L" alt="Beatrice" src={woman1} />
  </div>
);
