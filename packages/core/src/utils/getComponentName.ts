const getComponentName = (Component) =>
  Component.displayName || Component.name || "";

export default getComponentName;
