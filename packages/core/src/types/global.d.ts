import { themeVars, themes } from "theme";

declare module "*.css";

declare global {
  type ThemeVars = typeof themeVars;
}

declare module "vitest" {
  export interface TestContext {
    render: any;
  }
}
