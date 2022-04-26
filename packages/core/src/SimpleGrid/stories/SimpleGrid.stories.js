import React from "react";
import SimpleGridRoot from "..";

export default {
  title: "Foundation/SimpleGrid",
  parameters: {
    componentSubtitle: null,
    usage: 'import { SimpleGrid } from "@hitachivantara/uikit-react-core"',
  },
  component: SimpleGridRoot,
};

export const SimpleGrid = () => (
  <SimpleGridRoot
    cols={2}
    spacing="sm"
    breakpoints={[
      { maxWidth: 980, cols: 3, spacing: "md" },
      { maxWidth: 755, cols: 2, spacing: "sm" },
      { maxWidth: 600, cols: 1, spacing: "sm" },
    ]}
  >
    <div style={{ backgroundColor: "lightblue" }}>1</div>
    <div style={{ backgroundColor: "lightblue" }}>2</div>
    <div style={{ backgroundColor: "lightblue" }}>3</div>
    <div style={{ backgroundColor: "lightblue" }}>4</div>
    <div style={{ backgroundColor: "lightblue" }}>5</div>
  </SimpleGridRoot>
);
