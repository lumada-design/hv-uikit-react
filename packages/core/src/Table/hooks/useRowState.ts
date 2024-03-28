import { Hooks, useRowState } from "react-table";

// #region ##### TYPES #####

export type UseRowStateProps = (<D extends object = Record<string, unknown>>(
  hooks: Hooks<D>,
) => void) & { pluginName: string };

// #endregion ##### TYPES #####

const useHvRowState = useRowState.bind({});
(useHvRowState.pluginName as string) = "useHvRowState";

export default useHvRowState;
