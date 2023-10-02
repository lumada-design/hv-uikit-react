import { clsx } from "clsx";
import { useState } from "react";
import { HvTypography } from "@hitachivantara/uikit-react-core";
import { Drag, MoreOptionsVertical } from "@hitachivantara/uikit-react-icons";

import { Sortable } from "components/common";
import classes from "./styles";

interface PageItemProps {
  id: string;
  label: string;
  onClick: (id: string) => void;
  selected: boolean;
}

export const PageItem = ({ id, label, onClick, selected }: PageItemProps) => {
  const [isOver, setIsOver] = useState(false);

  const handleMouseOver = () => {
    setIsOver(true);
  };

  const handleMouseOut = () => {
    setIsOver(false);
  };

  return (
    <Sortable
      id={id}
      className={clsx(classes.item, {
        [classes.selected]: selected,
      })}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={() => onClick(id)}
    >
      <Drag
        iconSize="XS"
        className={clsx(classes.icon, classes.drag, {
          [classes.show]: isOver,
        })}
      />
      <HvTypography>{label}</HvTypography>
      <MoreOptionsVertical
        iconSize="XS"
        style={{ marginLeft: "auto" }}
        className={clsx(classes.icon, {
          [classes.show]: isOver || selected,
        })}
      />
    </Sortable>
  );
};
