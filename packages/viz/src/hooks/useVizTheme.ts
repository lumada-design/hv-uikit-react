import { useContext } from "react";

import { HvVizContext, HvVizContextValue } from "../providers/Provider";

export const useVizTheme = (): HvVizContextValue => {
  return useContext(HvVizContext);
};
