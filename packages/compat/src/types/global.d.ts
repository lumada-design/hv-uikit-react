declare module "*.css";

declare module "vitest" {
  export interface TestContext {
    render: any;
  }
}
