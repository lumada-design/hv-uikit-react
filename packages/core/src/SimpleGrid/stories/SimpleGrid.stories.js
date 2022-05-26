import React from "react";
import SimpleGridRoot from "..";

export default {
  title: "Components/Layout/SimpleGrid",
  parameters: {
    componentSubtitle:
      "SimpleGrid is a simple flexbox container where each child is treated as a column. Each column takes equal amount of space.",
    usage: 'import { SimpleGrid } from "@hitachivantara/uikit-react-core"',
  },
  component: SimpleGridRoot,
};

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "lightblue",
  minHeight: 80,
};

export const SimpleGrid = () => (
  <SimpleGridRoot cols={2}>
    <div style={style}>1</div>
    <div style={style}>2</div>
    <div style={style}>3</div>
    <div style={style}>4</div>
    <div style={style}>5</div>
  </SimpleGridRoot>
);

export const BreakpointsGrid = () => (
  <SimpleGridRoot
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
  </SimpleGridRoot>
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
