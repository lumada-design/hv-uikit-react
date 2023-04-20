import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { Meta, StoryObj } from "@storybook/react";
import { useWidth } from "@core/hooks";
import { HvContainer, HvContainerProps, HvTypography } from "@core/components";

const meta: Meta<typeof HvContainer> = {
  title: "Components/Container",
  component: HvContainer,
};
export default meta;

export const Main: StoryObj<HvContainerProps> = {
  args: {
    maxWidth: "md",
    fixed: false,
    disableGutters: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
    component: { control: { disable: true } },
    sx: { control: { disable: true } },
  },
  render: (args) => {
    const StyledContainer = styled(HvContainer)({
      border: "1px solid",
      borderColor: theme.colors.atmo4,
      backgroundColor: theme.colors.atmo3,
      height: 100,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    });
    const width = useWidth();
    return (
      <StyledContainer {...args}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <HvTypography variant="label">Current width:</HvTypography>
          <HvTypography variant="body">{width}</HvTypography>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <HvTypography variant="label">maxWidth:</HvTypography>
          <HvTypography variant="body">{args.maxWidth}</HvTypography>
        </div>
      </StyledContainer>
    );
  },
};
