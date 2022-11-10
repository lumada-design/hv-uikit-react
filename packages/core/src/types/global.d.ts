import { themeVars, themes } from "@hitachivantara/uikit-styles";

declare module "*.css";

declare global {
  type ThemeVars = typeof themeVars;
}

declare module "vitest" {
  export interface TestContext {
    render: any;
  }
}
