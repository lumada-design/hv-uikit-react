const dotSizes = {
  XS: 8,
  SM: 10,
  MD: 12,
  LG: 14,
  XL: 16,
};

const defaultColor = (theme) => theme?.hv?.palette?.accent?.acce1 ?? "acce1";
const disabledColor = (theme) => theme?.hv?.palette?.atmosphere?.atmo5 ?? "atmo5";

const getColor = (state, theme) =>
  state === "Disabled" ? disabledColor(theme) : defaultColor(theme);

export { dotSizes, getColor };
