import { Meta, StoryObj } from "@storybook/react";
import { HvSimpleGrid, SimpleGridProps } from "components/index";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "lightblue",
  minHeight: 80,
};

const meta: Meta<typeof HvSimpleGrid> = {
  title: "Layout/SimpleGrid",
  component: HvSimpleGrid,
};
export default meta;

export const Main: StoryObj<SimpleGridProps> = {
  args: {
    spacing: "sm",
    cols: 2,
  },
  render: ({ spacing, cols }) => {
    {
      return (
        <HvSimpleGrid cols={cols} spacing={spacing}>
          <div style={style}>1</div>
          <div style={style}>2</div>
          <div style={style}>3</div>
          <div style={style}>4</div>
          <div style={style}>5</div>
        </HvSimpleGrid>
      );
    }
  },
};

export const BreakpointsGrid: StoryObj<SimpleGridProps> = {
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
