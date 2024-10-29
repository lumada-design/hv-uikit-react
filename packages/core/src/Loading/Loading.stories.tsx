import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvButton,
  HvButtonProps,
  HvLoading,
  HvLoadingProps,
} from "@hitachivantara/uikit-react-core";

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

export const Variants: StoryObj<HvLoadingProps> = {
  decorators: [
    (Story) => (
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {Story()}
      </div>
    ),
  ],
  render: () => {
    return (
      <>
        <HvLoading />
        <HvLoading small color="" />
        <HvLoading color="positive" />
        <HvLoading label="Loading" />
      </>
    );
  },
};

const LoadingButton = ({ onClick, ...others }: HvButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <HvButton
      style={{ width: 120 }}
      onClick={async (event) => {
        setIsLoading(true);
        await onClick?.(event);
        setIsLoading(false);
      }}
      {...others}
    >
      {!isLoading ? (
        "Submit"
      ) : (
        <HvLoading small hidden={!isLoading} color="inherit" />
      )}
    </HvButton>
  );
};

export const Buttons = () => {
  const handleClick = async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <LoadingButton variant="primary" onClick={handleClick} />
      <LoadingButton variant="secondarySubtle" onClick={handleClick} />
      <LoadingButton variant="secondaryGhost" onClick={handleClick} />
    </div>
  );
};
