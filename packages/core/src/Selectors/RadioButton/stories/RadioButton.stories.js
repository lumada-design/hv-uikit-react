import React, { useState } from "react";
import { HvRadio } from "../../..";

export default {
  title: "Components/Selectors/Radio",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvRadio } from '@hv/uikit-react-core/dist'"
  },
  component: HvRadio
};

export const Main = () => {
  return <HvRadio id="test" inputProps={{ "aria-label": "Radio example" }} />;
};

export const Disabled = () => (
  <HvRadio id="Radio-disabled" disabled inputProps={{ "aria-label": "Radio disabled" }} />
);

Disabled.story = {
  parameters: {
    docs: {
      storyDescription:
        "A sample showcasing a disable radio button that does not allows interaction."
    }
  }
};

export const Label = () => <HvRadio id="check-label" label="Label" />;

Label.story = {
  parameters: {
    docs: {
      storyDescription: "A sample showcasing a radio button that includes a label."
    }
  }
};

export const WithClickAction = () => (
  <HvRadio
    id="check-click"
    label="Click me!"
    value="A"
    onChange={event => console.log(`my value is ${event.target.value}`)}
  />
);

WithClickAction.story = {
  parameters: {
    docs: {
      storyDescription:
        "Returns the value when clicked, check the browser console to see the result."
    }
  }
};

export const WithClickActionDisabled = () => (
  <HvRadio
    id="check-click"
    label="Click me!"
    value="A"
    disabled
    onChange={event => console.log(`my value is ${event.target.value}`)}
  />
);

WithClickActionDisabled.story = {
  parameters: {
    docs: {
      storyDescription:
        "Dos not return the value when clicked because is disabled, check the browser console to see the result."
    }
  }
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
      <HvRadio label="Radio 1" checked={checkedRadio === valueA} onChange={onChangeRadio(valueA)} />
      <HvRadio label="Radio 2" checked={checkedRadio === valueB} onChange={onChangeRadio(valueB)} />
    </div>
  );
};

WithState.story = {
  parameters: {
    docs: {
      storyDescription: "Demostration of how to set the state of the radio button"
    }
  }
};
