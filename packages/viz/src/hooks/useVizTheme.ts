import { useContext } from "react";

import { HvVizContext, HvVizContextValue } from "@viz/providers";

export const useVizTheme = (): HvVizContextValue => {
  return useContext(HvVizContext);
};
