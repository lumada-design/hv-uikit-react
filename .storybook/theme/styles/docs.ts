export const getDocsStyles = () => {
  return {
    ".sbdocs.sbdocs-wrapper": {
      overflow: "hidden",
      padding: "4rem",
      lineHeight: "24px",

      ".sbdocs-preview": {
        overflow: "visible",
        zIndex: 1,
        "& > div, & > div > div": {
          overflow: "visible",
        },
      },
    },
  };
};
