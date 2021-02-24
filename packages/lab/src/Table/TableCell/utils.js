import { SortXS, SortAscendingXS, SortDescendingXS } from "@hv/uikit-react-icons";

export const getSortIcon = (dir) => {
  switch (dir) {
    case "ascending":
      return SortAscendingXS;
    case "descending":
      return SortDescendingXS;
    default:
      return SortXS;
  }
};

export const getSortDir = (sortDirection) => {
  switch (sortDirection) {
    case "asc":
      return "ascending";
    case "desc":
      return "descending";
    default:
      return null;
  }
};
