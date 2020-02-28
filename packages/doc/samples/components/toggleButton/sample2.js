import React, { useState } from "react";
import Button from "@hv/uikit-react-core/dist/Button";
import ToggleButton from "@hv/uikit-react-core/dist/ToggleButton";
import Lock from "@hv/uikit-react-icons/dist/Lock";
import Unlock from "@hv/uikit-react-icons/dist/Unlock";

const ToggleButtonControl = () => {
  const [select, setSelect] = useState(true);

  const toggleState = () => setSelect(!select);

  const label = select ? "Selected" : "Not Selected";

  return (
    <>
      <Button style={{ marginBottom: "12px" }} onClick={toggleState}>
        {label}
      </Button>
      <div>
        <ToggleButton
          selected={select}
          notSelectedIcon={Unlock}
          notSelectedTitle="Open"
          selectedIcon={Lock}
          selectedTitle="Closed"
          onClick={toggleState}
          aria-label="Lock selection"
        />
      </div>
    </>
  );
};

export default <ToggleButtonControl />;
