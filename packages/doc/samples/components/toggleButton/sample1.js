import React from "react";
import ToggleButton from "@hv/uikit-react-core/dist/ToggleButton";
import { Lock, Unlock } from "@hv/uikit-react-icons/dist";

const labels = {
  notSelectedTitle: "Open",
  selectedTitle: "Closed"
};

export default (
  <ToggleButton
    notSelectedIcon={Unlock}
    aria-label="Lock selection"
    labels={labels}
    selectedIcon={Lock}
  />
);
