import { Hooks } from "react-table";

// column definition:
export interface UseHvTableStylesColumnOptions {
  variant?: "checkbox" | "expand" | "actions" | "default" | "none";
  align?: "center" | "inherit" | "justify" | "left" | "right";
}

// PROPS:
export interface UseHvTableStylesTableRowProps {
  hover?: boolean;
}

export interface UseHvTableStylesTableCellProps {
  variant?: "checkbox" | "expand" | "actions" | "default" | "none";
  align?: "center" | "inherit" | "justify" | "left" | "right";
}

export default function useTableStyles<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
): void;
