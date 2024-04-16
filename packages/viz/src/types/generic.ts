import type ColumnTable from "arquero/dist/types/table/column-table";

/** Empty cell mode */
export const emptyCellMode = ["connect", "void"] as const;
export type HvChartEmptyCellMode = (typeof emptyCellMode)[number];

/** Chart data */
export type HvChartData =
  | Map<string | number, (string | number)[]>
  | Record<string | number, (string | number)[]>
  | Record<string | number, string | number>[]
  | ColumnTable;
