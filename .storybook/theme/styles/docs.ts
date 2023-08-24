import { CSSObject } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-react-core";

const { colors } = theme;

export const getDocsStyles = () => {
  return {
    ".sbdocs.sbdocs-wrapper": {
      overflow: "hidden",
      padding: "4rem",
      lineHeight: "24px",

      ".sbdocs-preview": {
        overflow: "visible",
        "& > div, & > div > div": {
          overflow: "visible",
        },
      },

      ...getMarkdownStyles(),
    },
  };
};

/** Styles to override the default MD/MDX styles. */
function getMarkdownStyles() {
  /** Override MD elements */
  const styles: CSSObject = {
    a: {
      color: colors.primary,
      fontSize: "inherit",
    },

    p: {
      fontSize: "16px",
      lineHeight: "1.7",
    },

    li: {
      fontSize: "16px",
      lineHeight: "1.7",
    },

    h1: {
      fontSize: "32px",
      fontWeight: "700",
      marginBottom: "30px",
      border: "none",
    },

    h2: {
      fontSize: "26px",
      fontWeight: "700",
      margin: "50px 0 15px 0",
      border: "none",
    },

    h3: {
      fontSize: "20px",
      fontWeight: "700",
      margin: "20px 0 15px 0",
      border: "none",
    },

    h4: {
      fontSize: "18px",
      fontWeight: "700",
      margin: "20px 0 15px 0",
      border: "none",
    },

    h5: {
      fontSize: "16px",
      fontWeight: "700",
      margin: "20px 0 15px 0",
      border: "none",
    },
  };

  return Object.entries(styles).reduce((acc, [key, value]) => {
    // selector to exclude styles from sample & unstyled stories
    acc[`${key}:not(.hv-story-sample *):not(.sb-unstyled *)`] = value;
    return acc;
  }, {});
}
