import React from "react";
import ToggleButton from "@hv/uikit-react-core/dist/ToggleButton";
import Eye from "./Eye";

export default (
  <ToggleButton notSelectedIcon={Eye} notSelectedTitle="Don't Show" selectedTitle="Show" animated />
);
