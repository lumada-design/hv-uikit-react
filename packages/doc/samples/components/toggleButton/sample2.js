import React, { useState } from "react";
import Button from "@hv/uikit-react-core/dist/Button";
import ToggleButton from "@hv/uikit-react-core/dist/ToggleButton";
import { Lock, Unlock } from "@hv/uikit-react-icons/dist";

const labels = {
  notSelectedTitle: "Open",
  selectedTitle: "Closed"
};

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
          labels={labels}
          selectedIcon={Lock}
          onClick={toggleState}
          aria-label="Lock selection"
        />
      </div>
    </>
  );
};

export default <ToggleButtonControl />;
