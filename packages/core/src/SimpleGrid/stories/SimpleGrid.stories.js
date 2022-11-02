import React from "react";
import HvSimpleGrid from "../SimpleGrid";

export default {
  title: "Layout/SimpleGrid",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvSimpleGrid } from "@hitachivantara/uikit-react-core"',
  },
  component: HvSimpleGrid,
};

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "lightblue",
  minHeight: 80,
};

export const SimpleGrid = () => (
  <HvSimpleGrid cols={2}>
    <div style={style}>1</div>
    <div style={style}>2</div>
    <div style={style}>3</div>
    <div style={style}>4</div>
    <div style={style}>5</div>
  </HvSimpleGrid>
);

export const BreakpointsGrid = () => (
  <HvSimpleGrid
    spacing="sm"
    breakpoints={[
      { minWidth: 980, cols: 3, spacing: "md" },
      { minWidth: 755, cols: 2, spacing: "sm" },
      { minWidth: 600, cols: 1, spacing: "sm" },
    ]}
  >
    <div style={style}>1</div>
    <div style={style}>2</div>
    <div style={style}>3</div>
    <div style={style}>4</div>
    <div style={style}>5</div>
  </HvSimpleGrid>
);

BreakpointsGrid.parameters = {
  docs: {
    description: {
      story:
        `An example using different breakpoints taking in consideration min-width as following: ` +
        "<br>" +
        `   -minWidth: 980: cols: 3, spacing: 'md'` +
        "<br>" +
        `   -minWidth: 755, cols: 2, spacing: 'sm'` +
        "<br>" +
        `   -minWidth: 600, cols: 1, spacing: 'sm'` +
        "<br>" +
        `<b>(Resize the screen to see the effects)</b>`,
    },
  },
};
