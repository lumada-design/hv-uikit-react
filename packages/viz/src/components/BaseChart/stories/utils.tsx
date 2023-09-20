import { DecoratorFn } from "@storybook/react";
import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-react-core";
import { Global } from "@emotion/react";

export const vizDecorator: DecoratorFn = (Story) => (
  <>
    <Global
      styles={{
        // This is necessary for the chart tooltips to not be hidden
        ".sbdocs.sbdocs-preview": {
          overflow: "visible",
          "& > div, & > div > div": {
            overflow: "visible",
          },
        },
      }}
    />
    <div
      className={css({
        backgroundColor: theme.colors.atmo1,
        padding: 20,
      })}
    >
      {Story()}
    </div>
  </>
);
