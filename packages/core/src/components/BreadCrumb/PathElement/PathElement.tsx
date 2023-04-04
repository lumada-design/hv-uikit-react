import { DropRightXS } from "@hitachivantara/uikit-react-icons";
import clsx from "clsx";
import { StyledLi } from "./PathElement.styles";
import pathElementClasses, { HvPathElementClasses } from "./pathElementClasses";

export interface HvPathElementProps {
  last?: boolean;
  classes?: HvPathElementClasses;
  children: React.ReactElement;
}

export const HvPathElement = ({
  classes,
  last = false,
  children,
}: HvPathElementProps) => {
  return (
    <StyledLi
      className={clsx(
        pathElementClasses.centerContainer,
        classes?.centerContainer
      )}
    >
      {children}
      {!last && (
        <DropRightXS
          className={clsx(
            pathElementClasses.separatorContainer,
            classes?.separatorContainer
          )}
          color="secondary_60"
        />
      )}
    </StyledLi>
  );
};
