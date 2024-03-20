
import { css } from "@emotion/css";
import { Decorator} from "@storybook/react";
import { theme } from "@hitachivantara/uikit-react-core";

export const vizDecorator: Decorator = (Story) => (
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

export const confusionMatrixDecorator: Decorator = (Story) => (
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
