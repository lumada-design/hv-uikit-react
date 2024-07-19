import { ds5 } from "@hitachivantara/uikit-styles";

export const getBreakpoints = () => {
  const gutters = { xs: 16, sm: 16, md: 32, lg: 32, xl: 32 };
  const columns = { xs: 4, sm: 8, md: 12, lg: 12, xl: 12 };

  return Object.entries(ds5.breakpoints.values).reduce<
    Record<string, { value: number; gutter: number; column: number }>
  >((acc, curr) => {
    const [key, value] = curr;
    acc[key] = {
      value,
      gutter: gutters[key as keyof typeof gutters],
      column: columns[key as keyof typeof columns],
    };
    return acc;
  }, {});
};
