import { useContext } from "react";

import { HvAppShellContext, HvAppShellContextValue } from "../AppShellContext";

const useAppShellConfig = (): HvAppShellContextValue => {
  return useContext(HvAppShellContext) as HvAppShellContextValue;
};

export default useAppShellConfig;
