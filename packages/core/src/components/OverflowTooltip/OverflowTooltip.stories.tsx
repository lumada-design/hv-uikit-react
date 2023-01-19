import { styled } from "@mui/system";
import { Meta, StoryObj } from "@storybook/react";
import { HvOverflowTooltip, HvOverflowTooltipProps } from "components";

const Container = ({ children }) => {
  const StyledContainer = styled("div")({ display: "flex" });

  const StyledDiv = styled("div")({
    display: "flex",
    textAlign: "center",
    justifyContent: "space-between",
    maxWidth: 200,
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: "0 auto",
    paddingTop: 80,
  });

  return (
    <StyledContainer>
      <StyledDiv>{children}</StyledDiv>
    </StyledContainer>
  );
};

const meta: Meta<typeof HvOverflowTooltip> = {
  title: "Overlay/OverflowTooltip",
  component: HvOverflowTooltip,
  decorators: [(Story) => <Container>{Story()}</Container>],
};
export default meta;

export const Main: StoryObj<HvOverflowTooltipProps> = {
  args: {
    placement: "top-start",
    data: "This is a very long text that should be cut because it so long that it doesn't fit",
    paragraphOverflow: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return <HvOverflowTooltip {...args}>List</HvOverflowTooltip>;
  },
};
