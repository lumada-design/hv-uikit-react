import React from "react";
import { HvSwitch } from "../..";

export default {
  title: "Components/Selectors/Switch",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvSwitch } from '@hv/uikit-react-core/dist'"
  },
  component: HvSwitch
};

export const Main = () => {
  return <HvSwitch />;
};

export const OnChange = () => (
  <HvSwitch
    checked
    id="Switch-no-labels"
    aria-label="Engine Control"
    displayIconChecked
    onChange={(event, state) => alert(`The value of the switch is ${state}`)}
  />
);

OnChange.story = {
  parameters: {
    docs: {
      storyDescription: "OnChange is called in the labels as in the switch itself."
    }
  }
};

export const NoLabels = () => (
  <HvSwitch
    checked
    id="Switch-no-labels"
    showLabels={false}
    aria-label="Engine Control"
    displayIconChecked
  />
);

export const LabelsDefinition = () => {
  const labels = {
    left: "Disconnect",
    right: "Connect"
  };

  return <HvSwitch checked={false} labels={labels} aria-label="Server online" />;
};

export const Disabled = () => <HvSwitch disabled />;
