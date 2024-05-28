import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvSimpleGrid,
  HvSimpleGridProps,
  theme,
} from "@hitachivantara/uikit-react-core";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: theme.colors.base_dark,
  backgroundColor: theme.colors.neutralDimmed,
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
      <HvSimpleGrid className={css({ "& > div": style })} {...args}>
        {[...Array(5).keys()].map((i) => (
          <div key={i}>{i + 1}</div>
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
        {[...Array(5).keys()].map((i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </HvSimpleGrid>
    );
  },
};
