import { useContext } from "react";
import { Forwards } from "@hitachivantara/uikit-react-icons";

import { HvAvatar } from "../../../Avatar";

import { VerticalNavigationContext } from "../../VerticalNavigationContext";
import { SpacerDiv, StyledIconsContainer } from "./IconWrapper.styles";

export const IconWrapper = ({
  icon,
  label,
  hasChildren,
  showAvatar,
  isOpen,
}) => {
  const { hasAnyChildWithData } = useContext(VerticalNavigationContext);
  return (
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
  );
};
