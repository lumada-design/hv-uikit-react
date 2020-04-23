import * as React from "react";
import { HvTheme } from "..";

export type HvUiKitThemeNames = "dawn" | "wicked";

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
}

export default function HvProvider(props: HvProviderProps): JSX.Element | null;
