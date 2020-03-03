import React from "react";
import ToggleButton from "@hv/uikit-react-core/dist/ToggleButton";
import { Lock, Unlock } from "@hv/uikit-react-icons/dist";

export default (
  <ToggleButton
    notSelectedIcon={Unlock}
    aria-label="Lock selection"
    notSelectedTitle="Open"
    selectedIcon={Lock}
    selectedTitle="Closed"
  />
);
