import type { Property } from "csstype";

import { baseTheme } from "../theme/base";
import { light } from "../theme/colorModes";
import { base, categorical } from "../theme/colors";
import { space } from "../theme/designTokens";
import { DeepString } from "./common";
import { HvThemeComponents, HvThemeComponentsProps } from "./components";
import { HvThemeTypography } from "./typography";

/** All theme tokens, including design tokens and color definitions. */
export type HvThemeTokens = typeof baseTheme;

/** Supported breakpoint names. */
export type HvThemeBreakpoint = Exclude<keyof typeof space, "base">;

/** Supported base design system names. */
export type HvBaseTheme = "ds3" | "ds5" | "pentahoPlus";

/** Theme base colors, excluding the `dark` mode variant. */
export type HvThemeColors = typeof base & typeof categorical & typeof light;

/** Named color modes available for a theme. */
export type HvThemeColorMode = "dawn" | "wicked";

/** Type of color mode for accessibility or media queries. */
export type HvThemeColorModeType = "light" | "dark";

/** A type with all the accepted colors from the color palette */
export type HvColor = keyof HvThemeColors;

/**
 * A type representing an `HvColor` from the palette or any other color string
 * @example "secondary" "brand" "atmo2" "#FF0000" "purple" "inherit"
 * */
export type HvColorAny = HvColor | Property.Color;

/**
 * Structure representing a single color mode (e.g., `dawn` or `wicked`).
 * Extends the resolved color tokens and includes a `type` for color scheme metadata.
 */
export interface HvThemeColorModeStructure extends HvThemeColors {
  type: HvThemeColorModeType;
}

/**
 * Flattened theme structure, used for CSS variable mapping.
 * Includes design tokens, component-level tokens, and typography.
 */
export type HvThemeVars = DeepString<HvThemeTokens> &
  DeepString<HvThemeComponents> &
  DeepString<HvThemeTypography>;

/**
 * Runtime structure of a theme.
 * Combines token values (excluding top-level `colors`), component tokens,
 * typography styles, and named color modes.
 */
export interface HvThemeStructure<Mode extends string = string>
  extends HvThemeComponents,
    HvThemeComponentsProps,
    HvThemeTypography,
    Omit<HvThemeTokens, "colors"> {
  /** Theme identifier (e.g., `"uikit"`). */
  name: string;
  /** Design system version (e.g., `"ds5"`). */
  base: HvBaseTheme;
  /** Map of named color modes used in the theme. */
  colors: {
    modes: Record<Mode, HvThemeColorModeStructure>;
  };
}

/**
 * A user-supplied theme definition.
 * Can partially override tokens, components, or typography.
 */
export interface HvCustomTheme<Mode extends string = string>
  extends HvThemeComponents,
    HvThemeComponentsProps,
    HvThemeTypography,
    Partial<Omit<HvThemeTokens, "colors">> {
  /** Custom theme identifier. */
  name: string;
  /** Named color modes with partial overrides. */
  colors: {
    modes: Record<Mode, Partial<HvThemeColorModeStructure>>;
  };
}
