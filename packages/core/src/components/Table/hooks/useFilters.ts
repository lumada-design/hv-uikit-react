import { useFilters as useHvFilters, Hooks } from "react-table";

export type UseFiltersProps = (<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>
) => void) & { pluginName: string };

// #endregion ##### TYPES #####

useHvFilters.pluginName = "useHvFilters";

export default useHvFilters as UseFiltersProps;
