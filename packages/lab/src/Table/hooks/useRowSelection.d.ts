import { Hooks } from "react-table";

// getRowProps:
export interface UseHvRowSelectionTableRowProps {
  selected?: boolean;
}

export default function useRowSelection<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
): void;
