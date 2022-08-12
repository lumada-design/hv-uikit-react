import { Hooks } from "react-table";

export default function useGlobalFilter<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
): void;
