import type { A11yParameters } from "@storybook/addon-a11y";
import type { StorybookParameters } from "@storybook/types";

interface ChromaticParameters {
  disableSnapshot?: boolean;
  delay?: number;
  modes?: Record<string, any>;
  diffThreshold?: number;
}

interface DocsParameters extends Record<string, any> {
  disable?: boolean;
  description?: { story?: string };
  source?: {
    code?: string;
    type?: "auto" | "code" | "dynamic";
  };
  inlineStories?: boolean;
}

interface A11yParams extends A11yParameters {
  disable?: boolean;
}

// https://github.com/storybookjs/storybook/issues/22860
declare module "@storybook/csf" {
  interface Parameters extends StorybookParameters, Record<string, any> {
    a11y?: A11yParams;
    docs?: DocsParameters;
    chromatic?: ChromaticParameters;
  }
}