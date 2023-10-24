import { useContext } from "react";

import { HvBaseProps } from "@core/types/generic";
import { ExtractNames } from "@core/utils/classes";

import { useDefaultProps } from "@core/hooks";

import { SelectionContext } from "../utils/SelectionContext";
import { staticClasses, useClasses } from "./Bar.styles";
import { HvHeaderNavigationItemProp } from "../useSelectionPath";

export { staticClasses as headerMenuBarClasses };

export type HvHeaderMenuBarClasses = ExtractNames<typeof useClasses>;

export interface BarProps extends HvBaseProps {
  data: HvHeaderNavigationItemProp[];
  type?: string;
  classes?: HvHeaderMenuBarClasses;
}

export const Bar = (props: BarProps) => {
  const {
    id,
    data = [],
    type = "menubar",
    className,
    children,
    classes: classesProp,
  } = useDefaultProps("HvHeaderMenuBarBar", props);
  const { classes, cx } = useClasses(classesProp);

  const selectionPath = useContext(SelectionContext);

  const isMenu = type === "menu";

  const isActive =
    isMenu && data.filter((item) => item.id === selectionPath?.[1]).length > 0;

  return (
    <div
      className={cx(
        classes.root,
        classes[type],
        {
          [classes.hidden]: isMenu,
          [classes.active]: isActive,
        },
        className
      )}
    >
      <ul className={classes.list} id={id} onFocus={() => {}}>
        {children}
      </ul>
    </div>
  );
};
