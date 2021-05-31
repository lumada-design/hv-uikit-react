import { TableOptions, PluginHook, TableInstance } from "react-table";

export default function useHvTable<D extends object = Record<string, unknown>>(
  options: TableOptions<D>,
  ...plugins: Array<PluginHook<D>>
): TableInstance<D>;
