import { Global } from "@emotion/react";
import { DecoratorFn } from "@storybook/react";

export const templateDecorator: DecoratorFn = (Story) => (
  <>
    <Global
      styles={{
        // Hide the args table
        ".docblock-argstable, .docblock-emptyblock": {
          display: "none !important",
        },
      }}
    />
    <div>{Story()}</div>
  </>
);
