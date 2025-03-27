import { css, Global } from "@emotion/react";

/**
 * This component can be used to set | add | modify global css. It can also override properties defined in UI-KIT.
 *
 * We need to have this component because the UI-KIT is forcing the height to 100% and this caused App Shell to show
 * a vertical scroll bar when it shouldn't due to the header height.
 */
const GlobalStyles = () => (
  <Global
    styles={css`
      html,
      body {
        height: unset;
      }
    `}
  />
);

export default GlobalStyles;
