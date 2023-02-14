import { css, Global } from "@emotion/react";
import {
  CssBaseline,
  getThemesVars,
  ThemeStructure,
  ThemeColors,
  ThemeColorMode,
  BaseTheme,
} from "@hitachivantara/uikit-styles";
import {
  HvExtraDeepPartialProps,
  HvExtraDeepProps,
  HvExtraProps,
} from "../types";
import { getCustomizedThemes } from "../utils";
import { HvThemeProvider } from "./ThemeProvider";

// Theme customization
export type HvThemeCustomizationProps = HvExtraDeepPartialProps<
  Omit<ThemeStructure, "colors">
> & {
  colors?: {
    modes?: {
      [key: string]: Partial<ThemeColors> & { [key: string]: string };
    };
  } & HvExtraProps;
};

// Customized theme
export type HvCustomizedTheme = HvExtraDeepProps<
  Omit<ThemeStructure, "colors">
> & {
  colors: {
    modes: {
      [key: string]: ThemeColors & { [key: string]: string };
    };
  } & HvExtraProps;
};

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

// Provider props
export type HvProviderProps = {
  /**
   * Your component tree.
   */
  children?: React.ReactNode;
  /**
   * By default the baseline styles are applied globally to the application to avoid styling conflicts and for the UI Kit components to work properly.
   * If you are providing your own baseline styles, you can set this property to false.
   */
  enableCssBaseline?: boolean;
  /**
   * Id of your root element. The theme's attributes and CSS variables will be set in this element.
   * If no value is provided, the document's body will be used.
   */
  rootElementId?: string;
  /**
   * The UI Kit theme object used to set the theme and inject the customizations needed to meet specific design needs.
   * If no value is provided, the default theme and mode will be `"ds5"` and `"dawn"`, respectively.
   */
  theme?: HvTheme;
};

/**
 * This component makes cross-component theme properties available down the React tree thanks to React context.
 *
 * The `HvProvider` should preferably be used at **the root of your component tree** and
 * be unique in the App in most cases.
 *
 * ```jsx
 * <HvProvider>
 *   <MyApp />
 * <HvProvider/>
 * ```
 *
 * If several `HvProvider`'s are used in parallel, you'll need to create different root elements and
 * set the `rootElementId` property for each one of the providers. Otherwise, the styling will not work properly.
 *
 * **UI Kit components will not work at all if the `HvProvider` is not configured correctly**,
 * as they will not be able to access the properties of the active theme.
 *
 */
export const HvProvider = ({
  children,
  rootElementId,
  enableCssBaseline = true,
  theme = {},
}: HvProviderProps) => {
  const {
    baseTheme = "ds5",
    baseColorMode = "dawn",
    name,
    ...customizations
  } = theme;

  // Get themes list
  const customizedThemes = getCustomizedThemes(baseTheme, name, customizations);

  return (
    <>
      <Global
        styles={css`
          ${enableCssBaseline && CssBaseline}
          ${getThemesVars(customizedThemes)}
        `}
      />
      <HvThemeProvider
        themes={customizedThemes}
        theme={name || baseTheme}
        colorMode={baseColorMode}
        rootElementId={rootElementId}
      >
        {children}
      </HvThemeProvider>
    </>
  );
};

if (process.env.NODE_ENV !== "production") {
  HvProvider.displayName = "Provider";
}
