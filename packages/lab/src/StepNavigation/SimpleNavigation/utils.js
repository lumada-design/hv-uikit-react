const dotSizes = {
  XS: 8,
  SM: 10,
  MD: 12,
  LG: 14,
  XL: 16,
};

const defaultColor = (theme) => theme?.hv?.palette?.accent?.acce1;
const disabledColor = (theme) => theme?.hv?.palette?.atmosphere?.atmo5;

export { dotSizes, defaultColor, disabledColor };
