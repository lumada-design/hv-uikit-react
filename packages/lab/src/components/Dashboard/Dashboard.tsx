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

export interface HvDashboardItem<Key extends string = string>
  extends Record<string, any> {
  id: string;
  type: Key;
}

export interface HvDashboardProps<Key extends string = string>
  extends ReactGridLayoutProps {
  classes?: HvDashboardClasses;
  items?: HvDashboardItem<Key>[];
  renderItem: (item: HvDashboardItem<Key>) => React.ReactNode;
}

/**
 * A Dashboard grid layout component, based on `react-grid-layout`.
 */
export const HvDashboard = <Key extends string = string>(
  props: HvDashboardProps<Key>
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
