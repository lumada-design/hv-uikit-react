import { HvButton, HvMultiButton } from "@hitachivantara/uikit-react-core";
import { LocationPin } from "@hitachivantara/uikit-react-icons";
import { StoryObj } from "@storybook/react";

export default {
  title: "Tests/Multi Button",
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
};

export const Main: StoryObj = {
  render: () => (
    <>
      <HvMultiButton>
        {["Label 1", "Label2"].map((button) => (
          <HvButton key={button}>{button}</HvButton>
        ))}
      </HvMultiButton>
      <br />
      <HvMultiButton>
        {["Label 1", "Label2"].map((button, i) => (
          <HvButton key={button} selected={i === 0}>
            {button}
          </HvButton>
        ))}
      </HvMultiButton>
      <br />
      <HvMultiButton style={{ width: "64px" }}>
        {[
          { name: "Label 1", icon: <LocationPin /> },
          { name: "Label 2", icon: <LocationPin /> },
          { name: "Label 3", icon: <LocationPin /> },
        ].map(({ name, icon }, i) => (
          <HvButton key={name} icon aria-label={name} selected={i === 1}>
            {icon}
          </HvButton>
        ))}
      </HvMultiButton>
      <br />
      <HvMultiButton disabled>
        {["Label 1", "Label2", "Label 3"].map((button) => (
          <HvButton key={button}>{button}</HvButton>
        ))}
      </HvMultiButton>
      <br />
      <HvMultiButton disabled>
        {["Label 1", "Label2", "Label 3"].map((button, i) => (
          <HvButton key={button} selected={i === 2}>
            {button}
          </HvButton>
        ))}
      </HvMultiButton>
      <br />
      <HvMultiButton>
        {["Label 1", "Label2", "Label 3", "Label 4"].map((button, i) => (
          <HvButton
            key={button}
            selected={i === 0}
            disabled={i === 2}
            endIcon={<LocationPin />}
          >
            {button}
          </HvButton>
        ))}
      </HvMultiButton>
      <br />
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        <HvMultiButton vertical style={{ width: "120px" }}>
          {["Label 1", "Label2", "Label 3", "Label 4"].map((button) => (
            <HvButton key={button}>{button}</HvButton>
          ))}
        </HvMultiButton>
        <br />
        <HvMultiButton vertical style={{ width: "120px" }}>
          {["Label 1", "Label2", "Label 3", "Label 4"].map((button, i) => (
            <HvButton
              key={button}
              selected={i === 0 || i === 2}
              startIcon={<LocationPin />}
            >
              {button}
            </HvButton>
          ))}
        </HvMultiButton>
        <br />
        <HvMultiButton vertical style={{ width: "32px" }}>
          {[
            { name: "Label 1", icon: <LocationPin /> },
            { name: "Label 2", icon: <LocationPin /> },
            { name: "Label 3", icon: <LocationPin /> },
            { name: "Label 4", icon: <LocationPin /> },
          ].map(({ name, icon }, i) => (
            <HvButton
              key={name}
              icon
              aria-label={name}
              selected={i === 1 || i === 2}
            >
              {icon}
            </HvButton>
          ))}
        </HvMultiButton>
      </div>
    </>
  ),
};
