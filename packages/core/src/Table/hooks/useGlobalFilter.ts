import { useGlobalFilter, Hooks } from "react-table";

export type UseGlobalFilterProps = (<
  D extends object = Record<string, unknown>
>(
  hooks: Hooks<D>
) => void) & { pluginName: string };

// #endregion ##### TYPES #####

const useHvGlobalFilter = useGlobalFilter.bind({});
(useHvGlobalFilter.pluginName as string) = "useHvGlobalFilter";

export default useHvGlobalFilter as UseGlobalFilterProps;
