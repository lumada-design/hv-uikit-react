export const getViewLayout = (views, selectedView) =>
  views?.find((v) => v.id === selectedView)?.layout;
