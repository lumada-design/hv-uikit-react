import { MouseEvent } from "react";

import { HvBaseProps } from "@core/types/generic";

import { HvHeaderMenuItem } from "../MenuItem";
import { HvHeaderNavigationItemProp } from "../useSelectionPath";
import { Bar } from "./Bar";

export interface HvHeaderMenuBarProps
  extends HvBaseProps<HTMLDivElement, "onClick"> {
  data: HvHeaderNavigationItemProp[];
  type: string;
  onClick?: (event: MouseEvent, selection: HvHeaderNavigationItemProp) => void;
  levels: number;
  currentLevel: number;
}

export const HvHeaderMenuBar = ({
  data = [],
  onClick,
  type = "menubar",
  levels,
  currentLevel,
  ...others
}: HvHeaderMenuBarProps) => {
  return (
    <Bar data={data} type={type} {...others}>
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
