import {
  HvThemeStructure,
  HvThemeColorModeStructure,
} from "@hitachivantara/uikit-styles";

import { HvExtraDeepProps } from "./generic";

/**
 * Theme structure
 */
export type HvTheme = HvExtraDeepProps<Omit<HvThemeStructure, "colors">> & {
  colors: {
    modes: {
      [key: string]: HvThemeColorModeStructure & { [key: string]: string };
    };
  };
};
