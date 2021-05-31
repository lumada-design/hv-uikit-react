import { Hooks } from "react-table";

export default function usePagination<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
): void;
