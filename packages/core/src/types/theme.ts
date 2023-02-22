import {
  BaseTheme,
  ThemeColorMode,
  ThemeStructure,
  ThemeColorModeStructure,
} from "@hitachivantara/uikit-styles";
import { HvExtraDeepPartialProps, HvExtraDeepProps } from "../types";

/**
 * Theme structure is be used on the `HvProvider` to set the theme and inject the customizations needed to meet the specific design needs.
 */
export type HvTheme = {
  /**
   * The theme to be used as base for the customization.
   *
   * `"ds5"` will be used as default if no value is provided.
   */
  baseTheme?: BaseTheme;
  /**
   * The name used for the theme.
   *
   * By providing a name, a new theme is created based on the base theme and the customizations provided.
   * If no name is provided, the base theme is customized.
   */
  name?: string;
  /**
   * The color mode to initialize the UI Kit. It can be an existing one or a custom one.
   *
   * `"dawn"` will be used as default if no value is provided.
   */
  baseColorMode?: ThemeColorMode | string;
} & HvThemeCustomizationProps;

// Theme customization
export type HvThemeCustomizationProps = HvExtraDeepPartialProps<
  Omit<ThemeStructure, "colors">
> & {
  colors?: {
    modes?: {
      [key: string]: Partial<ThemeColorModeStructure> & {
        [key: string]: string;
      };
    };
  };
};

// Customized theme
export type HvCustomizedTheme = HvExtraDeepProps<
  Omit<ThemeStructure, "colors">
> & {
  colors: {
    modes: {
      [key: string]: ThemeColorModeStructure & { [key: string]: string };
    };
  };
};
