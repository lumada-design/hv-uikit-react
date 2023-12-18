import ClickAwayListener from "@mui/material/ClickAwayListener";

import { HvBaseProps } from "../../types/generic";

import { ExtractNames } from "../../utils/classes";

import { HvVerticalNavigation } from "../VerticalNavigation";

import {
  StyledPopper,
  staticClasses,
  useClasses,
} from "./NavigationPopup.styles";

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
  ...others
}: NavigationPopupContainerProps) => {
  const { classes } = useClasses(classesProp);

  const handleClickAway = () => {
    onClose?.();
  };

  return (
    <StyledPopper open anchorEl={anchorEl} placement="right-start" {...others}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.container}>
          <HvVerticalNavigation open useIcons>
            {children}
          </HvVerticalNavigation>
        </div>
      </ClickAwayListener>
    </StyledPopper>
  );
};
