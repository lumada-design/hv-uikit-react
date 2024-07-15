import { HvBaseProps } from "packages/core/src/types/generic";
import { Forwards } from "@hitachivantara/uikit-react-icons";

import { HvAvatar } from "../../../Avatar";

interface IconWrapperProps extends HvBaseProps {
  icon?: React.ReactNode;
  label?: string;
  hasChildren?: boolean;
  showAvatar?: boolean;
  isOpen?: boolean;
  hasAnyChildWithData?: boolean;
}

export const IconWrapper = ({
  icon,
  label,
  hasChildren,
  showAvatar,
  isOpen,
  hasAnyChildWithData,
  ...others
}: IconWrapperProps) => {
  return (
    <div {...others}>
      {showAvatar ? (
        <HvAvatar variant="square" size="xs" backgroundColor="secondary_80">
          {label?.substring(0, 1)}
        </HvAvatar>
      ) : (
        icon
      )}
      {hasChildren && !isOpen ? (
        <Forwards iconSize="XS" />
      ) : (
        hasAnyChildWithData && !isOpen && <div />
      )}
    </div>
  );
};
