import { createContext } from "react";

const TableContext = createContext();

if (process.env.NODE_ENV !== "production") {
  TableContext.displayName = "TableContext";
}

export default TableContext;
