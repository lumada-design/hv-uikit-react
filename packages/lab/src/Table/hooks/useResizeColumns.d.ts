import { Hooks } from "react-table";

// getHeaderProps:
export interface UseHvResizeColumnProps {
  resizable?: boolean;
  resizing?: boolean;
}

// getCellProps:
export interface UseHvResizeTableCellProps {
  resizable?: boolean;
  resizing?: boolean;
}

export default function useHvResizeColumns<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
): void;
