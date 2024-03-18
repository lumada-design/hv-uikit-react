import { Meta, StoryObj } from "@storybook/react";
import {
  HvTypography,
  HvProgressBar,
  HvProgressBarProps,
} from "@hitachivantara/uikit-react-core";

import { ProgressBarSimulator } from "./ProgressBarSimulator";

const meta: Meta<typeof HvProgressBar> = {
  title: "Components/Loading/Progress Bar",
  component: HvProgressBar,
  decorators: [(Story) => <div style={{ padding: 20 }}>{Story()}</div>],
};
export default meta;

export const Main: StoryObj<HvProgressBarProps> = {
  args: {
    value: 0,
    hideLabel: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
    labelProps: { control: { disable: true } },
    value: { control: { type: "range" } },
  },
  render: (args) => {
    return <HvProgressBar aria-label="Status" {...args} />;
  },
};

export const Progressive: StoryObj<HvProgressBarProps> = {
  args: {
    value: 0,
  },
  argTypes: {
    classes: { control: { disable: true } },
    value: { control: { type: "range" } },
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  render: () => {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            width: 400,
            margin: "auto",
            marginTop: 20,
            marginBottom: 40,
          }}
        >
          <HvTypography variant="label">Success</HvTypography>
          <ProgressBarSimulator
            inc={(v) => v + 10}
            ariaLabel="Determinate Progress Bar"
            ariaLive="assertive"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            width: 400,
            margin: "auto",
          }}
        >
          <HvTypography variant="label">Error</HvTypography>
          <ProgressBarSimulator
            inc={(v) => v + 5}
            error={30}
            ariaLabel="Determinate Progress Bar"
          />
        </div>
      </>
    );
  },
};

export const Determinate: StoryObj<HvProgressBarProps> = {
  args: {
    value: 0,
  },
  argTypes: {
    classes: { control: { disable: true } },
    value: { control: { type: "range" } },
  },
  render: () => {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            width: 400,
            margin: "auto",
            marginTop: 20,
            marginBottom: 40,
          }}
        >
          <HvTypography variant="label">Success</HvTypography>
          <HvProgressBar
            value={100}
            status="completed"
            aria-label="Example Determined Progress Bar"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            width: 400,
            margin: "auto",
            marginTop: 20,
            marginBottom: 40,
          }}
        >
          <HvTypography variant="label">Loading</HvTypography>
          <HvProgressBar
            value={40}
            aria-label="Example Determined Loading Progress Bar"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            width: 400,
            margin: "auto",
          }}
        >
          <HvTypography variant="label">Error</HvTypography>
          <HvProgressBar
            value={30}
            status="error"
            aria-label="Example Determined Error Progress Bar"
          />
        </div>
      </>
    );
  },
};
