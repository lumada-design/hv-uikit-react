import { clsx } from "clsx";
import { useDefaultProps } from "@core/hooks/useDefaultProps";

import { MouseEvent } from "react";

import { HvBaseProps } from "@core/types/generic";

import { HvHeaderMenuBar, HvHeaderMenuBarProps } from "./MenuBar";
import { StyledNav } from "./Navigation.styles";
import { FocusProvider } from "./utils/FocusContext";
import { SelectionContext } from "./utils/SelectionContext";
import headerNavigationClasses, {
  HvHeaderNavigationClasses,
} from "./navigationClasses";
import {
  HvHeaderNavigationItemProp,
  useSelectionPath,
} from "./useSelectionPath";

export interface HvHeaderNavigationProps
  extends HvBaseProps<HTMLDivElement, "onClick"> {
  data: HvHeaderNavigationItemProp[];
  selected?: string;
  onClick?: (event: MouseEvent, selection: HvHeaderNavigationItemProp) => void;
  classes?: HvHeaderNavigationClasses;
  levels?: 1 | 2;
}

export const HvHeaderNavigation = (props: HvHeaderNavigationProps) => {
  const {
    data,
    selected,
    onClick,
    className,
    classes,
    levels = 2,
    ...others
  } = useDefaultProps("HvHeaderNavigation", props);

  const selectionPath = useSelectionPath(data, selected);

  const handleClick: HvHeaderMenuBarProps["onClick"] = (event, selection) => {
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
          <HvHeaderMenuBar
            data={data}
            type="menubar"
            onClick={handleClick}
            levels={levels}
            currentLevel={1}
          />
        </StyledNav>
      </FocusProvider>
    </SelectionContext.Provider>
  );
};
