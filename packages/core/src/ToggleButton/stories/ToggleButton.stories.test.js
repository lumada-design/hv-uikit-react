import React, { useState } from "react";

import { Unlock, Lock } from "@hitachivantara/uikit-react-icons";

import { HvToggleButton, HvButton } from "../..";

export default {
  title: "Tests/Toggle Button",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
};

export const Controlled = () => {
  const [select, setSelect] = useState(false);
  const toggleState = () => setSelect(!select);

  return (
    <>
      <HvButton style={{ marginBottom: "12px" }} onClick={toggleState}>
        {select ? "Open lock" : "Close lock"}
      </HvButton>
      <HvToggleButton
        aria-label="Lock"
        selected={select}
        notSelectedIcon={<Unlock />}
        selectedIcon={<Lock />}
        onClick={toggleState}
      />
    </>
  );
};

Controlled.parameters = {
  docs: {
    description: "A sample showcasing a toggle button with state.",
  },
};
