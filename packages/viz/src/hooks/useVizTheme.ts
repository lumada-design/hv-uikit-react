import { useContext } from "react";

import { HvVizContext, HvVizContextValue } from "@viz/providers/Provider";

export const useVizTheme = (): HvVizContextValue => {
  return useContext(HvVizContext);
};
