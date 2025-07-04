import { useContext } from "react";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvBaseProps } from "../../../types/generic";
import { HvHeaderNavigationItemProp } from "../useSelectionPath";
import { SelectionContext } from "../utils/SelectionContext";
import { staticClasses, useClasses } from "./Bar.styles";

export { staticClasses as headerMenuBarClasses };

export type HvHeaderMenuBarClasses = ExtractNames<typeof useClasses>;

export interface BarProps extends HvBaseProps {
  data: HvHeaderNavigationItemProp[];
  type?: "menubar" | "menu";
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
    isMenu && data.some((item) => item.id === selectionPath?.[1]);

  return (
    <div
      className={cx(
        classes.root,
        classes[type],
        {
          [classes.hidden]: isMenu,
          [classes.active]: isActive,
        },
        className,
      )}
    >
      <ul className={classes.list} id={id} onFocus={() => {}}>
        {children}
      </ul>
    </div>
  );
};
