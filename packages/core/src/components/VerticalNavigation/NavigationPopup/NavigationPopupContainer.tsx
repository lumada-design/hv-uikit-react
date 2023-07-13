import { ClickAwayListener } from "@mui/material";

import { HvBaseProps } from "@core/types/generic";

import { HvVerticalNavigation } from "../VerticalNavigation";

import { StyledPopper, StyledPopupContainer } from "./NavigationPopup.styles";

export interface NavigationPopupContainerProps extends HvBaseProps {
  anchorEl?: HTMLElement | null;
  onClose?: () => void;
}

export const NavigationPopupContainer = ({
  anchorEl,
  onClose,
  children,
  ...others
}: NavigationPopupContainerProps) => {
  const handleClickAway = () => {
    onClose?.();
  };

  return (
    <StyledPopper open anchorEl={anchorEl} placement="right-start" {...others}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <StyledPopupContainer>
          <HvVerticalNavigation open useIcons>
            {children}
          </HvVerticalNavigation>
        </StyledPopupContainer>
      </ClickAwayListener>
    </StyledPopper>
  );
};
