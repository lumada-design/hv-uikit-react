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
   * Disables the generation of the styles.
   */
  disableStylesGeneration?: boolean;

  /**
   * By default the baseline styles are applied globally to the application.
   * If you need to scope the CSS to avoid styling conflicts, you can set this prop to `"scoped"`.
   * If you are providing the baseline styles, you can set this prop to false.
   *
   * @see https://lumada-design.github.io/uikit/master/?path=/docs/theme-css-baseline--page
   */
  cssBaseline?: "global" | "scoped" | false;
}

export default function HvProvider(props: HvProviderProps): JSX.Element | null;
