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
   * The UI-Kit theme object to be wrapped by the MUI theme.
   */
  theme?: HvTheme;
  /**
   * Which of design system default themes to use.
   */
  uiKitTheme?: HvUiKitThemeNames;
  /**
   * Which of design system default themes to use.
   */
  changeTheme?: () => void;
  /**
   * Your component tree.
   */
  children: React.ReactNode;
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
}

export default function HvProvider(props: HvProviderProps): JSX.Element | null;
