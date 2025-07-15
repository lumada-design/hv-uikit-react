import { HvTheme } from "@hitachivantara/uikit-react-core";

export const groupsToShow = [
  "acce",
  "atmo",
  "base",
  "sema",
  "sup",
  "cat",
] as const;

const accentColors = [
  "primary",
  "primary_80",
  "primary_20",
  "brand",
  "secondary",
  "secondary_60",
  "secondary_80",
];

const semanticColors = [
  "positive",
  "neutral",
  "warning",
  "negative",
  "catastrophic",
  "neutral_20",
  "positive_80",
  "positive_120",
  "positive_20",
  "negative_20",
  "negative_120",
  "negative_80",
  "warning_20",
  "warning_140",
  "warning_120",
];

export const getColors = (
  type: (typeof groupsToShow)[number],
  colors?: HvTheme["colors"]["modes"][number],
) => {
  const res: Record<string, string> = {};
  for (const key in colors) {
    if (
      key.includes(type) ||
      (type === "acce" && accentColors.includes(key)) ||
      (type === "sema" && semanticColors.includes(key))
    ) {
      res[key] = colors[key];
    }
  }
  return res;
};

export const getColorGroupName = (type: (typeof groupsToShow)[number]) => {
  switch (type) {
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
    case "cat":
      return "Categorical";
    default:
      return type;
  }
};
