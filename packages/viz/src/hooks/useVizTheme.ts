import { HvVizContext, HvVizContextValue } from "@viz/providers";
import { useContext } from "react";

export const useVizTheme = (): HvVizContextValue => {
  return useContext(HvVizContext);
};
