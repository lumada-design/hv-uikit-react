import { StoryObj } from "@storybook/react";
import { HvStack, theme } from "@hitachivantara/uikit-react-core";

export default {
  title: "Tests/Stack",
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
};

const Box = ({ children }: { children?: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      color: theme.colors.base_dark,
      border: `1px solid ${theme.colors.sema15}`,
      backgroundColor: theme.colors.neutral_20,
      width: 150,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      flexWrap: "wrap",
    }}
  >
    {children}
  </div>
);

export const Main: StoryObj = {
  render: () => (
    <>
      <div style={{ display: "flex", gap: 20 }}>
        <HvStack>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
        </HvStack>
        <HvStack spacing="md">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
        </HvStack>
        <HvStack divider>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
        </HvStack>
        <HvStack divider spacing="md">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
        </HvStack>
      </div>
      <br />
      <br />
      <HvStack divider direction="row">
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
      </HvStack>
      <br />
      <br />
      <HvStack direction="row">
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
      </HvStack>
    </>
  ),
};
