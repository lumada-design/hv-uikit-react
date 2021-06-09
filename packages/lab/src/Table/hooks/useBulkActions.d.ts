import { Hooks } from "react-table";

export default function useBulkActions<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
): void;
