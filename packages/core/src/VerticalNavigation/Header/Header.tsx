import { MouseEventHandler, useContext, useMemo } from "react";
import { Backwards, Forwards, Menu } from "@hitachivantara/uikit-react-icons";

import { ExtractNames } from "../../utils/classes";
import { HvTypography } from "../../Typography";
import { HvButton, HvButtonProps } from "../../Button";

import { VerticalNavigationContext } from "../VerticalNavigationContext";
import { staticClasses, useClasses } from "./Header.styles";

export { staticClasses as verticalNavigationHeaderClasses };

export type HvVerticalNavigationHeaderClasses = ExtractNames<typeof useClasses>;

export interface HvVerticalNavigationHeaderProps {
  /**
   * Id to be applied to the root node.
   */
  id?: string;
  /**
   * The title text to show on Header.
   */
  title?: string;
  /**
   * Icon to show when Vertical Navigation is collapsed.
   */
  openIcon?: React.ReactNode;
  /**
   * Icon to show when Vertical Navigation is expanded.
   */
  closeIcon?: React.ReactNode;
  /**
   * Props for the collapse button.
   */
  collapseButtonProps?: HvButtonProps;
  /**
   * Props for the back button.
   */
  backButtonProps?: HvButtonProps;
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes?: HvVerticalNavigationHeaderClasses;
  /**
   * Handler for the collapse button.
   */
  onCollapseButtonClick?: MouseEventHandler<HTMLElement>;
}

export const HvVerticalNavigationHeader = ({
  title,
  openIcon = <Forwards />,
  closeIcon = <Backwards />,
  collapseButtonProps,
  backButtonProps,
  className,
  classes: classesProp,
  onCollapseButtonClick,
  ...others
}: HvVerticalNavigationHeaderProps) => {
  const {
    isOpen,
    useIcons,
    headerTitle,
    slider,
    navigateToParentHandler,
    parentItem,
  } = useContext(VerticalNavigationContext);

  const { classes, cx } = useClasses(classesProp);

  openIcon = !useIcons ? <Menu /> : openIcon;

  const backButtonClickHandler = () => {
    if (navigateToParentHandler) navigateToParentHandler();
  };

  // whenever we're in a sublevel, the parentItem is always a single item.
  // In the first level it's always an array with the first level elements.
  const shouldShowTitle = useMemo(
    () => !slider || (slider && !Array.isArray(parentItem)),
    [parentItem, slider]
  );

  return shouldShowTitle ? (
    <div
      className={cx(classes.root, { [classes.minimized]: !isOpen }, className)}
      {...others}
    >
      {isOpen && headerTitle && slider && (
        <HvButton
          icon
          onClick={backButtonClickHandler}
          aria-label="Back"
          {...backButtonProps}
        >
          <Backwards iconSize="XS" />
        </HvButton>
      )}
      {isOpen && (
        <HvTypography variant={slider ? "label" : "title3"}>
          {headerTitle && slider ? headerTitle : title}
        </HvTypography>
      )}
      {onCollapseButtonClick && (
        <HvButton
          icon
          onClick={onCollapseButtonClick}
          className={classes.collapseButton}
          classes={{
            root: isOpen ? "" : classes.minimized,
          }}
          {...collapseButtonProps}
        >
          {isOpen ? closeIcon : openIcon}
        </HvButton>
      )}
    </div>
  ) : null;
};
