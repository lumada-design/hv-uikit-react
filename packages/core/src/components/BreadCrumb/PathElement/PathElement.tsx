import { DropRightXS } from "@hitachivantara/uikit-icons";
import clsx from "clsx";
import { StyledLi } from "./PathElement.styles";
import { HvPathElementClasses, pathElementClasses } from ".";

export type HvPathElementProps = {
  last?: boolean;
  classes?: HvPathElementClasses;
  children: React.ReactElement;
};

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
          color="atmo5"
        />
      )}
    </StyledLi>
  );
};
