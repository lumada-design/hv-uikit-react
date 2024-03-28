import {
  HvThemeColorModeStructure,
  HvThemeStructure,
} from "@hitachivantara/uikit-styles";

// This type allows to pass undetermined extra props to components
export type HvExtraProps = { [key: string]: any };

// This type allows to pass undetermined extra props to components recursively
export type HvExtraDeepProps<T> = {
  [P in keyof T]: T[P] & HvExtraProps;
} & HvExtraProps;

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
