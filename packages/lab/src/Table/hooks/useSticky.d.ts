import { Hooks } from "react-table";

export default function useSticky<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
): void;
