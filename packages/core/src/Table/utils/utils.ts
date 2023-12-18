export const getBorderStyles = (color: string, rowBorderRadius: string) => {
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
