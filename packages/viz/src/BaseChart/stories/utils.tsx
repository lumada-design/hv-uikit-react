import { css } from "@emotion/css";
import { DecoratorFn } from "@storybook/react";
import { theme } from "@hitachivantara/uikit-react-core";

export const vizDecorator: DecoratorFn = (Story) => (
  <div
    className={css({
      backgroundColor: theme.colors.atmo1,
      padding: 20,
      display: "flex",
      flexDirection: "column",
      height: 500,
    })}
  >
    {Story()}
  </div>
);

export const confusionMatrixDecorator: DecoratorFn = (Story) => (
  <div
    className={css({
      backgroundColor: theme.colors.atmo1,
      padding: 20,
      display: "flex",
      flexDirection: "column",
    })}
  >
    {Story()}
  </div>
);
