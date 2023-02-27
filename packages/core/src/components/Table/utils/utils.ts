import { theme } from "@hitachivantara/uikit-styles";

export const getBorderStyles = (type: string, color: string) => {
  if (type === "row") {
    return {
      "& td:first-of-type": {
        borderLeft: `1px solid ${color}`,
        borderTop: `1px solid ${color}`,
        borderBottom: `1px solid ${color}`,
        borderRadius: `${theme.table.rowBorderRadius} 0 0 ${theme.table.rowBorderRadius}`,
      },
      "& td:last-child": {
        borderRight: `1px solid ${color}`,
        borderTop: `1px solid ${color}`,
        borderBottom: `1px solid ${color}`,
        borderRadius: `0 ${theme.table.rowBorderRadius} ${theme.table.rowBorderRadius} 0`,
      },
      "& td:not(:first-of-type):not(:last-child)": {
        borderTop: `1px solid ${color}`,
        borderBottom: `1px solid ${color}`,
      },
    };
  } else if (type === "cell") {
    return {
      ":first-of-type&": {
        borderLeft: `1px solid ${theme.table.rowBorderColor}`,
        borderTop: `1px solid ${theme.table.rowBorderColor}`,
        borderBottom: `1px solid ${theme.table.rowBorderColor}`,
        borderRadius: `${theme.table.rowBorderRadius} 0 0 ${theme.table.rowBorderRadius}`,
      },
      ":last-child&": {
        borderRight: `1px solid ${theme.table.rowBorderColor}`,
        borderTop: `1px solid ${theme.table.rowBorderColor}`,
        borderBottom: `1px solid ${theme.table.rowBorderColor}`,
        borderRadius: `0 ${theme.table.rowBorderRadius} ${theme.table.rowBorderRadius} 0`,
      },
      ":not(:first-of-type):not(:last-child)&": {
        borderTop: `1px solid ${theme.table.rowBorderColor}`,
        borderBottom: `1px solid ${theme.table.rowBorderColor}`,
      },
    };
  }
};
