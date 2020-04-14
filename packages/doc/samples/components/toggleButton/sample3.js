import React from "react";
import ToggleButton from "@hv/uikit-react-core/dist/ToggleButton";
import Eye from "./Eye";

const labels = {
  notSelectedTitle: "Don't Show",
  selectedTitle: "Show"
};

export default <ToggleButton notSelectedIcon={Eye} labels={labels} animated />;
