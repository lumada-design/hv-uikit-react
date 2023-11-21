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
  renderers: Record<Key, React.ElementType<any>>;
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
    renderers,
    ...others
  } = useDefaultProps("HvDashboard", props);
  const { classes, cx } = useClasses(classesProp);

  return (
    <>
      <Global styles={gridStyles} />
      <GridLayout className={cx(classes.root, className)} {...others}>
        {items?.map((item) => {
          const { id, type, ...itemProps } = item;
          const GridItem = renderers?.[type];

          if (!GridItem) {
            if (import.meta.env.DEV) {
              // eslint-disable-next-line no-console
              console.error("No renderer found for type:", type);
            }
            return null;
          }

          return (
            <div key={id} className={classes.item}>
              <GridItem {...itemProps} />
            </div>
          );
        })}
      </GridLayout>
    </>
  );
};
