import { theme } from "@hitachivantara/uikit-styles";

declare global {
  type Theme = typeof theme;
}

declare module "vitest" {
  export interface TestContext {
    render: any;
  }
}
