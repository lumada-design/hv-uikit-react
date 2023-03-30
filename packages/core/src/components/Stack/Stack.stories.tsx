import { Meta, StoryObj } from "@storybook/react";
import { theme } from "@hitachivantara/uikit-styles";
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
} from "components";
import { useWidth } from "hooks";
import styled from "@emotion/styled";

const StyledBox = styled("div")({
  display: "flex",
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

const Box = ({ children }) => <StyledBox>{children}</StyledBox>;

const meta: Meta<typeof HvStack> = {
  title: "Components/Stack",
  component: HvStack,
};
export default meta;

export const Main: StoryObj<HvStackProps> = {
  args: {
    divider: true,
    direction: "column",
    spacing: "sm",
  },
  argTypes: {
    classes: { control: { disable: true } },
    children: { control: { disable: true } },
    dividerProps: { control: { disable: true } },
    direction: { control: { type: "radio", options: ["column", "row"] } },
    spacing: {
      control: { type: "radio", options: ["xs", "sm", "md", "lg", "xl"] },
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
  render: () => {
    const width = useWidth();
    return (
      <>
        <div>
          <HvTypography>
            This example illustrates how to configure the Stack to display
            vertically or horizontally depending on the screen width. In this
            case, for `xs` and `sm` widths the Stack will be vertical and for
            `md`, `lg` and `xl` it will be organized horizontally in a row.
            <br />
            Also, the spacing between the stack elements can be set according to
            the Design System spacing guidelines:
          </HvTypography>
          <HvTypography variant="body" link>
            https://lumada-design.github.io/uikit/master/?path=/docs/foundation-theming--main#spacing
          </HvTypography>
        </div>
        <br />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <HvTypography variant="label">Current width:</HvTypography>
          <HvTypography>{width}</HvTypography>
        </div>
        <br />
        <div>
          <HvStack
            direction={{ xs: "column", md: "row" }}
            spacing={"xs"}
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
    width: "85%",
    height: 5,
    border: `1px solid ${theme.colors.secondary_60}`,
    borderRadius: 5,
    backgroundColor: theme.colors.atmo4,
    alignSelf: "center",
  });

  return (
    <>
      <HvTypography>
        The divider property can be a boolean in which case it defines whether
        or not to show the Material-UI Divider component. But it can also be a
        React node which allows custom dividers to be used.
      </HvTypography>
      <br />
      <div
        style={{
          width: 150,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <HvStack spacing="xs" divider={<StyledDivider />}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
        </HvStack>
      </div>
    </>
  );
};

export const WithNavigation = () => {
  return (
    <>
      <HvTypography>
        When the stack elements are interactive navigation can be achieved by
        tabbing into the first element of the stack and using the arrow keys to
        jump between elements.
      </HvTypography>
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: 275,
        }}
      >
        <HvStack
          withNavigation
          direction={{ xs: "column", md: "row" }}
          divider={false}
          dividerProps={{ variant: "middle", light: true }}
        >
          <HvCard
            bgcolor="atmo1"
            statusColor="negative"
            style={{ width: 275 }}
            selectable
          >
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
          <HvCard
            bgcolor="atmo1"
            statusColor="positive"
            style={{ width: 275 }}
            selectable
          >
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
          <HvCard
            bgcolor="atmo1"
            statusColor="sema15"
            style={{ width: 275 }}
            selectable
          >
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
          <HvCard
            bgcolor="atmo1"
            statusColor="neutral_20"
            style={{ width: 275 }}
            selectable
          >
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
      </div>
    </>
  );
};
