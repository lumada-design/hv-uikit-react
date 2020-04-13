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
  return (
    <HvSwitch
      id="Switch-main"
      checked={false}
      onChange={e => alert(e.target.checked ? "On" : "Off")}
      aria-label="Engine Control"
    />
  );
};

export const NoLabels = () => (
  <HvSwitch
    checked
    id="Switch-no-labels"
    disabled={false}
    showLabels={false}
    aria-label="Engine Control"
    displayIconChecked
  />
);

NoLabels.story = {
  parameters: {
    docs: {
      storyDescription: "A sample showcasing a switch without labels."
    }
  }
};

export const Label = () => {
  const labels = {
    left: "Disconnect",
    right: "Connect"
  };

  return <HvSwitch checked={false} labels={labels} aria-label="Server online" />;
};

Label.story = {
  parameters: {
    docs: {
      storyDescription: "A sample showcasing a switch that includes a label."
    }
  }
};

export const Disabled = () => <HvSwitch disabled checked={false} />;

Disabled.story = {
  parameters: {
    docs: {
      storyDescription: "A sample showcasing a disabled switch that does not allow interaction."
    }
  }
};
