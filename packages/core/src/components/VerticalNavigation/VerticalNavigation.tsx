import { clsx } from "clsx";
import { useEffect, useMemo, useState } from "react";
import { StyledRoot } from "./VerticalNavigation.styles";
import verticalNavigationClasses, {
  HvVerticalNavigationClasses,
} from "./verticalNavigationClasses";
import { NavigationData, VerticalNavigationContext } from ".";
import {
  fillDataWithParentId,
  getNavigationItemById,
  getParentItemById,
} from "./NavigationSlider/utils";
import { hasChildNavigationItems } from "./utils/VerticalNavigation.utils";

export interface HvVerticalNavigationProps {
  /**
   * Id to be applied to the root node.
   */
  id?: string;
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes?: HvVerticalNavigationClasses;
  /**
   * Current State of the Vertical Navigation Collapse
   */
  open?: boolean;
  /**
   * Collpased Mode for the Vertical Navigation, the default value is "simple".
   *
   * @deprecated - `useIcons` property should be used instead.
   */
  collapsedMode?: HvVerticalNavigationMode;
  /**
   * Boolean to determine if treeview is in slider mode (for mobile navigation), the default value is false.
   */
  slider?: boolean;
  /**
   * The content inside the actions container.
   */
  children?: React.ReactNode;
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
export const HvVerticalNavigation = ({
  id,
  className,
  classes,

  children,

  open = true,

  slider = false,

  useIcons = false,

  ...others
}: HvVerticalNavigationProps) => {
  if (others.collapsedMode) {
    console.warn("`collaspedMode` is deprecated. Please use 'useIcons'.");
  }
  const [parentData, setParentData] = useState<NavigationData[]>([]);

  const [parentSelected, setParentSelected] = useState();

  const [headerTitle, setHeaderTitle] = useState<string | undefined>();

  // navigationSlider
  const withParentData = useMemo(
    () => fillDataWithParentId(parentData),
    [parentData]
  );

  const initialParentItem = useMemo(
    () => getParentItemById(withParentData, parentSelected),
    [withParentData, parentSelected]
  );

  const [parentItem, setParentItem] = useState(initialParentItem);

  const hasAnyChildWithData = useMemo(
    () => hasChildNavigationItems(parentData),
    [parentData]
  );

  useEffect(
    () => setHeaderTitle(parentItem?.label),
    [parentItem, setParentItem]
  );

  const navigateToParentHandler = () => {
    setParentItem(getParentItemById(withParentData, parentItem.id));
  };

  const navigateToChildHandler = (event, item) => {
    setParentItem(getNavigationItemById(withParentData, item.id));
    event.stopPropagation();
  };

  const value = useMemo(
    () => ({
      isOpen: open,
      useIcons,
      slider,
      headerTitle,
      setHeaderTitle,

      parentItem,
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
      setHeaderTitle,
      parentItem,
      withParentData,
      navigateToChildHandler,
      navigateToParentHandler,
      hasAnyChildWithData,
    ]
  );

  const content = (
    <VerticalNavigationContext.Provider value={value}>
      <StyledRoot
        id={id}
        className={clsx(
          className,
          verticalNavigationClasses.root,
          classes?.root,
          !open && verticalNavigationClasses.collapsed,
          slider && verticalNavigationClasses.slider,
          classes?.collapsed
        )}
        hasAnyChildWithData={hasAnyChildWithData}
        {...others}
      >
        {children}
      </StyledRoot>
    </VerticalNavigationContext.Provider>
  );

  return content;
};

export type HvVerticalNavigationMode = "icon" | "simple";

export type HvVerticalNavigationPosition =
  | "static"
  | "relative"
  | "fixed"
  | "absolute";
