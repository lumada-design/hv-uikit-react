import { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardContent, CardMedia, CardProps } from "./";
import { Typography } from "components";
import compressor from "./assets/compressor.png";

const colors = [
  "sema0",
  "sema1",
  "sema2",
  "sema3",
  "sema4",
  "sema5",
  "sema6",
  "sema7",
  "sema8",
  "sema9",
  "sema10",
  "sema11",
  "sema12",
  "sema13",
  "sema14",
  "sema15",
  "sema16",
  "sema17",
  "sema18",
  "sema19",
  "sema20",
  "atmo1",
  "atmo2",
  "atmo3",
  "atmo4",
  "atmo5",
];

const meta: Meta<typeof Card> = {
  title: "Display/Card",
  component: Card,
  decorators: [(Story) => <div style={{ margin: 20 }}>{Story()}</div>],
};
export default meta;

export const Main: StoryObj<CardProps> = {
  args: {
    bgColor: "atmo1",
    statusColor: "sema4",
    selectable: false,
    selected: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
    icon: { control: { disable: true } },
    bgColor: { control: { type: "select", options: colors } },
    statusColor: { control: { type: "select", options: colors } },
  },
  render: ({ bgColor, statusColor, selectable, selected }) => {
    return (
      <Card
        bgColor={bgColor}
        statusColor={statusColor}
        style={{ width: 360 }}
        selectable={selectable}
        selected={selected}
      >
        <CardHeader
          title="Asset Avatar L90"
          subheader="Compressor"
          aria-label="Compressor"
        />
        <CardMedia
          component="img"
          // @ts-ignore
          alt="Compressor"
          height={140}
          image={compressor}
        />
        <CardContent>
          <div style={{ paddingTop: "20px" }}>
            <Typography variant="label">ID</Typography>
            <Typography>2101cad3-7cd4-1000-bdp95-d8c497176e7c</Typography>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Typography variant="label">Last connected</Typography>
            <Typography>Aug 30, 2017 12:27:53 PM</Typography>
          </div>
        </CardContent>
      </Card>
    );
  },
};
