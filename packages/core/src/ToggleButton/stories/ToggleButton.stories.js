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
  const labels = {
    notSelectedTitle: "Open",
    selectedTitle: "Closed"
  };
  return (
    <HvToggleButton
      notSelectedIcon={Unlock}
      aria-label="Lock selection"
      selectedIcon={Lock}
      labels={labels}
    />
  );
};

export const Controlled = () => {
  const [select, setSelect] = useState(true);

  const toggleState = () => setSelect(!select);

  const label = select ? "Selected" : "Not Selected";

  const labels = {
    notSelectedTitle: "Open",
    selectedTitle: "Closed"
  };

  return (
    <>
      <HvButton style={{ marginBottom: "12px" }} onClick={toggleState}>
        {label}
      </HvButton>
      <div>
        <HvToggleButton
          selected={select}
          notSelectedIcon={Unlock}
          selectedIcon={Lock}
          onClick={toggleState}
          aria-label="Lock selection"
          labels={labels}
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

export const Animated = () => {
  const labels = {
    notSelectedTitle: "Don't Show",
    selectedTitle: "Show"
  };

  return <HvToggleButton notSelectedIcon={Eye} labels={labels} animated />;
};

Animated.story = {
  parameters: {
    docs: {
      storyDescription: "A sample showcasing a toggle button with a custom animated icon."
    }
  }
};
