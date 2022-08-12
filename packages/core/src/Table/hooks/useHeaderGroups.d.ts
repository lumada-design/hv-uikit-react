import { Hooks } from "react-table";

export interface UseHvHeaderGroupsInstance {
  hasGroupedColumns?: boolean;
}

// props target: <table><thead><tr><th>
export interface UseHvHeaderGroupsColumnProps {
  groupColumnMostLeft?: boolean;
  groupColumnMostRight?: boolean;
}

// props target: <table><tbody><tr><td>
export interface UseHvHeaderGroupsCellProps {
  groupColumnMostLeft?: boolean;
  groupColumnMostRight?: boolean;
}

export default function useHvHeaderGroups<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
): void;
