export const examplesMap = {
  Input: "inputs",
  Tag: "tags",
  Loading: "loading",
  Dropdown: "dropdowns",
};

export const examplesContexts = {
  dropdowns: (require as any).context(
    "!!raw-loader!../../app/examples/dropdowns",
    false,
    /\.tsx$/,
  ),
  inputs: (require as any).context(
    "!!raw-loader!../../app/examples/inputs",
    false,
    /\.tsx$/,
  ),
  loading: (require as any).context(
    "!!raw-loader!../../app/examples/loading",
    false,
    /\.tsx$/,
  ),
  tags: (require as any).context(
    "!!raw-loader!../../app/examples/tags",
    false,
    /\.tsx$/,
  ),
};
