import React, { useState } from "react";
import { Lock, Unlock, LightOff, LightOn } from "@hitachivantara/uikit-react-icons";
import { HvToggleButton, HvButton } from "../..";
import Eye from "./Eye";

export default {
  title: "Components/Selectors/Toggle Button",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvToggleButton } from "@hitachivantara/uikit-react-core";',
  },
  component: HvToggleButton,
};

export const Main = () => (
  <HvToggleButton
    aria-label="Lock"
    notSelectedIcon={Unlock}
    selectedIcon={Lock}
    labels={{
      notSelectedTitle: "Close lock",
      selectedTitle: "Open lock",
    }}
  />
);

export const Controlled = () => {
  const [select, setSelect] = useState(true);

  const toggleState = () => setSelect(!select);

  const label = select ? "Open lock" : "Close lock";

  return (
    <>
      <HvButton style={{ marginBottom: "12px" }} onClick={toggleState}>
        {label}
      </HvButton>
      <div>
        <HvToggleButton
          aria-label="Lock"
          selected={select}
          notSelectedIcon={Unlock}
          selectedIcon={Lock}
          onClick={toggleState}
          labels={{
            notSelectedTitle: "Close lock",
            selectedTitle: "Open lock",
          }}
        />
      </div>
    </>
  );
};

Controlled.story = {
  parameters: {
    docs: {
      storyDescription: "A sample showcasing a toggle button with state.",
    },
  },
};

export const Disabled = () => (
  <HvToggleButton
    aria-label="Light"
    notSelectedIcon={LightOff}
    selectedIcon={LightOn}
    disabled
    labels={{
      notSelectedTitle: "Turn on light",
      selectedTitle: "Turn off light",
    }}
  />
);

Disabled.story = {
  parameters: {
    docs: {
      storyDescription: "A sample showcasing a disabled toggle button.",
    },
  },
};

export const Animated = () => (
  <HvToggleButton
    notSelectedIcon={Eye}
    animated
    aria-label="Eye"
    labels={{
      notSelectedTitle: "Don't Show",
      selectedTitle: "Show",
    }}
  />
);

Animated.story = {
  parameters: {
    docs: {
      storyDescription: "A sample showcasing a toggle button with a custom animated icon.",
    },
  },
};
