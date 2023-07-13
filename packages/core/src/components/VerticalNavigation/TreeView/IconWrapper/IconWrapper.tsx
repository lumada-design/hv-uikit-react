import { Forwards } from "@hitachivantara/uikit-react-icons";

import { useContext } from "react";

import { HvAvatar } from "@core/components/Avatar";

import { VerticalNavigationContext } from "../../VerticalNavigationContext";
import { TooltipWrapper } from "../TooltipWrapper";
import { SpacerDiv, StyledIconsContainer } from "./IconWrapper.styles";

export const IconWrapper = ({
  icon,
  label,
  hasChildren,
  showAvatar,
  isOpen,
  disableTooltip,
}) => {
  const { hasAnyChildWithData } = useContext(VerticalNavigationContext);
  return (
    <TooltipWrapper
      showTooltip={!hasChildren && !isOpen && !disableTooltip}
      label={label}
    >
      <StyledIconsContainer hasAnyChildWithData={hasAnyChildWithData}>
        {showAvatar ? (
          <HvAvatar
            variant="square"
            size="xs"
            backgroundColor="secondary_80"
            style={{ fontSize: "15px" }}
          >
            {label.substring(0, 1)}
          </HvAvatar>
        ) : (
          icon
        )}

        {hasChildren && !isOpen ? (
          <Forwards iconSize="XS" />
        ) : (
          hasAnyChildWithData && !isOpen && <SpacerDiv />
        )}
      </StyledIconsContainer>
    </TooltipWrapper>
  );
};
