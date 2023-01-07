import { styled } from "@mui/system";
import { Meta, StoryObj } from "@storybook/react";
import { theme } from "@hitachivantara/uikit-styles";
import { Tool, Favorite, FavoriteSelected } from "@hitachivantara/uikit-icons";
import { Stack, StackProps } from "./Stack";
import {
  ActionBar,
  Card,
  CardContent,
  CardHeader,
  ToggleButton,
  Typography,
  useWidth,
} from "index";

const StyledBox = styled("div")({
  display: "flex",
  border: `1px solid ${theme.colors.sema15}`,
  backgroundColor: theme.colors.sema7,
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

const meta: Meta<typeof Stack> = {
  title: "Layout/Stack",
  component: Stack,
};
export default meta;

export const Main: StoryObj<StackProps> = {
  args: {
    divider: true,
    direction: "column",
    spacing: "sm",
  },
  argTypes: {
    classes: { control: { disable: true } },
    children: { control: { disable: true } },
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
      <Stack {...args}>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
      </Stack>
    );
  },
};

export const Spacing: StoryObj<StackProps> = {
  render: () => {
    const width = useWidth();
    return (
      <>
        <div>
          <Typography>
            This example illustrates how to configure the Stack to display
            vertically or horizontally depending on the screen width. In this
            case, for `xs` and `sm` widths the Stack will be vertical and for
            `md`, `lg` and `xl` it will be organized horizontally in a row.
            <br />
            Also, the spacing between the stack elements can be set according to
            the Design System spacing guidelines:
          </Typography>
          <Typography variant="body" link>
            https://lumada-design.github.io/uikit/master/?path=/docs/foundation-theming--main#spacing
          </Typography>
        </div>
        <br />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Typography variant="label">Current width:</Typography>
          <Typography>{width}</Typography>
        </div>
        <br />
        <div>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={"xs"}
            divider={false}
          >
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
            <Box>4</Box>
          </Stack>
        </div>
      </>
    );
  },
};

export const CustomDivider = () => {
  const StyledDivider = styled("div")({
    width: "85%",
    height: 5,
    border: `1px solid ${theme.colors.atmo5}`,
    borderRadius: 5,
    backgroundColor: theme.colors.atmo4,
    alignSelf: "center",
  });

  return (
    <>
      <Typography>
        The divider property can be a boolean in which case it defines whether
        or not to show the Material-UI Divider component. But it can also be a
        React node which allows custom dividers to be used.
      </Typography>
      <br />
      <div
        style={{
          width: 150,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <Stack spacing="xs" divider={<StyledDivider />}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
        </Stack>
      </div>
    </>
  );
};

export const WithNavigation = () => {
  return (
    <>
      <Typography>
        When the stack elements are interactive navigation can be achieved by
        tabbing into the first element of the stack and using the arrow keys to
        jump between elements.
      </Typography>
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: 275,
        }}
      >
        <Stack
          withNavigation
          direction={{ xs: "column", md: "row" }}
          divider={false}
          dividerProps={{ variant: "middle", light: true, component: "p" }}
        >
          <Card
            bgColor="atmo1"
            statusColor="sema4"
            style={{ width: 275 }}
            selectable
          >
            <CardHeader title="Card 1" icon={<Tool />} />
            <CardContent>
              <div style={{ marginTop: "20px" }}>
                <Typography variant="label">Last connected</Typography>
                <Typography>Aug 30, 2017 12:27:53 PM</Typography>
              </div>
            </CardContent>
            <ActionBar>
              <div style={{ width: 32, height: 32 }}>
                <ToggleButton
                  aria-label="Star"
                  selectedIcon={<FavoriteSelected />}
                  notSelectedIcon={<Favorite />}
                />
              </div>
              <div style={{ width: 32, height: 32 }}>
                <ToggleButton
                  aria-label="Star"
                  selectedIcon={<FavoriteSelected />}
                  notSelectedIcon={<Favorite />}
                />
              </div>
              <div style={{ width: 32, height: 32 }}>
                <ToggleButton
                  aria-label="Star"
                  selectedIcon={<FavoriteSelected />}
                  notSelectedIcon={<Favorite />}
                />
              </div>
              <div style={{ flex: 1 }} />
            </ActionBar>
          </Card>
          <Card
            bgColor="atmo1"
            statusColor="sema1"
            style={{ width: 275 }}
            selectable
          >
            <CardHeader title="Card 2" icon={<Tool />} />
            <CardContent>
              <div style={{ marginTop: "20px" }}>
                <Typography variant="label">Last connected</Typography>
                <Typography>Aug 30, 2017 12:27:53 PM</Typography>
              </div>
            </CardContent>
            <ActionBar>
              <div style={{ width: 32, height: 32 }}>
                <ToggleButton
                  aria-label="Star"
                  selectedIcon={<FavoriteSelected />}
                  notSelectedIcon={<Favorite />}
                />
              </div>
              <div style={{ width: 32, height: 32 }}>
                <ToggleButton
                  aria-label="Star"
                  selectedIcon={<FavoriteSelected />}
                  notSelectedIcon={<Favorite />}
                />
              </div>
              <div style={{ flex: 1 }} />
            </ActionBar>
          </Card>
          <Card
            bgColor="atmo1"
            statusColor="sema15"
            style={{ width: 275 }}
            selectable
          >
            <CardHeader title="Card 3" icon={<Tool />} />
            <CardContent>
              <div style={{ marginTop: "20px" }}>
                <Typography variant="label">Last connected</Typography>
                <Typography>Aug 30, 2017 12:27:53 PM</Typography>
              </div>
            </CardContent>
            <ActionBar>
              <div style={{ width: 32, height: 32 }}>
                <ToggleButton
                  aria-label="Star"
                  selectedIcon={<FavoriteSelected />}
                  notSelectedIcon={<Favorite />}
                />
              </div>
              <div style={{ width: 32, height: 32 }}>
                <ToggleButton
                  aria-label="Star"
                  selectedIcon={<FavoriteSelected />}
                  notSelectedIcon={<Favorite />}
                />
              </div>
              <div style={{ flex: 1 }} />
            </ActionBar>
          </Card>
          <Card
            bgColor="atmo1"
            statusColor="sema7"
            style={{ width: 275 }}
            selectable
          >
            <CardHeader title="Card 4" icon={<Tool />} />
            <CardContent>
              <div style={{ marginTop: "20px" }}>
                <Typography variant="label">Last connected</Typography>
                <Typography>Aug 30, 2017 12:27:53 PM</Typography>
              </div>
            </CardContent>
            <ActionBar>
              <div style={{ width: 32, height: 32 }}>
                <ToggleButton
                  aria-label="Star"
                  selectedIcon={<FavoriteSelected />}
                  notSelectedIcon={<Favorite />}
                />
              </div>
              <div style={{ width: 32, height: 32 }}>
                <ToggleButton
                  aria-label="Star"
                  selectedIcon={<FavoriteSelected />}
                  notSelectedIcon={<Favorite />}
                />
              </div>
              <div style={{ width: 32, height: 32 }}>
                <ToggleButton
                  aria-label="Star"
                  selectedIcon={<FavoriteSelected />}
                  notSelectedIcon={<Favorite />}
                />
              </div>
              <div style={{ flex: 1 }} />
            </ActionBar>
          </Card>
        </Stack>
      </div>
    </>
  );
};
