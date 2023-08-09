import { theme } from "@hitachivantara/uikit-styles";

export const getBorderStyles = (
  type: "row",
  color = theme.table.rowBorderColor,
  rowBorderRadius = theme.table.rowBorderRadius
) => {
  return {
    "& td": {
      borderTop: `1px solid ${color}`,
      borderBottom: `1px solid ${color}`,
    },
    "& td:first-of-type": {
      borderLeft: `1px solid ${color}`,
      borderRadius: `${rowBorderRadius} 0 0 ${rowBorderRadius}`,
    },
    "& td:last-of-type": {
      borderRight: `1px solid ${color}`,
      borderRadius: `0 ${rowBorderRadius} ${rowBorderRadius} 0`,
    },
  };
};
