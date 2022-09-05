const getColor = (state, theme) =>
  ({
    Pending: theme?.hv?.palette?.semantic?.sema3 ?? "sema3",
    Failed: theme?.hv?.palette?.semantic?.sema4 ?? "sema4",
    Completed: theme?.hv?.palette?.semantic?.sema1 ?? "sema1",
    Current: theme?.hv?.palette?.accent?.acce1 ?? "acce1",
    Disabled: theme?.hv?.palette?.atmosphere?.atmo5 ?? "atmo5",
    Enabled: theme?.hv?.palette?.accent?.acce1 ?? "acce1",
  }[state]);

const EXTRA_SMALL = { container: 32, avatar: 24 };
const SMALL = { container: 40, avatar: 32 };
const MEDIUM = { container: 48, avatar: 40 };
const LARGE = { container: 60, avatar: 52 };
const EXTRA_LARGE = { container: 96, avatar: 88 };

const stepSizes = {
  XS: EXTRA_SMALL,
  SM: SMALL,
  MD: MEDIUM,
  LG: LARGE,
  XL: EXTRA_LARGE,
};

export { getColor, stepSizes };
