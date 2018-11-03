import { SheetsRegistry } from "jss";
import { createGenerateClassName } from "@material-ui/core/styles";
// import theme from "../../theme";
import { theme } from "@hv-ui/react";

const createPageContext = () => {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName({
      seed: "mi-"
    })
  };
};

const getPageContext = () => {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!window.__INIT_MATERIAL_UI__) {
    window.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return window.__INIT_MATERIAL_UI__;
};

export default getPageContext;
