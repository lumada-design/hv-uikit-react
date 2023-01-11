import { Meta, StoryObj } from "@storybook/react";
import {
  HvTypography,
  HvCard,
  HvCardProps,
  HvCardContent,
  HvCardHeader,
  HvCardMedia,
} from "components";
import compressor from "./assets/compressor.png";

const meta: Meta<typeof HvCard> = {
  title: "Display/Card",
  component: HvCard,
  decorators: [(Story) => <div style={{ margin: 20 }}>{Story()}</div>],
};
export default meta;

export const Main: StoryObj<HvCardProps> = {
  args: {
    bgColor: "atmo1",
    statusColor: "sema4",
    selectable: false,
    selected: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
    icon: { control: { disable: true } },
  },
  render: ({ bgColor, statusColor, selectable, selected }) => {
    return (
      <HvCard
        bgColor={bgColor}
        statusColor={statusColor}
        style={{ width: 360 }}
        selectable={selectable}
        selected={selected}
      >
        <HvCardHeader
          title="Asset Avatar L90"
          subheader="Compressor"
          aria-label="Compressor"
        />
        <HvCardMedia
          component="img"
          // @ts-ignore
          alt="Compressor"
          height={140}
          image={compressor}
        />
        <HvCardContent>
          <div style={{ paddingTop: "20px" }}>
            <HvTypography variant="label">ID</HvTypography>
            <HvTypography>2101cad3-7cd4-1000-bdp95-d8c497176e7c</HvTypography>
          </div>
          <div style={{ marginTop: "20px" }}>
            <HvTypography variant="label">Last connected</HvTypography>
            <HvTypography>Aug 30, 2017 12:27:53 PM</HvTypography>
          </div>
        </HvCardContent>
      </HvCard>
    );
  },
};
