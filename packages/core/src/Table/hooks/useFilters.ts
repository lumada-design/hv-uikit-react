import { Hooks, useFilters } from "react-table";

export type UseFiltersProps = (<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>,
) => void) & { pluginName: string };

// #endregion ##### TYPES #####

const useHvFilters = useFilters.bind({});
(useHvFilters.pluginName as string) = "useHvFilters";

export default useHvFilters as UseFiltersProps;
