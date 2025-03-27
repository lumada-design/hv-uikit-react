import { useContext } from "react";

import {
  HvAppShellCombinedProvidersContext,
  HvAppShellCombinedProvidersContextValue,
} from "../AppShellCombinedProvidersContext";

const useAppShellCombinedProviders =
  (): HvAppShellCombinedProvidersContextValue => {
    return useContext(
      HvAppShellCombinedProvidersContext,
    ) as HvAppShellCombinedProvidersContextValue;
  };

export default useAppShellCombinedProviders;
