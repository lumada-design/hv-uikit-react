import { theme } from "@hitachivantara/uikit-styles";
import { Meta, StoryObj } from "@storybook/react";
import { HvSimpleGrid, HvSimpleGridProps } from "@core/components";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.colors.neutral_20,
  minHeight: 80,
};

const meta: Meta<typeof HvSimpleGrid> = {
  title: "Components/Grid/Simple Grid",
  component: HvSimpleGrid,
};
export default meta;

export const Main: StoryObj<HvSimpleGridProps> = {
  args: {
    spacing: "sm",
    cols: 2,
  },
  argTypes: {
    breakpoints: { control: { disable: true } },
  },
  render: (args) => {
    return (
      <HvSimpleGrid {...args}>
        <div style={style}>1</div>
        <div style={style}>2</div>
        <div style={style}>3</div>
        <div style={style}>4</div>
        <div style={style}>5</div>
      </HvSimpleGrid>
    );
  },
};

export const BreakpointsGrid: StoryObj<HvSimpleGridProps> = {
  args: {
    spacing: "sm",
    cols: 2,
    breakpoints: [
      { minWidth: 980, cols: 3, spacing: "md" },
      { minWidth: 755, cols: 2, spacing: "sm" },
      { minWidth: 600, cols: 1, spacing: "sm" },
    ],
  },
  render: ({ spacing, cols, breakpoints }) => {
    return (
      <HvSimpleGrid spacing={spacing} breakpoints={breakpoints} cols={cols}>
        <div style={style}>1</div>
        <div style={style}>2</div>
        <div style={style}>3</div>
        <div style={style}>4</div>
        <div style={style}>5</div>
      </HvSimpleGrid>
    );
  },
};
