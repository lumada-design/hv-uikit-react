import { Meta, StoryFn, StoryObj } from "@storybook/react";
import {
  Tool,
  Favorite,
  FavoriteSelected,
} from "@hitachivantara/uikit-react-icons";
import {
  HvActionBar,
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvToggleButton,
  HvTypography,
  HvStack,
  HvStackProps,
  HvButton,
  theme,
  useWidth,
} from "@hitachivantara/uikit-react-core";
import styled from "@emotion/styled";

const Box = styled("div")({
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
  "& > *": {
    margin: "0 10px 5px 0",
  },
});

Box.displayName = "Box";

const meta: Meta<typeof HvStack> = {
  title: "Components/Stack",
  component: HvStack,
};
export default meta;

export const Main: StoryObj<HvStackProps> = {
  args: {
    divider: true,
    direction: "row",
    spacing: "sm",
  },
  argTypes: {
    classes: { control: { disable: true } },
    dividerProps: { control: { disable: true } },
    direction: { control: { type: "radio" }, options: ["column", "row"] },
    spacing: {
      control: { type: "radio" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
  decorators: [
    (Story, { args }) => (
      <div style={{ width: args.direction === "column" ? 150 : "100%" }}>
        {Story()}
      </div>
    ),
  ],
  render: (args) => {
    return (
      <HvStack {...args}>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
      </HvStack>
    );
  },
};

export const Spacing: StoryObj<HvStackProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "This example illustrates how to configure the Stack to display vertically or horizontally depending on the screen width. In this case, for `xs` and `sm` widths the Stack will be vertical and for `md`, `lg` and `xl` it will be organized horizontally in a row.",
      },
    },
  },
  render: () => {
    const width = useWidth();
    return (
      <>
        <br />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <HvTypography variant="label">Current width:</HvTypography>
          <HvTypography>{width}</HvTypography>
        </div>
        <br />
        <div>
          <HvStack
            direction={{ xs: "column", md: "row" }}
            spacing="xs"
            divider={false}
          >
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
            <Box>4</Box>
          </HvStack>
        </div>
      </>
    );
  },
};

export const CustomDivider = () => {
  const StyledDivider = styled("div")({
    width: 150,
    height: 5,
    border: `1px solid ${theme.colors.secondary_60}`,
    borderRadius: 5,
    backgroundColor: theme.colors.atmo4,
    alignSelf: "center",
  });

  return (
    <HvStack
      style={{ display: "inline-flex" }}
      spacing="xs"
      divider={<StyledDivider />}
    >
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
      <Box>4</Box>
    </HvStack>
  );
};

CustomDivider.parameters = {
  eyes: { include: false },
  docs: {
    description: {
      story:
        "The `divider` property can be a boolean (rendering the MUI Divider), or a `ReactNode` which allows custom dividers to be used.",
    },
  },
};

export const WithNavigation: StoryFn<HvStackProps> = () => {
  return (
    <HvStack
      withNavigation
      direction={{ xs: "column", md: "row" }}
      divider={false}
      dividerProps={{ variant: "middle", light: true }}
    >
      <HvCard bgcolor="atmo1" statusColor="negative" style={{ width: 275 }}>
        <HvCardHeader title="Card 1" icon={<Tool />} />
        <HvCardContent>
          <div style={{ marginTop: "20px" }}>
            <HvTypography variant="label">Last connected</HvTypography>
            <HvTypography>Aug 30, 2017 12:27:53 PM</HvTypography>
          </div>
        </HvCardContent>
        <HvActionBar>
          <div style={{ width: 32, height: 32 }}>
            <HvToggleButton
              aria-label="Star"
              selectedIcon={<FavoriteSelected />}
              notSelectedIcon={<Favorite />}
            />
          </div>
          <div
            style={{
              width: 32,
              height: 32,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <HvButton variant="secondaryGhost">View</HvButton>
          </div>
          <div style={{ flex: 1 }} />
        </HvActionBar>
      </HvCard>
      <HvCard bgcolor="atmo1" statusColor="positive" style={{ width: 275 }}>
        <HvCardHeader title="Card 2" icon={<Tool />} />
        <HvCardContent>
          <div style={{ marginTop: "20px" }}>
            <HvTypography variant="label">Last connected</HvTypography>
            <HvTypography>Aug 30, 2017 12:27:53 PM</HvTypography>
          </div>
        </HvCardContent>
        <HvActionBar>
          <div style={{ width: 32, height: 32 }}>
            <HvToggleButton
              aria-label="Star"
              selectedIcon={<FavoriteSelected />}
              notSelectedIcon={<Favorite />}
            />
          </div>
          <div style={{ width: 32, height: 32 }}>
            <HvButton variant="secondaryGhost">View</HvButton>
          </div>
          <div style={{ flex: 1 }} />
        </HvActionBar>
      </HvCard>
      <HvCard bgcolor="atmo1" statusColor="sema15" style={{ width: 275 }}>
        <HvCardHeader title="Card 3" icon={<Tool />} />
        <HvCardContent>
          <div style={{ marginTop: "20px" }}>
            <HvTypography variant="label">Last connected</HvTypography>
            <HvTypography>Aug 30, 2017 12:27:53 PM</HvTypography>
          </div>
        </HvCardContent>
        <HvActionBar>
          <div style={{ width: 32, height: 32 }}>
            <HvToggleButton
              aria-label="Star"
              selectedIcon={<FavoriteSelected />}
              notSelectedIcon={<Favorite />}
            />
          </div>
          <div style={{ width: 32, height: 32 }}>
            <HvButton variant="secondaryGhost">View</HvButton>
          </div>
          <div style={{ flex: 1 }} />
        </HvActionBar>
      </HvCard>
      <HvCard bgcolor="atmo1" statusColor="neutral_20" style={{ width: 275 }}>
        <HvCardHeader title="Card 4" icon={<Tool />} />
        <HvCardContent>
          <div style={{ marginTop: "20px" }}>
            <HvTypography variant="label">Last connected</HvTypography>
            <HvTypography>Aug 30, 2017 12:27:53 PM</HvTypography>
          </div>
        </HvCardContent>
        <HvActionBar>
          <div style={{ width: 32, height: 32 }}>
            <HvButton variant="secondaryGhost">View</HvButton>
          </div>
          <div style={{ flex: 1 }} />
        </HvActionBar>
      </HvCard>
    </HvStack>
  );
};

WithNavigation.decorators = [
  (Story) => <div style={{ overflow: "auto" }}>{Story()}</div>,
];
WithNavigation.parameters = {
  eyes: { include: false },
  docs: {
    description: {
      story:
        "When the stack elements are interactive navigation can be achieved by tabbing into the first element of the stack and using the arrow keys to jump between elements.",
    },
  },
};
