const selectors = ["Checkbox", "RadioButton"];

const largerIcons = [
  "Level0Good",
  "Level1",
  "Level2Average",
  "Level3Bad",
  "Level4",
  "Level5",
  "Canceled",
  "Running",
  "Pending",
];

/** Whether the component is a selector with special coloring */
export const isSelector = (iconName: string) =>
  selectors.some((el) => iconName.startsWith(el));

export const isSort = (iconName: string) => iconName.startsWith("Sort");

/** Semantic icons have a larger size by default */
export const isSemantic = (iconName: string) => largerIcons.includes(iconName);

export const isXS = (iconName: string) => iconName.endsWith("XS");
