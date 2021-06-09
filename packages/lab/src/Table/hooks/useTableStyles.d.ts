import { Hooks } from "react-table";

export default function useTableStyles<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
): void;
