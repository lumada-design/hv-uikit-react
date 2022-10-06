import { themeVars, themes } from "theme";

declare module "*.css";

declare global {
  type ThemeVars = typeof themeVars;
}
