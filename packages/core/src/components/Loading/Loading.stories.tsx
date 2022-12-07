import { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { HvButton, HvTypography } from "..";
import { Loading, LoadingProps } from "./Loading";

const meta: Meta<typeof Loading> = {
  title: "Feedback/Loading",
  component: Loading,
};
export default meta;

export const Main: StoryObj<LoadingProps> = {
  args: {
    label: "Loading",
    hidden: false,
    small: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return <Loading {...args} />;
  },
};

export const Buttons = () => {
  const ExampleBox = ({ label, category, color = "base2" }) => {
    const [isLoading, setIsLoading] = useState(false);

    const activateTimer = () => {
      if (!isLoading) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    };

    return (
      <div style={{ textAlign: "center" }}>
        <HvTypography
          variant="caption1"
          style={{
            marginBottom: "5px",
          }}
        >
          {label}
        </HvTypography>
        <HvButton variant={category} onClick={activateTimer}>
          {(!isLoading && "Submit") || (
            <Loading small hidden={!isLoading} color={color} />
          )}
        </HvButton>
      </div>
    );
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <ExampleBox category="primary" label="Primary button" color="base1" />
      <ExampleBox category="secondarySubtle" label="Secondary Subtle button" />
      <ExampleBox category="secondaryGhost" label="Secondary Ghost button" />
    </div>
  );
};

export const Determinate = () => {
  const ExampleBox = ({ label, children }) => (
    <div>
      <HvTypography variant="caption1">{label}</HvTypography>
      <br />
      {children}
    </div>
  );

  const Progress = ({ label, inc }) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setValue(inc);
      }, 500);
      return () => clearInterval(interval);
    }, [inc]);

    return <Loading label={label?.(value)} />;
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <ExampleBox label="Determine w/ percentages">
        <Progress label={(v) => `${v}%`} inc={(v) => (v === 100 ? 0 : v + 5)} />
      </ExampleBox>
      <ExampleBox label="Determine w/ progress">
        <Progress
          label={(v) => `${v}M/75M`}
          inc={(v) => (v >= 75 ? 0 : Math.round(v + 5))}
        />
      </ExampleBox>
    </div>
  );
};
