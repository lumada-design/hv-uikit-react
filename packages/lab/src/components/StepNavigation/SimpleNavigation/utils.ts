const dotSizes = {
  xs: 8,
  sm: 10,
  md: 12,
  lg: 14,
  xl: 16,
};

const defaultColor = (theme) => theme.colors.secondary ?? "secondary";
const disabledColor = (theme) => theme.colors.secondary_60 ?? "secondary_60";

const getColor = (state, theme) =>
  state === "Disabled" ? disabledColor(theme) : defaultColor(theme);

export { dotSizes, getColor };
