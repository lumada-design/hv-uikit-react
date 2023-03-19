import { Backwards, Forwards, Menu } from "@hitachivantara/uikit-react-icons";
import clsx from "clsx";
import { HvButton, HvButtonProps, HvTypography } from "components";
import { MouseEventHandler, useContext } from "react";
import { VerticalNavigationContext } from "../VerticalNavigation";
import { StyledHeader } from "./Header.styles";
import verticalNavigationHeaderClasses, {
  HvVerticalNavigationHeaderClasses,
} from "./headerClasses";

export type HvVerticalNavigationHeaderProps = {
  id?;
  title?;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  buttonProps?: HvButtonProps;
  className?: string;
  classes?: HvVerticalNavigationHeaderClasses;
  onClick?: MouseEventHandler<HTMLElement>;
};

export const HvVerticalNavigationHeader = ({
  title,
  openIcon = <Forwards />,
  closeIcon = <Backwards />,
  buttonProps,

  className,
  classes,
  onClick,
  ...others
}: HvVerticalNavigationHeaderProps) => {
  const { isOpen, collapsedMode } = useContext(VerticalNavigationContext);

  openIcon = collapsedMode === "simple" ? <Menu /> : openIcon;

  return (
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
      {isOpen && <HvTypography variant="title3">{title}</HvTypography>}
      <HvButton
        icon
        variant="secondaryGhost"
        onClick={onClick}
        {...buttonProps}
      >
        {isOpen ? closeIcon : openIcon}
      </HvButton>
    </StyledHeader>
  );
};
