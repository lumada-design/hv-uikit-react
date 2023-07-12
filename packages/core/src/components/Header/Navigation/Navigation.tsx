import { clsx } from "clsx";
import { MouseEvent } from "react";
import { useSelectionPath } from "@core/hooks";
import { HvBaseProps } from "@core/types";
import { HvMenuBar, HvMenuBarProps } from "./MenuBar";
import { StyledNav } from "./Navigation.styles";
import { FocusProvider } from "./utils/FocusContext";
import { SelectionContext } from "./utils/SelectionContext";
import headerNavigationClasses, {
  HvHeaderNavigationClasses,
} from "./navigationClasses";

export interface HvHeaderNavigationItemProp {
  id: string;
  label: string;
  path?: string;
  href?: string;
  target?: string;
  data?: HvHeaderNavigationItemProp[];
}

export interface HvHeaderNavigationProps
  extends HvBaseProps<HTMLDivElement, "onClick"> {
  data: HvHeaderNavigationItemProp[];
  selected?: string;
  onClick?: (event: MouseEvent, selection: HvHeaderNavigationItemProp) => void;
  classes?: HvHeaderNavigationClasses;
  maxDepth?: 0 | 1;
}

export const HvHeaderNavigation = ({
  data,
  selected,
  onClick,
  className,
  classes,
  maxDepth = 1,
  ...others
}: HvHeaderNavigationProps) => {
  const selectionPath = useSelectionPath(data, selected);

  const handleClick: HvMenuBarProps["onClick"] = (event, selection) => {
    event.preventDefault();

    onClick?.(event, selection);
  };

  return (
    <SelectionContext.Provider value={selectionPath}>
      <FocusProvider>
        <StyledNav
          className={clsx(
            className,
            headerNavigationClasses.root,
            classes?.root
          )}
          {...others}
        >
          <HvMenuBar
            data={data}
            type="menubar"
            onClick={handleClick}
            maxDepth={maxDepth}
            currentDepth={0}
          />
        </StyledNav>
      </FocusProvider>
    </SelectionContext.Provider>
  );
};
