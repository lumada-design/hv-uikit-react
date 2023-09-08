import { MouseEvent } from "react";

import { HvBaseProps } from "@core/types/generic";

import { useDefaultProps } from "@core/hooks";

import { HvHeaderMenuItem } from "../MenuItem";
import { HvHeaderNavigationItemProp } from "../useSelectionPath";
import { Bar, BarProps, HvHeaderMenuBarClasses } from "./Bar";

export interface HvHeaderMenuBarProps
  extends HvBaseProps<HTMLDivElement, "onClick"> {
  data: HvHeaderNavigationItemProp[];
  type?: BarProps["type"];
  onClick?: (event: MouseEvent, selection: HvHeaderNavigationItemProp) => void;
  levels: number;
  currentLevel: number;
  classes?: HvHeaderMenuBarClasses;
}

export const HvHeaderMenuBar = (props: HvHeaderMenuBarProps) => {
  const {
    data = [],
    onClick,
    type = "menubar",
    levels,
    currentLevel,
    classes,
    ...others
  } = useDefaultProps("HvHeaderMenuBar", props);
  return (
    <Bar data={data} type={type} classes={classes} {...others}>
      {data.map((item: HvHeaderNavigationItemProp) => (
        <HvHeaderMenuItem
          key={item.id}
          item={item}
          type={type}
          onClick={onClick}
          levels={levels}
          currentLevel={currentLevel}
        />
      ))}
    </Bar>
  );
};
