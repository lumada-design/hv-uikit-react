import React, { useState } from "react";
import { Lock, Unlock } from "@hv/uikit-react-icons/dist";
import { HvToggleButton, HvButton } from "../..";
import Eye from "./Eye";

export default {
  title: "Components/Selectors/Toggle Button",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvToggleButton } from '@hv/uikit-react-core/dist'"
  },
  component: HvToggleButton
};

export const Main = () => {
  return (
    <HvToggleButton
      notSelectedIcon={Unlock}
      aria-label="Lock selection"
      notSelectedTitle="Open"
      selectedIcon={Lock}
      selectedTitle="Closed"
    />
  );
};

export const Controlled = () => {
  const [select, setSelect] = useState(true);

  const toggleState = () => setSelect(!select);

  const label = select ? "Selected" : "Not Selected";

  return (
    <>
      <HvButton style={{ marginBottom: "12px" }} onClick={toggleState}>
        {label}
      </HvButton>
      <div>
        <HvToggleButton
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

Controlled.story = {
  parameters: {
    docs: {
      storyDescription: "A sample showcasing a toggle button with state."
    }
  }
};

export const Animated = () => (
  <HvToggleButton
    notSelectedIcon={Eye}
    notSelectedTitle="Don't Show"
    selectedTitle="Show"
    animated
  />
);

Animated.story = {
  parameters: {
    docs: {
      storyDescription: "A sample showcasing a toggle button with a custom animated icon."
    }
  }
};
