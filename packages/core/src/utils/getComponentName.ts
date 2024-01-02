export const getComponentName = (Component: React.FC) =>
  Component.displayName || Component.name || "";
