export const getColors = (colors, type) => {
  const res = {};
  for (const key in colors) {
    if (key.includes(type)) {
      res[key] = colors[key];
    }
  }
  return res;
};

export const getColorGroupName = (color) => {
  switch (color) {
    case "acce":
      return "Accent";
    case "atmo":
      return "Atmosphere";
    case "base":
      return "Base";
    case "sema":
      return "Semantic";
    case "sup":
      return "Support";
    case "cviz":
      return "Visualizations";
    default:
      return "";
  }
};
