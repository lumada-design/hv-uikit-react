import { CSSProperties } from "react";
import { Hooks } from "react-table";

// table definition:
export type UseHvTableStylesTableOptions = {
  style?: CSSProperties;
  className?: string;
  classes?: Record<string, string>;
};

// column definition:
export interface UseHvTableStylesColumnOptions {
  variant?: "checkbox" | "expand" | "actions" | "default" | "none";
  align?: "center" | "inherit" | "justify" | "left" | "right";

  style?: CSSProperties;
  className?: string;
  classes?: Record<string, string>;

  headerStyle?: CSSProperties;
  headerClassName?: string;
  headerClasses?: Record<string, string>;

  cellStyle?: CSSProperties;
  cellClassName?: string;
  cellClasses?: Record<string, string>;
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
