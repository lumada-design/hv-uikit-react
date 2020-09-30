import React, { useState } from "react";
import { HvSwitch } from "../..";

export default {
  title: "Tests/Switch",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
};

// __________________________________
// Extended robot test scenarios

export const WithState = () => {
  const [aChecked, setAChecked] = useState(false);
  const [bChecked, setBChecked] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <HvSwitch
        id="checkState1"
        label="Switch 1"
        checked={aChecked}
        onChange={() => setAChecked(!aChecked)}
      />
      <HvSwitch
        id="checkState2"
        label="Switch 2"
        checked={bChecked}
        onChange={() => setBChecked(!bChecked)}
      />

      <HvSwitch id="checkState3" label="Switch disabled" disabled />
      <HvSwitch id="checkState4" label="Switch checked disabled" checked disabled />
    </div>
  );
};

WithState.story = {
  parameters: {
    pa11y: {
      ignore: [
        "region",
        // Text or images of text that are part of an inactive user interface component have no contrast requirement.
        // https://github.com/lumada-design/hv-uikit-react/issues/775#issuecomment-557167364
        "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
        "color-contrast",
      ],
    },
    v3: true,
  },
};
