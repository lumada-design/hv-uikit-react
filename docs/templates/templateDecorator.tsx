import { Global } from "@emotion/react";
import { Decorator } from "@storybook/react";

export const templateDecorator: Decorator = (Story) => (
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
