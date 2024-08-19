import { createContext } from "react";

import type { HvTableCellType } from "./Table";

export type TableSectionContextValue = {
  type?: HvTableCellType;
  filterClassName?: string;
};

export const TableSectionContext = createContext<TableSectionContextValue>({});
