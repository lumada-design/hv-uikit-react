import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvSimpleGrid,
  HvSimpleGridProps,
  theme,
} from "@hitachivantara/uikit-react-core";

const range = (max: number, min = 1) =>
  Array.from(Array(max), (v, i) => i + min);

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: theme.colors.base_dark,
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
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
  },
  render: (args) => {
    return (
      <HvSimpleGrid className={css({ "& > div": style })} {...args}>
        {range(5).map((i) => (
          <div key={i}>{i}</div>
        ))}
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
      <HvSimpleGrid
        spacing={spacing}
        breakpoints={breakpoints}
        cols={cols}
        className={css({ "& > div": style })}
      >
        {range(5).map((i) => (
          <div key={i}>{i}</div>
        ))}
      </HvSimpleGrid>
    );
  },
};
