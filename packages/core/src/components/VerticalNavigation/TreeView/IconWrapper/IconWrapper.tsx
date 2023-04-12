import { Forwards } from "@hitachivantara/uikit-react-icons";

import { HvAvatar } from "components";

import { TooltipWrapper } from "../TooltipWrapper";
import { SpacerDiv, StyledIconsContainer } from "./IconWrapper.styles";

export const IconWrapper = ({
  icon,
  label,
  hasChildren,
  hasExpandableItems,
  showAvatar,
  isOpen,
}) => {
  return (
    <TooltipWrapper showTooltip={!hasChildren && !isOpen} label={label}>
      <StyledIconsContainer hasExpandableItems={hasExpandableItems}>
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
          hasExpandableItems && !isOpen && <SpacerDiv />
        )}
      </StyledIconsContainer>
    </TooltipWrapper>
  );
};
