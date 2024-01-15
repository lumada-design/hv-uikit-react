import React, { useState } from "react";
import { HvCheckBox } from "../../..";

export default {
  title: "Components/Selectors/Checkbox",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvCheckBox } from "@hitachivantara/uikit-react-core";',
  },
  component: HvCheckBox,
};

export const Main = () => {
  return <HvCheckBox id="test" inputProps={{ "aria-label": "Checkbox example" }} />;
};

export const Disabled = () => (
  <HvCheckBox id="Checkbox-disabled" disabled inputProps={{ "aria-label": "Checkbox disabled" }} />
);

Disabled.story = {
  parameters: {
    docs: {
      storyDescription: "A sample showcasing a disable checkbox that does not allows interaction.",
    },
    pa11y: {
      ignore: [
        "region",
        // Text or images of text that are part of an inactive user interface component have no contrast requirement.
        // https://github.com/lumada-design/hv-uikit-react/issues/775#issuecomment-557167364
        "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
        "color-contrast",
      ],
    },
  },
};

export const WithLabel = () => <HvCheckBox id="check-label" label="Label" />;

WithLabel.story = {
  parameters: {
    docs: {
      storyDescription: "A sample showcasing a checkbox that includes a label.",
    },
  },
};

export const WithClickAction = () => (
  <HvCheckBox
    id="check-click"
    label="Click me!"
    value="A"
    onChange={(event) => console.log(`my value is ${event.target.value}`)}
  />
);

WithClickAction.story = {
  parameters: {
    docs: {
      storyDescription:
        "Returns the value when clicked, check the browser console to see the result.",
    },
  },
};

export const WithClickActionDisabled = () => (
  <HvCheckBox
    id="check-click"
    label="Click me!"
    value="A"
    disabled
    onChange={(event) => console.log(`my value is ${event.target.value}`)}
  />
);

WithClickActionDisabled.story = {
  parameters: {
    docs: {
      storyDescription:
        "Dos not return the value when clicked because is disabled, check the browser console to see the result.",
    },
    pa11y: {
      ignore: [
        "region",
        // Text or images of text that are part of an inactive user interface component have no contrast requirement.
        // https://github.com/lumada-design/hv-uikit-react/issues/775#issuecomment-557167364
        "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
        "color-contrast",
      ],
    },
  },
};

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
        indeterminate={cChecked}
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
    docs: {
      storyDescription: "Demostration of how to set the state of the checkbox",
    },
    pa11y: {
      ignore: [
        "region",
        // Text or images of text that are part of an inactive user interface component have no contrast requirement.
        // https://github.com/lumada-design/hv-uikit-react/issues/775#issuecomment-557167364
        "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
        "color-contrast",
      ],
    },
  },
};
