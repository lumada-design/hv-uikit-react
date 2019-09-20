import React, { useState } from "react";
import Button from "@hv/uikit-react-core/dist/Button";
import ToggleButton from "@hv/uikit-react-core/dist/ToggleButton";
import Lock from "@hv/uikit-react-icons/dist/DawnTheme/Lock.S";
import Unlock from "@hv/uikit-react-icons/dist/DawnTheme/Unlock.S";

const ToggleButtonControl = () => {
  const [select, setSelect] = useState(true);

  const toggleState = () => setSelect(!select);

  const label = select ? "Selected" : "Not Selected";

  return (
    <>
      <Button onClick={toggleState}>{label}</Button>
      <div>
        <ToggleButton
          selected={select}
          notSelectedIcon={Unlock}
          notSelectedTitle="Open"
          selectedIcon={Lock}
          selectedTitle="Closed"
          onClick={toggleState}
        />
      </div>
    </>
  );
};

export default <ToggleButtonControl />;
