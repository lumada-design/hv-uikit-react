import { Meta, StoryObj } from "@storybook/react";
import {
  HvListContainer,
  HvListItem,
  HvLoadingContainer,
  HvLoadingContainerProps,
  HvPanel,
} from "@hitachivantara/uikit-react-core";

export default {
  title: "Components/Loading/Loading Container",
  component: HvLoadingContainer,
} satisfies Meta<typeof HvLoadingContainer>;

export const Main: StoryObj<HvLoadingContainerProps> = {
  args: {
    label: "Loading",
    opacity: 0.8,
    hidden: false,
    small: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => (
    <HvLoadingContainer style={{ display: "inline-flex" }} {...args}>
      <HvPanel style={{ width: 300 }}>
        <HvListContainer>
          {[...Array(4).keys()].map((i) => (
            <HvListItem key={i}>Item {i + 1}</HvListItem>
          ))}
        </HvListContainer>
      </HvPanel>
    </HvLoadingContainer>
  ),
};
