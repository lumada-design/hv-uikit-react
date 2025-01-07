import { faAtom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Meta, StoryObj } from "@storybook/react";
import { HvIconContainer } from "@hitachivantara/uikit-react-icons";

const meta: Meta<typeof HvIconContainer> = {
  title: "Components/Icon Container",
  component: HvIconContainer,
};
export default meta;

export const Main: StoryObj<typeof HvIconContainer> = {
  render: (args) => {
    return (
      <HvIconContainer {...args}>
        <FontAwesomeIcon icon={faAtom} />
      </HvIconContainer>
    );
  },
};
