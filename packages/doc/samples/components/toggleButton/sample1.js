import React, { useState } from "react";
import ToggleButton from "@hv/uikit-react-core/dist/ToggleButton";
import Lock from "@hv/uikit-react-icons/dist/DawnTheme/Lock.S";
import Unlock from "@hv/uikit-react-icons/dist/DawnTheme/Unlock.S";

export default (
  <ToggleButton
    notSelectedIcon={Unlock}
    notSelectedTitle="Open"
    selectedIcon={Lock}
    selectedTitle="Closed"
  />
);
