import { ds5 } from "@hitachivantara/uikit-styles";

export const getBreakpoints = () => {
  const gutters = { xs: 16, sm: 16, md: 32, lg: 32, xl: 32 };
  const columns = { xs: 4, sm: 8, md: 12, lg: 12, xl: 12 };

  return Object.entries(ds5.breakpoints.values).reduce((acc, curr) => {
    const [key, value] = curr;
    acc[key] = {
      value,
      gutter: gutters[key],
      column: columns[key],
    };
    return acc;
  }, {});
};
