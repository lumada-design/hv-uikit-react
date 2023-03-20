import clsx from "clsx";
import { createContext, useMemo } from "react";
import { StyledRoot } from "./VerticalNavigation.styles";
import verticalNavigationClasses, {
  HvVerticalNavigationClasses,
} from "./verticalNavigationClasses";

interface VerticalNavigationContextValue {
  isOpen: boolean;
  collapsedMode: HvVerticalNavigationMode;
}

export const VerticalNavigationContext =
  createContext<VerticalNavigationContextValue>({
    isOpen: true,
    collapsedMode: "simple",
  });

/**
 * Navigation enables users to move through an app to complete tasks.
 *
 * It is recommended to use vertical navigation when your application requires global navigation that is displayed on the left.
 * While vertical navigation menus generally consume more space than their horizontal counterparts, they have become more popular as desktop monitors move to wide-screen formats.
 *
 * Even thou both the hierarchically organized data and the visual style ressemble a treeview-like structure, the [Treeview Design Pattern](https://w3c.github.io/aria-practices/#TreeView)
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

  collapsedMode = "simple",

  ...others
}: HvVerticalNavigationProps) => {
  const value = useMemo(
    () => ({
      isOpen: open,
      collapsedMode,
    }),
    [open]
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
          classes?.collapsed
        )}
        {...others}
      >
        {children}
      </StyledRoot>
    </VerticalNavigationContext.Provider>
  );

  return content;
};

export type HvVerticalNavigationProps = {
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
   *  Collapsed Mode for the Vertical Navigation, the default value is "simple".
   */
  collapsedMode?: HvVerticalNavigationMode;
  /**
   * The content inside the actions container.
   */
  children?: React.ReactNode;
};

export type HvVerticalNavigationMode = "icon" | "simple";

export type HvVerticalNavigationPosition =
  | "static"
  | "relative"
  | "fixed"
  | "absolute";
