import { Hooks } from "react-table";

export default function useSortBy<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
): void;
