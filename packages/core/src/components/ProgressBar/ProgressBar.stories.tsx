import { Meta, StoryObj } from "@storybook/react";
import { Typography } from "..";
import { ProgressBar, ProgressBarProps } from "./ProgressBar";
import ProgressBarSimulator from "./ProgressBarSimulator";

const meta: Meta<typeof ProgressBar> = {
  title: "Feedback/ProgressBar",
  component: ProgressBar,
};
export default meta;

export const Main: StoryObj<ProgressBarProps> = {
  args: {
    value: 0,
  },
  argTypes: {
    classes: { control: { disable: true } },
    value: { control: { type: "range" } },
  },
  render: (args) => {
    return <ProgressBar {...args} />;
  },
};

export const Indeterminate: StoryObj<ProgressBarProps> = {
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
          <Typography variant="label">Success</Typography>
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
          <Typography variant="label">Error</Typography>
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

export const Determinate: StoryObj<ProgressBarProps> = {
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
          <Typography variant="label">Success</Typography>
          <ProgressBar
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
          <Typography variant="label">Loading</Typography>
          <ProgressBar
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
          <Typography variant="label">Error</Typography>
          <ProgressBar
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
