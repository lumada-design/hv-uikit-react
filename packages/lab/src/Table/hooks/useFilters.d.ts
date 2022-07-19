import { Hooks } from "react-table";

export default function useFilters<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
): void;
