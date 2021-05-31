import { Hooks } from "react-table";

export default function useRowExpand<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
): void;
