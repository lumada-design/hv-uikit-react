import {
  HvBaseTheme,
  HvThemeColorMode,
  HvThemeStructure,
  HvThemeColorModeStructure,
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
  baseTheme?: HvBaseTheme;
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
  baseColorMode?: HvThemeColorMode | string;
  /**
   * If `true` the default color modes will be inherited while creating a new theme. If `false`, the new theme doesn't inherit the color modes.
   * By default the color modes are inherited.
   */
  inheritColorModes?: boolean;
} & HvThemeCustomizationProps;

// Theme customization
export type HvThemeCustomizationProps = HvExtraDeepPartialProps<
  Omit<HvThemeStructure, "colors">
> & {
  colors?: {
    modes?: {
      [key: string]: Partial<HvThemeColorModeStructure> & {
        [key: string]: string;
      };
    };
  };
};

// Customized theme
export type HvCustomizedTheme = HvExtraDeepProps<
  Omit<HvThemeStructure, "colors">
> & {
  colors: {
    modes: {
      [key: string]: HvThemeColorModeStructure & { [key: string]: string };
    };
  };
};
