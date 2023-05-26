import { theme } from "@hitachivantara/uikit-styles";

export const getBorderStyles = (
  type: string,
  color: string,
  borderRadius?: string
) => {
  const rowBorderRadius = borderRadius || theme.table.rowBorderRadius;
  if (type === "row") {
    return {
      "& td:first-of-type": {
        borderLeft: `1px solid ${color}`,
        borderTop: `1px solid ${color}`,
        borderBottom: `1px solid ${color}`,
        borderRadius: `${rowBorderRadius} 0 0 ${rowBorderRadius}`,
      },
      "& td:last-child": {
        borderRight: `1px solid ${color}`,
        borderTop: `1px solid ${color}`,
        borderBottom: `1px solid ${color}`,
        borderRadius: `0 ${rowBorderRadius} ${rowBorderRadius} 0`,
      },
      "& td:not(:first-of-type):not(:last-child)": {
        borderTop: `1px solid ${color}`,
        borderBottom: `1px solid ${color}`,
      },
    };
  }
  if (type === "cell") {
    return {
      ":first-of-type&": {
        borderLeft: `1px solid ${theme.table.rowBorderColor}`,
        borderTop: `1px solid ${theme.table.rowBorderColor}`,
        borderBottom: `1px solid ${theme.table.rowBorderColor}`,
        borderRadius: `${rowBorderRadius} 0 0 ${rowBorderRadius}`,
      },
      ":last-child&": {
        borderRight: `1px solid ${theme.table.rowBorderColor}`,
        borderTop: `1px solid ${theme.table.rowBorderColor}`,
        borderBottom: `1px solid ${theme.table.rowBorderColor}`,
        borderRadius: `0 ${rowBorderRadius} ${rowBorderRadius} 0`,
      },
      ":not(:first-of-type):not(:last-child)&": {
        borderTop: `1px solid ${theme.table.rowBorderColor}`,
        borderBottom: `1px solid ${theme.table.rowBorderColor}`,
      },
    };
  }
};

export const checkValidHexColorValue = (value?: string): boolean => {
  const reg = /^#([0-9a-f]{3}){1,2}$/i;
  return value ? reg.test(value) : false;
};
