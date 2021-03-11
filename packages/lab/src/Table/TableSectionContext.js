import { createContext } from "react";

const TableSectionContext = createContext();

if (process.env.NODE_ENV !== "production") {
  TableSectionContext.displayName = "TableSectionContext";
}

export default TableSectionContext;
