import React, { useState } from "react";
import { HvRadio } from "../../..";

export default {
  title: "Components/Selectors/Radio",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvRadio } from "@hitachivantara/uikit-react-core";',
  },
  component: HvRadio,
};

export const Main = () => {
  return <HvRadio inputProps={{ "aria-label": "Simple radio button" }} />;
};

export const Disabled = () => (
  <HvRadio id="radio1" disabled inputProps={{ "aria-label": "Radio disabled" }} />
);

Disabled.story = {
  parameters: {
    docs: {
      storyDescription:
        "A sample showcasing a disabled radio button that does not allows interaction.",
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

export const CheckedDisabled = () => (
  <HvRadio id="radio1" disabled checked inputProps={{ "aria-label": "Radio disabled" }} />
);

CheckedDisabled.story = {
  parameters: {
    docs: {
      storyDescription:
        "A sample showcasing a checked and disabled radio button that does not allows interaction.",
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

export const Label = () => <HvRadio id="radio1" label="Label" />;

Label.story = {
  parameters: {
    docs: {
      storyDescription: "A sample showcasing a radio button that includes a label.",
    },
  },
};

export const WithClickAction = () => (
  <HvRadio
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
  <HvRadio
    id="radio1"
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
    eyes: {
      // this sample showcases functionality, the disabled state is already showcased above
      include: false,
    },
  },
};

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
        label="Radio 1"
        checked={checkedRadio === valueA}
        onChange={onChangeRadio(valueA)}
      />
      <HvRadio
        id="radio2"
        label="Radio 2"
        checked={checkedRadio === valueB}
        onChange={onChangeRadio(valueB)}
      />
    </div>
  );
};

WithState.story = {
  parameters: {
    docs: {
      storyDescription: "Demostration of how to set the state of the radio button",
    },
  },
};
