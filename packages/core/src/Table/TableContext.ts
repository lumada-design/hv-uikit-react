import { createContext } from "react";

export type TableContextProps = {
  components?: any;
  variant?: string;
};

const TableContext = createContext<TableContextProps>({});

export default TableContext;
