export const getSortIconName = (dir?: string | false) => {
  switch (dir) {
    case "ascending":
      return "SortAsc";
    case "descending":
      return "SortDesc";
    default:
      return "Sort";
  }
};
export const isParagraph = (children: React.ReactNode) => {
  return typeof children === "string" && /\s/.test(children);
};
