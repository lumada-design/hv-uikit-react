declare global {
  declare module "vitest" {
    export interface TestContext {
      render: any;
    }
  }

  declare module "@mui/material/styles" {
    interface BreakpointOverrides {
      xs: true;
      sm: true;
      md: true;
      lg: true;
      xl: true;
    }
  }
}
