import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { Meta, StoryObj } from "@storybook/react";
import { useWidth } from "hooks";
import { Typography } from "..";
import { Container, ContainerProps } from "./Container";

const meta: Meta<typeof Container> = {
  title: "Layout/Container",
  component: Container,
};
export default meta;

export const Main: StoryObj<ContainerProps> = {
  args: {
    maxWidth: "md",
  },
  argTypes: {
    classes: { control: { disable: true } },
    component: { control: { disable: true } },
  },
  render: (args) => {
    const StyledContainer = styled(Container)({
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
          <Typography variant="label">Current width:</Typography>
          <Typography variant="body">{width}</Typography>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Typography variant="label">maxWidth:</Typography>
          <Typography variant="body">{args.maxWidth}</Typography>
        </div>
      </StyledContainer>
    );
  },
};
