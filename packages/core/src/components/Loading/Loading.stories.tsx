import { useEffect, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { HvButton, HvTypography } from "@core/components";
import { HvLoading, HvLoadingProps } from "./Loading";

const meta: Meta<typeof HvLoading> = {
  title: "Components/Loading/Loading",
  component: HvLoading,
};
export default meta;

export const Main: StoryObj<HvLoadingProps> = {
  args: {
    label: "Loading",
    hidden: false,
    small: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return <HvLoading {...args} />;
  },
};

const Button = ({ label, variant, color = "base_dark" }) => {
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
      <HvButton variant={variant} onClick={activateTimer}>
        {(!isLoading && "Submit") || (
          <HvLoading small hidden={!isLoading} color={color} />
        )}
      </HvButton>
    </div>
  );
};

export const Buttons = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Button variant="primary" label="Primary button" color="base_light" />
      <Button variant="secondarySubtle" label="Secondary Subtle button" />
      <Button variant="secondaryGhost" label="Secondary Ghost button" />
    </div>
  );
};

const ButtonDeterminate = ({ label, children }) => (
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

  return <HvLoading label={label?.(value)} />;
};

export const Determinate = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <ButtonDeterminate label="Determine w/ percentages">
        <Progress label={(v) => `${v}%`} inc={(v) => (v === 100 ? 0 : v + 5)} />
      </ButtonDeterminate>
      <ButtonDeterminate label="Determine w/ progress">
        <Progress
          label={(v) => `${v}M/75M`}
          inc={(v) => (v >= 75 ? 0 : Math.round(v + 5))}
        />
      </ButtonDeterminate>
    </div>
  );
};
