import { clsx } from "clsx";
import { HvTypography } from "@hitachivantara/uikit-react-core";

import classes from "./styles";

interface ListItemProps {
  label: string;
  selected?: boolean;
  layout: "list" | "grid";
}

export const ListItem = ({ label, selected, layout }: ListItemProps) => (
  <div
    className={clsx(classes.item, {
      [classes.selected]: selected,
      [classes.grid]: layout === "grid",
      [classes.list]: layout === "list",
    })}
  >
    {layout === "grid" ? (
      <>
        <div className={clsx([classes.icon, classes.iconGrid])}>
          <div className={clsx(classes.placeholder)}></div>
        </div>
        <HvTypography variant="caption2">{label}</HvTypography>
      </>
    ) : (
      <>
        <HvTypography variant="caption2">{label}</HvTypography>
        <div className={clsx([classes.icon, classes.iconList])}>
          <div className={clsx(classes.placeholder)}></div>
        </div>
      </>
    )}
  </div>
);
