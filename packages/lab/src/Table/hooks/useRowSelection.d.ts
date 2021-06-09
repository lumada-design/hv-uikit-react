import { Hooks } from "react-table";

export default function useRowSelection<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
): void;
