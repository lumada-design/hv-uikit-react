import { Backwards, Forwards, Menu } from "@hitachivantara/uikit-react-icons";

import { MouseEventHandler, useContext, useMemo } from "react";

import { clsx } from "clsx";

import { HvButton, HvButtonProps } from "@core/components/Button";
import { HvTypography } from "@core/components/Typography";

import { VerticalNavigationContext } from "../VerticalNavigationContext";
import { StyledCollapseButton, StyledHeader } from "./Header.styles";
import verticalNavigationHeaderClasses, {
  HvVerticalNavigationHeaderClasses,
} from "./headerClasses";

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
  classes,
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
    <StyledHeader
      className={clsx(
        className,
        verticalNavigationHeaderClasses.root,
        classes?.root,
        !isOpen &&
          clsx(verticalNavigationHeaderClasses.minimized, classes?.minimized)
      )}
      {...others}
    >
      {isOpen && headerTitle && slider && (
        <HvButton
          icon
          variant="secondaryGhost"
          onClick={backButtonClickHandler}
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
        <StyledCollapseButton
          icon
          variant="secondaryGhost"
          onClick={onCollapseButtonClick}
          classes={{
            root: isOpen ? "" : verticalNavigationHeaderClasses.minimized,
          }}
          {...collapseButtonProps}
        >
          {isOpen ? closeIcon : openIcon}
        </StyledCollapseButton>
      )}
    </StyledHeader>
  ) : null;
};
