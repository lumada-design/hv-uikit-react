import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  HvListContainer,
  HvListItem,
  HvLoadingContainer,
  HvLoadingContainerProps,
  HvPanel,
} from "@hitachivantara/uikit-react-core";

import { setupChromatic } from ".storybook/setupChromatic";

export default {
  title: "Components/Loading Container",
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
  parameters: {
    ...setupChromatic(),
  },
  render: (args) => (
    <HvLoadingContainer className="inline-flex" {...args}>
      <HvPanel className="w-300px">
        <HvListContainer>
          {[...Array(4).keys()].map((i) => (
            <HvListItem key={i}>Item {i + 1}</HvListItem>
          ))}
        </HvListContainer>
      </HvPanel>
    </HvLoadingContainer>
  ),
};
