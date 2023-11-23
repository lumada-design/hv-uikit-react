import { useMemo } from "react";
import { Global } from "@emotion/react";
import {
  Responsive as ResponsiveGrid,
  ResponsiveProps,
  ReactGridLayoutProps,
  Layouts,
  WidthProvider,
} from "react-grid-layout";
import {
  ExtractNames,
  useDefaultProps,
} from "@hitachivantara/uikit-react-core";

import { useTheme } from "@core/hooks/useTheme";

import { gridStyles, staticClasses, useClasses } from "./Dashboard.styles";

const GridLayout = WidthProvider(ResponsiveGrid);

/** Default column breakpoints. For now, use always 12-column */
const defaultCols: HvDashboardProps["cols"] = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12,
};

export { staticClasses as dashboardClasses };

export type HvDashboardClasses = ExtractNames<typeof useClasses>;

export interface HvDashboardItem {
  id: string;
  type: string;
}

export interface HvDashboardProps<
  Item extends HvDashboardItem = HvDashboardItem
> extends ResponsiveProps {
  classes?: HvDashboardClasses;
  items?: Item[];
  layout?: ReactGridLayoutProps["layout"];
  renderItem: (item: Item) => React.ReactNode;
}

/**
 * A Dashboard grid layout component, based on `react-grid-layout`.
 */
export const HvDashboard = <Item extends HvDashboardItem = HvDashboardItem>(
  props: HvDashboardProps<Item>
) => {
  const {
    className,
    layout,
    layouts: layoutsProp,
    classes: classesProp,
    items,
    renderItem,
    ...others
  } = useDefaultProps("HvDashboard", props);
  const { classes, cx } = useClasses(classesProp);
  const { activeTheme } = useTheme();

  const layouts = useMemo<Layouts>(() => {
    if (layoutsProp) return layoutsProp;
    if (!layout) return {};

    return { xs: layout, sm: layout, md: layout, lg: layout, xl: layout };
  }, [layoutsProp, layout]);

  return (
    <>
      <Global styles={gridStyles} />
      <GridLayout
        className={cx(classes.root, className)}
        breakpoints={activeTheme?.breakpoints.values}
        cols={defaultCols}
        layouts={layouts}
        {...others}
      >
        {items?.map((item) => (
          <div key={item.id} className={classes.item}>
            {renderItem(item)}
          </div>
        ))}
      </GridLayout>
    </>
  );
};
