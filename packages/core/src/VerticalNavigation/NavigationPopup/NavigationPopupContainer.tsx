import { Popper } from "@mui/base";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import { useTheme } from "../../hooks/useTheme";
import { HvBaseProps } from "../../types/generic";
import { ExtractNames } from "../../utils/classes";
import { getContainerElement } from "../../utils/document";
import { HvVerticalNavigation } from "../VerticalNavigation";
import { staticClasses, useClasses } from "./NavigationPopup.styles";

export { staticClasses as verticalNavigationPopupClasses };

export type HvVerticalNavigationPopupClasses = ExtractNames<typeof useClasses>;

export interface NavigationPopupContainerProps extends HvBaseProps {
  anchorEl?: HTMLElement | null;
  onClose?: () => void;
  classes?: HvVerticalNavigationPopupClasses;
}

export const NavigationPopupContainer = ({
  anchorEl,
  onClose,
  children,
  classes: classesProp,
  className,
  ...others
}: NavigationPopupContainerProps) => {
  const { classes, cx } = useClasses(classesProp);

  const { rootId } = useTheme();

  const handleClickAway = () => onClose?.();

  return (
    <Popper
      open
      anchorEl={anchorEl}
      placement="right-start"
      container={getContainerElement(rootId)}
      className={cx(classes.popper, classes.popup, className)}
      {...others}
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.container}>
          <HvVerticalNavigation open useIcons>
            {children}
          </HvVerticalNavigation>
        </div>
      </ClickAwayListener>
    </Popper>
  );
};
