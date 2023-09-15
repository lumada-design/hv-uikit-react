import { Global } from "@emotion/react";
import { DecoratorFn } from "@storybook/react";

export const templateDecorator: DecoratorFn = (Story) => (
  <>
    <Global
      styles={{
        ".sbdocs-content > div:last-of-type": {
          display: "none !important",
        },
      }}
    />
    <div>{Story()}</div>
  </>
);
