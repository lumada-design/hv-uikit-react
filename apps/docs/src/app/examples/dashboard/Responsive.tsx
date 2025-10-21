import { Responsive, WidthProvider, type Layouts } from "react-grid-layout";
import { Global } from "@emotion/react";
import {
  HvSection,
  HvTypography,
  useTheme,
  useWidth,
} from "@hitachivantara/uikit-react-core";

import { gridStyles } from "./Dashboard.styles";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Demo() {
  const { activeTheme } = useTheme();
  const width = useWidth();

  return (
    <div>
      <Global styles={gridStyles} />
      <div className="flex gap-xxs justify-center">
        <HvTypography variant="label">Current breakpoint:</HvTypography>
        <HvTypography>{width}</HvTypography>
      </div>
      <ResponsiveGridLayout
        className="relative"
        layouts={responsiveLayouts}
        breakpoints={activeTheme?.breakpoints.values}
        cols={defaultCols}
        isResizable
        isDraggable
      >
        {items.map((item) => (
          <HvSection
            key={item.id}
            title={<HvTypography variant="title3">{item.label}</HvTypography>}
          />
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}

const defaultCols = { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 };

const items = ["1", "2", "3", "4", "5"].map((id) => ({
  id,
  type: "txt",
  label: `Item ${id}`,
}));

const responsiveLayouts: Layouts = {
  xs: [
    { i: "1", x: 0, y: 0, w: 12, h: 1 },
    { i: "2", x: 0, y: 1, w: 12, h: 1 },
    { i: "3", x: 0, y: 2, w: 12, h: 1 },
    { i: "4", x: 0, y: 3, w: 12, h: 1 },
    { i: "5", x: 0, y: 4, w: 12, h: 1 },
  ],
  sm: [
    { i: "1", x: 0, y: 0, w: 6, h: 2 },
    { i: "2", x: 6, y: 0, w: 6, h: 2 },
    { i: "3", x: 0, y: 2, w: 6, h: 2 },
    { i: "4", x: 6, y: 2, w: 6, h: 2 },
    { i: "5", x: 0, y: 3, w: 12, h: 1 },
  ],
  md: [
    { i: "1", x: 0, y: 0, w: 6, h: 2 },
    { i: "2", x: 6, y: 0, w: 6, h: 2 },
    { i: "3", x: 0, y: 1, w: 4, h: 1 },
    { i: "4", x: 4, y: 1, w: 4, h: 1 },
    { i: "5", x: 8, y: 1, w: 4, h: 1 },
  ],
  lg: [
    { i: "1", x: 0, y: 0, w: 6, h: 2 },
    { i: "2", x: 6, y: 0, w: 3, h: 1 },
    { i: "3", x: 9, y: 0, w: 3, h: 1 },
    { i: "4", x: 6, y: 1, w: 3, h: 1 },
    { i: "5", x: 9, y: 1, w: 3, h: 1 },
  ],
  xl: [
    { i: "1", x: 0, y: 0, w: 6, h: 2 },
    { i: "2", x: 6, y: 0, w: 3, h: 1 },
    { i: "3", x: 9, y: 0, w: 3, h: 1 },
    { i: "4", x: 6, y: 1, w: 3, h: 1 },
    { i: "5", x: 9, y: 1, w: 3, h: 1 },
  ],
};
