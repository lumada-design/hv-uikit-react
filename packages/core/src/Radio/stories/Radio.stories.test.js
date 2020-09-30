import React, { useState } from "react";
import { HvRadio } from "../..";

export default {
  title: "Tests/RadioButton",
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
  const valueA = "a";
  const valueB = "b";
  const nothing = "";
  const [checkedRadio, setCheckedRadio] = useState(valueA);

  const onChangeRadio = (value) => () => {
    setCheckedRadio(checkedRadio !== value ? value : nothing);
  };

  return (
    <div style={{ display: "inline-flex", flexDirection: "column" }}>
      <HvRadio
        id="radio1"
        label="Checked"
        checked={checkedRadio === valueA}
        onChange={onChangeRadio(valueA)}
      />
      <HvRadio
        id="radio2"
        label="Unchecked"
        checked={checkedRadio === valueB}
        onChange={onChangeRadio(valueB)}
      />
      <HvRadio
        id="radio3"
        label="Disabled and checked"
        disabled
        checked
        inputProps={{ "aria-label": "Radio disabled" }}
      />
      <HvRadio
        id="radio4"
        label="Disabled"
        disabled
        inputProps={{ "aria-label": "Radio disabled" }}
      />
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
