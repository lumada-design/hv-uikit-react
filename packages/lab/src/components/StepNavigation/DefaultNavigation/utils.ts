const getColor = (state, theme) =>
  ({
    Pending: theme.colors.warning ?? "warning",
    Failed: theme.colors.negative ?? "negative",
    Completed: theme.colors.positive ?? "positive",
    Current: theme.colors.secondary ?? "secondary",
    Disabled: theme.colors.secondary_60 ?? "secondary_60",
    Enabled: theme.colors.secondary ?? "secondary",
  }[state]);

const getSemantic = (state) =>
  ({
    Pending: "warning",
    Failed: "negative",
    Completed: "positive",
    Current: "secondary",
    Disabled: "secondary_60",
    Enabled: "secondary",
  }[state]);

const EXTRA_SMALL = { container: 32, avatar: 24 };
const SMALL = { container: 40, avatar: 32 };
const MEDIUM = { container: 48, avatar: 40 };
const LARGE = { container: 60, avatar: 52 };
const EXTRA_LARGE = { container: 96, avatar: 88 };

const stepSizes = {
  xs: EXTRA_SMALL,
  sm: SMALL,
  md: MEDIUM,
  lg: LARGE,
  xl: EXTRA_LARGE,
};

export { getColor, getSemantic, stepSizes };
