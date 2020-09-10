import React, { useState } from "react";
import { HvRadio } from "../../..";

export default {
  title: "Patterns/Selectors/Radio",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvRadio } from '@hv/uikit-react-core/dist'"
  },
  component: HvRadio
};

export const Main = () => {
  return <HvRadio inputProps={{ "aria-label": "Simple radio button" }} />;
};

Main.parameters = {
  v3: true
};

export const Disabled = () => (
  <HvRadio id="radio1" disabled inputProps={{ "aria-label": "Radio disabled" }} />
);

Disabled.parameters = {
  docs: {
    description: {
      story: "A sample showcasing a disabled radio button that does not allows interaction."
    }
  },
  pa11y: {
    ignore: [
      "region",
      // Text or images of text that are part of an inactive user interface component have no contrast requirement.
      // https://github.com/lumada-design/hv-uikit-react/issues/775#issuecomment-557167364
      "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
      "color-contrast"
    ]
  },
  v3: true
};

export const CheckedDisabled = () => (
  <HvRadio id="radio1" disabled checked inputProps={{ "aria-label": "Radio disabled" }} />
);

CheckedDisabled.parameters = {
  docs: {
    description: {
      story:
        "A sample showcasing a checked and disabled radio button that does not allows interaction."
    }
  },
  pa11y: {
    ignore: [
      "region",
      // Text or images of text that are part of an inactive user interface component have no contrast requirement.
      // https://github.com/lumada-design/hv-uikit-react/issues/775#issuecomment-557167364
      "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
      "color-contrast"
    ]
  },
  v3: true
};

export const Label = () => <HvRadio id="radio1" label="Label" />;

Label.parameters = {
  docs: {
    description: { story: "A sample showcasing a radio button that includes a label." }
  },
  v3: true
};

export const WithClickAction = () => (
  <HvRadio
    id="check-click"
    label="Click me!"
    value="A"
    onChange={event => console.log(`my value is ${event.target.value}`)}
  />
);

WithClickAction.parameters = {
  docs: {
    description: {
      story: "Returns the value when clicked, check the browser console to see the result."
    }
  },
  v3: true
};

export const WithClickActionDisabled = () => (
  <HvRadio
    id="radio1"
    label="Click me!"
    value="A"
    disabled
    onChange={event => console.log(`my value is ${event.target.value}`)}
  />
);

WithClickActionDisabled.parameters = {
  docs: {
    description: {
      story:
        "Dos not return the value when clicked because is disabled, check the browser console to see the result."
    }
  },
  pa11y: {
    ignore: [
      "region",
      // Text or images of text that are part of an inactive user interface component have no contrast requirement.
      // https://github.com/lumada-design/hv-uikit-react/issues/775#issuecomment-557167364
      "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
      "color-contrast"
    ]
  },
  eyes: { waitBeforeScreenshot: ".MuiFormControlLabel-label" },
  v3: true
};

export const WithState = () => {
  const valueA = "a";
  const valueB = "b";
  const nothing = "";
  const [checkedRadio, setCheckedRadio] = useState(valueA);

  const onChangeRadio = value => () => {
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

WithState.parameters = {
  docs: {
    description: { story: "Demostration of how to set the state of the radio button" }
  },
  v3: true
};
