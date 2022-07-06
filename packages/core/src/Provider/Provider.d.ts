import * as React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { GenerateId } from "jss";
import { HvTheme } from "..";

export type HvUiKitThemeNames = "dawn" | "wicked";

export interface GenerateClassNameOptions {
  /**
   * Disable the generation of deterministic class names. Defaults to `false`.
   */
  disableGlobal?: boolean;
  /**
   * The string used to prefix the class names in production. Defaults to `"jss-uikit"`.
   */
  productionPrefix?: string;
  /**
   * The string used to uniquely identify the generator. Defaults to `""`.
   * It can be used to avoid class name collisions when using multiple generators in the same document.
   */
  seed?: string;
}

export interface HvProviderProps {
  /**
   * Your component tree.
   */
  children: React.ReactNode;
  /**
   * The Design System base theme in use. Defaults to `"dawn"`.
   */
  uiKitTheme?: HvUiKitThemeNames;
  /**
   * The UI Kit theme object to be applied on top of the base theme.
   */
  theme?: HvTheme;
  /**
   * Function stored in the provider's context to allow runtime switching of the active theme.
   * The implementation is up to each App.
   */
  changeTheme?: () => void;
  /**
   * The locale to be used. If empty falls back to browser locale
   */
  locale?: string;
  /**
   * Custom JSS's class name generator.
   */
  generateClassName?: GenerateId;
  /**
   * Built-in JSS's class name generator options.
   * Ignored if a custom `generateClassName` is provided.
   */
  generateClassNameOptions?: GenerateClassNameOptions;
  /**
   * Injects the generated stylesheets at the top of the `<head>` element of the page.
   * This can ease the override of UI Kit components styles.
   *
   * By default, the styles are injected last in the `<head>` element of the page.
   */
  injectStylesFirst?: boolean;
  /**
   * Disables the generation of the styles.
   */
  disableStylesGeneration?: boolean;

  /**
   * Disables the generation of the baseline css styles.
   *
   * This will be the default behavior in the future.
   *
   * The application using UI Kit should be responsible for adding the baseline css styles, by
   * either using the `<HvCssBaseline />` component, using the `<HvScopedCssBaseline />` component,
   * or ensuring that the necessary base styles are applied.
   *
   * Defaults to `false`. Will be removed in the next major release.
   *
   * @see https://lumada-design.github.io/uikit/master/?path=/docs/foundation-css-baseline--main
   */
  disableCssBaseline?: boolean;
}

export default function HvProvider(props: HvProviderProps): JSX.Element | null;
