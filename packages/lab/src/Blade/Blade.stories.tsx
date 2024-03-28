import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvButton,
  HvInput,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { HvBlade, HvBladeProps } from "@hitachivantara/uikit-react-lab";

const meta: Meta<typeof HvBlade> = {
  title: "Lab/Blades/Blade",
  component: HvBlade,
};
export default meta;

export const Main: StoryObj<HvBladeProps> = {
  args: {
    label: "Show answer",
    labelVariant: "label",
    headingLevel: undefined,
    expanded: undefined,
    defaultExpanded: false,
    fullWidth: false,
    disabled: false,
    children: (
      <div style={{ padding: theme.spacing("xs") }}>
        To get to the other side
      </div>
    ),
  },
  argTypes: {
    classes: { control: { disable: true } },
    buttonProps: { control: { disable: true } },
    containerProps: { control: { disable: true } },
    children: { control: { disable: true } },
  },
  render: (args) => {
    return (
      <>
        <HvTypography variant="label" component="h2">
          Question
        </HvTypography>
        <p style={{ marginBottom: 15 }}>Why did the chicken cross the road?</p>
        <div style={{ display: "flex" }}>
          <HvBlade
            {...args}
            containerProps={{ style: { whiteSpace: "nowrap" } }}
          />
        </div>
      </>
    );
  },
};

export const Disabled: StoryObj<HvBladeProps> = {
  render: () => {
    return (
      <div style={{ display: "flex" }}>
        <HvBlade label="Hidden information" headingLevel={3} disabled>
          <div style={{ whiteSpace: "nowrap" }}>Content never shown</div>
        </HvBlade>
      </div>
    );
  },
};

export const Controlled: StoryObj<HvBladeProps> = {
  parameters: {
    eyes: { include: false },
  },
  render: () => {
    const [expandedState, setExpandedState] = useState(true);
    const handleToggle = (newState?: boolean) => {
      setExpandedState(newState ?? ((oldState) => !oldState));
    };

    return (
      <>
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <HvButton variant="secondarySubtle" onClick={() => handleToggle()}>
            Toggle
          </HvButton>
          <HvButton
            variant="secondarySubtle"
            onClick={() => handleToggle(true)}
          >
            Open
          </HvButton>
          <HvButton
            variant="secondarySubtle"
            onClick={() => handleToggle(false)}
          >
            Close
          </HvButton>
        </div>
        <div style={{ display: "flex", maxHeight: 300 }}>
          <HvBlade
            label="Contact form"
            onChange={(e, state) => handleToggle(state)}
            expanded={expandedState}
            fullWidth
          >
            <form style={{ padding: theme.spacing("xs", "sm") }}>
              <HvInput label="Name" placeholder="Insert first name" required />
              <HvInput label="Email" placeholder="Insert your email" required />
              <HvInput label="Phone" placeholder="Insert your phone number" />
              <HvInput label="Extension" placeholder="Insert phone extension" />
              <HvInput label="Country" placeholder="Insert country name" />
              <HvInput
                label="City/Province"
                placeholder="Insert province name"
              />
            </form>
          </HvBlade>
        </div>
      </>
    );
  },
};
