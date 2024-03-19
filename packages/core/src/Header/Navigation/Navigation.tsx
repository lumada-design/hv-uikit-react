import { HvBaseProps } from "../../types/generic";
import { useDefaultProps } from "../../hooks/useDefaultProps";
import { ExtractNames } from "../../utils/classes";

import { HvHeaderMenuBar, HvHeaderMenuBarProps } from "./MenuBar";
import { staticClasses, useClasses } from "./Navigation.styles";
import { FocusProvider } from "./utils/FocusContext";
import { SelectionContext } from "./utils/SelectionContext";
import {
  HvHeaderNavigationItemProp,
  useSelectionPath,
} from "./useSelectionPath";

export { staticClasses as headerNavigationClasses };

export type HvHeaderNavigationClasses = ExtractNames<typeof useClasses>;

export interface HvHeaderNavigationProps
  extends HvBaseProps<HTMLDivElement, "onClick"> {
  data: HvHeaderNavigationItemProp[];
  selected?: string;
  onClick?: (
    event: React.MouseEvent,
    selection: HvHeaderNavigationItemProp
  ) => void;
  classes?: HvHeaderNavigationClasses;
  /**
   * The number of levels to show: the first level (1) or the first and second level (2).
   *
   * Defaults to `2`.
   * */
  levels?: 1 | 2;
}

export const HvHeaderNavigation = (props: HvHeaderNavigationProps) => {
  const {
    data,
    selected,
    onClick,
    className,
    classes: classesProp,
    levels = 2,
    ...others
  } = useDefaultProps("HvHeaderNavigation", props);

  const { classes, cx } = useClasses(classesProp);

  const selectionPath = useSelectionPath(data, selected);

  const handleClick: HvHeaderMenuBarProps["onClick"] = (event, selection) => {
    event.preventDefault();

    onClick?.(event, selection);
  };

  return (
    <SelectionContext.Provider value={selectionPath}>
      <FocusProvider>
        <nav className={cx(classes.root, className)} {...others}>
          <HvHeaderMenuBar
            data={data}
            type="menubar"
            onClick={handleClick}
            levels={levels}
            currentLevel={1}
          />
        </nav>
      </FocusProvider>
    </SelectionContext.Provider>
  );
};
