import React from "react";
import ToggleButton from "@hv/uikit-react-core/dist/ToggleButton";
import Lock from "@hv/uikit-react-icons/dist/Generic/Lock";
import Unlock from "@hv/uikit-react-icons/dist/Generic/Unlock";

export default (
  <ToggleButton
    notSelectedIcon={Unlock}
    aria-label="Lock selection"
    notSelectedTitle="Open"
    selectedIcon={Lock}
    selectedTitle="Closed"
  />
);
