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
  element: React.ReactNode;
}

export interface HvDashboardProps extends ReactGridLayoutProps {
  classes?: HvDashboardClasses;
  items?: HvDashboardItem[];
}

/**
 * A Dashboard grid layout component, based on `react-grid-layout`.
 */
export const HvDashboard = (props: HvDashboardProps) => {
  const {
    items,
    className,
    classes: classesProp,
    ...others
  } = useDefaultProps("HvDashboard", props);
  const { classes, cx } = useClasses(classesProp);

  return (
    <>
      <Global styles={gridStyles} />
      <GridLayout className={cx(classes.root, className)} {...others}>
        {items?.map((item) => (
          <div key={item.id} className={classes.item}>
            {item.element}
          </div>
        ))}
      </GridLayout>
    </>
  );
};
