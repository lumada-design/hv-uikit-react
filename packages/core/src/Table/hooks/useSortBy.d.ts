import { Hooks } from "react-table";

// getHeaderProps:
export interface UseHvSortByColumnProps {
  sortable?: boolean;
  sorted?: boolean;
  sortDirection?: "descending" | "ascending";
  onClick: (e: React.MouseEvent<HTMLTableHeaderCellElement | HTMLTableCellElement>) => void;
}

// getCellProps:
export interface UseHvSortByTableCellProps {
  sorted?: boolean;
}

export default function useHvSortBy<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
): void;
