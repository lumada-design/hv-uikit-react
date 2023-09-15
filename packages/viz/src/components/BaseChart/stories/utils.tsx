import { DecoratorFn } from "@storybook/react";
import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-react-core";

export const vizDecorator: DecoratorFn = (Story) => (
  <div
    className={css({
      backgroundColor: theme.colors.atmo1,
      padding: 20,
    })}
  >
    {Story()}
  </div>
);
