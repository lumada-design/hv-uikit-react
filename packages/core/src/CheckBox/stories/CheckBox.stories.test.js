import React, { useState } from "react";
import { HvCheckBox } from "../..";

export default {
  title: "Tests/Checkbox",
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
  const [cChecked, setCChecked] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <HvCheckBox
        id="checkState1"
        label="Checkbox 1"
        checked={aChecked}
        onChange={() => setAChecked(!aChecked)}
      />
      <HvCheckBox
        id="checkState2"
        label="Checkbox 2"
        checked={bChecked}
        onChange={() => setBChecked(!bChecked)}
      />
      <HvCheckBox
        id="checkState3"
        label="Checkbox indeterminate"
        indeterminate
        checked={cChecked}
        onChange={() => setCChecked(!cChecked)}
      />

      <HvCheckBox id="checkState4" label="Checkbox indeterminate disabled" disabled indeterminate />
      <HvCheckBox id="checkState5" label="Checkbox disabled" disabled />
      <HvCheckBox id="checkState6" label="Checkbox checked disabled" checked disabled />
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
