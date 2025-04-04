import { forwardRef, useCallback, useMemo, useState } from "react";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvBaseProps } from "../types/generic";
import {
  fillDataWithParentId,
  getNavigationItemById,
  getParentItemById,
} from "./NavigationSlider/utils";
import { hasChildNavigationItems } from "./utils/VerticalNavigation.utils";
import { staticClasses, useClasses } from "./VerticalNavigation.styles";
import {
  NavigationData,
  VerticalNavigationContext,
} from "./VerticalNavigationContext";

export { staticClasses as verticalNavigationClasses };

export type HvVerticalNavigationClasses = ExtractNames<typeof useClasses>;

export type HvVerticalNavigationMode = "icon" | "simple";

export type HvVerticalNavigationPosition =
  | "static"
  | "relative"
  | "fixed"
  | "absolute";

export interface HvVerticalNavigationProps extends HvBaseProps<HTMLDivElement> {
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvVerticalNavigationClasses;
  /** Current State of the Vertical Navigation Collapse */
  open?: boolean;
  /**
   * Collapsed Mode for the Vertical Navigation, the default value is "simple".
   *
   * @deprecated - `useIcons` property should be used instead.
   */
  collapsedMode?: HvVerticalNavigationMode;
  /** Boolean to determine if treeview is in slider mode (for mobile navigation), the default value is false. */
  slider?: boolean;
  /**
   * Boolean to determine if icons should be displayed in the navigation menu.
   * When `true` a icon will always be displayed, if no icon is provided the first letter of the label will be
   * displayed inside an Avatar component.
   * When `false` no icons will be shown, even if an icon is provided.
   */
  useIcons?: boolean;
}

/**
 * Navigation enables users to move through an app to complete tasks.
 *
 * It is recommended to use vertical navigation when your application requires global navigation that is displayed on the left.
 * While vertical navigation menus generally consume more space than their horizontal counterparts, they have become more popular as desktop monitors move to wide-screen formats.
 *
 * Although both the hierarchically organized data and the visual style resemble a treeview-like structure, the [Treeview Design Pattern](https://w3c.github.io/aria-practices/#TreeView)
 * isn't necessarily the most appropriate.
 *
 * The tree role provides complex functionality that is not needed for typical site navigation, and changes the most common keyboard navigation using TAB.
 *
 * The [Disclosure Design Pattern](https://w3c.github.io/aria-practices/#disclosure) is more suited for typical site navigation, with expandable groups of links.
 * However it can be tedious to TAB through all navigation items to reach the actions panel.
 *
 * Both modes are available via the `mode` property and each app should choose the most appropriate.
 */
export const HvVerticalNavigation = forwardRef<
  HTMLDivElement,
  HvVerticalNavigationProps
>(function HvVerticalNavigation(props, ref) {
  const {
    id,
    className,
    classes: classesProp,
    children,
    open = true,
    slider = false,
    useIcons = false,
    ...others
  } = useDefaultProps("HvVerticalNavigation", props);
  const { classes, cx } = useClasses(classesProp);

  const [parentData, setParentData] = useState<NavigationData[]>([]);

  const [parentSelected, setParentSelected] = useState();

  // navigationSlider
  const withParentData = useMemo(
    () => fillDataWithParentId(parentData),
    [parentData],
  );

  const initialParentItem = useMemo(
    () => getParentItemById(withParentData, parentSelected),
    [withParentData, parentSelected],
  );

  const [parentItem, setParentItem] = useState(initialParentItem);

  const hasAnyChildWithData = useMemo(
    () => hasChildNavigationItems(parentData),
    [parentData],
  );

  const headerTitle = useMemo(() => parentItem?.label, [parentItem]);

  const navigateToParentHandler = useCallback(() => {
    setParentItem(getParentItemById(withParentData, parentItem.id));
  }, [parentItem, withParentData]);

  const navigateToChildHandler = useCallback(
    (event: any, item: any) => {
      setParentItem(getNavigationItemById(withParentData, item.id));
      event.stopPropagation();
    },
    [withParentData],
  );

  const value = useMemo(
    () => ({
      isOpen: open,
      useIcons,
      slider,
      headerTitle,

      parentItem,
      setParentItem,
      withParentData,
      navigateToChildHandler,
      navigateToParentHandler,

      parentData,
      setParentData,
      parentSelected,
      setParentSelected,
      hasAnyChildWithData,
    }),
    [
      open,
      useIcons,
      slider,
      headerTitle,
      parentItem,
      setParentItem,
      withParentData,
      navigateToChildHandler,
      navigateToParentHandler,
      hasAnyChildWithData,
      parentData,
      parentSelected,
    ],
  );

  return (
    <VerticalNavigationContext.Provider value={value}>
      <div
        id={id}
        ref={ref}
        className={cx(
          classes.root,
          {
            [classes.collapsed]: !open,
            [classes.slider]: slider,
            [classes.childData]: hasAnyChildWithData,
          },
          className,
        )}
        {...others}
      >
        {children}
      </div>
    </VerticalNavigationContext.Provider>
  );
});
