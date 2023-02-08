import { createContext } from "react";

export type TableSectionContextProps = {
  type?: string;
  filterClassName?: string;
};

const TableSectionContext = createContext<TableSectionContextProps>({});

export default TableSectionContext;
