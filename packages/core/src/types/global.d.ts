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

// To import .png files on stories
declare module "*.png" {
  export default "" as string;
}

declare module "*.jpg" {
  export default "" as string;
}

// Fixes createEmotion has no call signature
declare module "@emotion/css/create-instance" {
  export default function createEmotion(options): {
    css;
    cx;
    flush;
    hydrate;
    injectGlobal;
    keyframes;
    sheet;
    cache;
    merge;
    getRegisteredStyles;
  };
}
