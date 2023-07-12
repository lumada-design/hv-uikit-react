import { Meta, StoryObj } from "@storybook/react";
import {
  HvTypography,
  HvProgressBar,
  HvProgressBarProps,
} from "@core/components";
import { ProgressBarSimulator } from "./ProgressBarSimulator";

const meta: Meta<typeof HvProgressBar> = {
  title: "Components/Loading/Progress Bar",
  component: HvProgressBar,
};
export default meta;

export const Main: StoryObj<HvProgressBarProps> = {
  args: {
    value: 0,
  },
  argTypes: {
    classes: { control: { disable: true } },
    labelProps: { control: { disable: true } },
    value: { control: { type: "range" } },
  },
  render: (args) => {
    return <HvProgressBar {...args} />;
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
    eyes: { include: false },
  },
  render: () => {
    return (
      <div
        style={{
          display: "flex:",
          flexDirection: "column",
        }}
      >
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
      </div>
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
      <div
        style={{
          display: "flex:",
          flexDirection: "column",
        }}
      >
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
            labelProps={{
              "aria-label": "Example Determined Progress Bar",
              // "aria-busy":run,
              "aria-live": "polite",
            }}
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
            labelProps={{
              "aria-label": "Example Determined Loading Progress Bar",
              // "aria-busy":run,
              "aria-live": "polite",
            }}
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
            labelProps={{
              "aria-label": "Example Determined Error Progress Bar",
              // "aria-busy":run,
              "aria-live": "polite",
            }}
          />
        </div>
      </div>
    );
  },
};
