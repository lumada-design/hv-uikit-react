import {
  SortXS,
  SortAscendingXS,
  SortDescendingXS,
} from "@hitachivantara/uikit-react-icons";

export const getSortIcon = (dir?: string | false) => {
  switch (dir) {
    case "ascending":
      return SortAscendingXS;
    case "descending":
      return SortDescendingXS;
    default:
      return SortXS;
  }
};

export const isParagraph = (children: React.ReactNode) => {
  return typeof children === "string" && /\s/.test(children);
};
