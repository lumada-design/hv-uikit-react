import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@phosphor-icons/react";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvIconContainer,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvIconContainer> = {
  title: "Components/Icon Container",
  component: HvIconContainer,
};
export default meta;

export const Main: StoryObj<typeof HvIconContainer> = {
  args: {
    color: "primary",
    size: "md",
    rotate: false,
  },
  render: (args) => {
    return (
      <HvIconContainer {...args}>
        <FontAwesomeIcon icon={faUser} />
      </HvIconContainer>
    );
  },
};

export const Variants: StoryObj<typeof HvIconContainer> = {
  args: {
    color: "primary",
    rotate: false,
  },
  render: (args) => {
    return (
      <div className="grid gap-xs">
        <HvTypography variant="title3">Phosphor Icons</HvTypography>
        <div className="flex gap-xs items-center">
          <HvIconContainer size="xs" {...args}>
            <User />
          </HvIconContainer>
          <HvIconContainer size="sm" {...args}>
            <User />
          </HvIconContainer>
          <HvIconContainer size="md" {...args}>
            <User />
          </HvIconContainer>
          <HvIconContainer size="lg" {...args}>
            <User />
          </HvIconContainer>
          <HvIconContainer size="xl" {...args}>
            <User />
          </HvIconContainer>
        </div>
        <br />
        <HvTypography variant="title3">FontAwesome</HvTypography>
        <div className="flex gap-xs items-center">
          <HvIconContainer size="xs" {...args}>
            <FontAwesomeIcon icon={faUser} />
          </HvIconContainer>
          <HvIconContainer size="sm" {...args}>
            <FontAwesomeIcon icon={faUser} />
          </HvIconContainer>
          <HvIconContainer size="md" {...args}>
            <FontAwesomeIcon icon={faUser} />
          </HvIconContainer>
          <HvIconContainer size="lg" {...args}>
            <FontAwesomeIcon icon={faUser} />
          </HvIconContainer>
          <HvIconContainer size="xl" {...args}>
            <FontAwesomeIcon icon={faUser} />
          </HvIconContainer>
        </div>
      </div>
    );
  },
};
