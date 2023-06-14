import {
  HvBaseTheme,
  HvThemeStructure,
  HvThemeColorModeStructure,
} from "@hitachivantara/uikit-styles";
import type { HvTheme } from "@hitachivantara/uikit-react-shared";
import { HvExtraDeepPartialProps } from "@core/types";

export type { HvTheme };

/**
 * Create theme props
 */
export interface HvCreateThemeProps extends HvThemeCustomizationProps {
  /**
   * The name used for the theme.
   *
   * This is a required property to create a theme.
   */
  name: string;
  /**
   * The theme to be used as base.
   *
   * `"ds5"` will be used as default if no value is provided.
   */
  base?: HvBaseTheme;
  /**
   * If `true` the default color modes (dawn and wicked) of the base theme will be inherited while creating the theme.
   * If `false`, the new theme doesn't inherit the default color modes.
   *
   * By default the color modes are inherited.
   */
  inheritColorModes?: boolean;
}

// Theme customization
export type HvThemeCustomizationProps = HvExtraDeepPartialProps<
  Omit<HvThemeStructure, "colors" | "name" | "base">
> & {
  colors?: {
    modes?: {
      [key: string]: Partial<HvThemeColorModeStructure> & {
        [key: string]: string;
      };
    };
  };
};
