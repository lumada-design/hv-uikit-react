import { useState } from "react";
import { Responsive, WidthProvider, type Layouts } from "react-grid-layout";
import { Global } from "@emotion/react";
import {
  HvSection,
  HvTypography,
  useTheme,
} from "@hitachivantara/uikit-react-core";

import { gridStyles } from "./Dashboard.styles";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Demo() {
  const { activeTheme } = useTheme();
  const [layoutKey, setLayoutKey] = useState<keyof typeof layouts>("layoutA");

  return (
    <div className="flex flex-col gap-md">
      <div className="flex gap-sm justify-center">
        <button
          type="button"
          onClick={() => setLayoutKey("layoutA")}
          className="w-100px h-60px border-1 border-border p-2px gap-2px flex items-center hover:cursor-pointer"
        >
          <div className="flex w-1/2 h-full bg-primaryDimmed border-1 border-border" />
          <div className="flex w-1/2 h-full gap-2px">
            <div className="flex flex-col gap-2px w-1/2 h-full">
              <div className="flex-1 bg-primaryDimmed border-1 border-border" />
              <div className="flex-1 bg-primaryDimmed border-1 border-border" />
            </div>
            <div className="flex flex-col gap-2px w-1/2 h-full">
              <div className="flex-1 bg-primaryDimmed border-1 border-border" />
              <div className="flex-1 bg-primaryDimmed border-1 border-border" />
            </div>
          </div>
        </button>
        <button
          type="button"
          onClick={() => setLayoutKey("layoutB")}
          className="w-100px h-60px border-1 border-border p-2px gap-2px flex flex-col items-center hover:cursor-pointer"
        >
          <div className="w-full h-1/2 bg-primaryDimmed border-1 border-border" />
          <div className="w-full h-1/2 flex gap-2px">
            <div className="w-1/4 h-full bg-primaryDimmed border-1 border-border" />
            <div className="w-1/4 h-full bg-primaryDimmed border-1 border-border" />
            <div className="w-1/4 h-full bg-primaryDimmed border-1 border-border" />
            <div className="w-1/4 h-full bg-primaryDimmed border-1 border-border" />
          </div>
        </button>
        <button
          type="button"
          onClick={() => setLayoutKey("layoutC")}
          className="w-100px h-60px border-1 border-border p-2px gap-2px flex flex-col items-center hover:cursor-pointer"
        >
          <div className="w-full h-1/2 flex gap-2px">
            <div className="w-1/2 h-full bg-primaryDimmed border-1 border-border" />
            <div className="w-1/2 h-full bg-primaryDimmed border-1 border-border" />
          </div>
          <div className="w-full h-1/2 flex gap-2px">
            <div className="w-1/3 h-full bg-primaryDimmed border-1 border-border" />
            <div className="w-1/3 h-full bg-primaryDimmed border-1 border-border" />
            <div className="w-1/3 h-full bg-primaryDimmed border-1 border-border" />
          </div>
        </button>
      </div>
      <div>
        <Global styles={gridStyles} />
        <ResponsiveGridLayout
          className="relative"
          layouts={{
            xs: layouts[layoutKey],
            sm: layouts[layoutKey],
            md: layouts[layoutKey],
            lg: layouts[layoutKey],
            xl: layouts[layoutKey],
          }}
          breakpoints={activeTheme?.breakpoints.values}
          cols={defaultCols}
          isResizable
          isDraggable
        >
          {items.map((item) => (
            <HvSection
              key={item.id}
              title={<HvTypography variant="title3">{item.label}</HvTypography>}
            >
              {item.description && (
                <HvTypography>{item.description}</HvTypography>
              )}
            </HvSection>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
}

const defaultCols = { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 };

const getDescription = (id: string) => {
  if (id === "1") {
    return "This item can only be resized horizontally";
  }
  if (id === "5") {
    return "This item can't be moved or resized";
  }
  return "";
};

const items = ["1", "2", "3", "4", "5"].map((id) => ({
  id,
  type: "txt",
  label: `Item ${id}`,
  description: getDescription(id),
}));

const layouts: Layouts = {
  layoutA: [
    { i: "1", x: 0, y: 0, w: 6, h: 2, resizeHandles: ["w", "e"] },
    { i: "2", x: 6, y: 0, w: 3, h: 1 },
    { i: "3", x: 9, y: 0, w: 3, h: 1 },
    { i: "4", x: 6, y: 1, w: 3, h: 1 },
    { i: "5", x: 9, y: 1, w: 3, h: 1, static: true },
  ],
  layoutB: [
    { i: "1", x: 0, y: 0, w: 12, h: 1, resizeHandles: ["w", "e"] },
    { i: "2", x: 0, y: 3, w: 3, h: 1 },
    { i: "3", x: 3, y: 3, w: 3, h: 1 },
    { i: "4", x: 6, y: 0, w: 3, h: 1 },
    { i: "5", x: 9, y: 0, w: 3, h: 1, static: true },
  ],
  layoutC: [
    { i: "1", x: 0, y: 0, w: 6, h: 1, resizeHandles: ["w", "e"] },
    { i: "2", x: 6, y: 0, w: 6, h: 1 },
    { i: "3", x: 0, y: 1, w: 4, h: 1 },
    { i: "4", x: 4, y: 1, w: 4, h: 1 },
    { i: "5", x: 8, y: 1, w: 4, h: 1, static: true },
  ],
};
