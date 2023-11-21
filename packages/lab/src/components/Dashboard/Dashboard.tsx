import { Global } from "@emotion/react";
import ReactGridLayout, {
  ReactGridLayoutProps,
  WidthProvider,
} from "react-grid-layout";
import {
  ExtractNames,
  useDefaultProps,
} from "@hitachivantara/uikit-react-core";

import { gridStyles, staticClasses, useClasses } from "./Dashboard.styles";

const GridLayout = WidthProvider(ReactGridLayout);

export { staticClasses as dashboardClasses };

export type HvDashboardClasses = ExtractNames<typeof useClasses>;

export interface HvDashboardItem {
  id: string;
  type: string;
}

export interface HvDashboardProps<
  Item extends HvDashboardItem = HvDashboardItem
> extends ReactGridLayoutProps {
  classes?: HvDashboardClasses;
  items?: Item[];
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
    classes: classesProp,
    items,
    renderItem,
    ...others
  } = useDefaultProps("HvDashboard", props);
  const { classes, cx } = useClasses(classesProp);

  return (
    <>
      <Global styles={gridStyles} />
      <GridLayout className={cx(classes.root, className)} {...others}>
        {items?.map((item) => (
          <div key={item.id} className={classes.item}>
            {renderItem(item)}
          </div>
        ))}
      </GridLayout>
    </>
  );
};
