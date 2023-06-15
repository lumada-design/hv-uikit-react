export const getDocsStyles = (theme) => {
  return {
    ".sbdocs.sbdocs-wrapper": {
      ".sbdocs": {
        fontFamily: "'Open Sans',sans-serif !important",
      },

      ".sbdocs-content": {
        width: "940px !important",
        maxWidth: "90% !important",
      },

      ".sbdocs-preview": {
        overflow: "visible",

        "& > div": {
          overflow: "visible",

          "& > div": {
            overflow: "visible",
          },
        },
      },

      "a.sbdocs": {
        color: "#2064B4",
      },

      "p.sbdocs": {
        fontSize: "16px",
        lineHeight: "1.7",
      },

      "li.sbdocs": {
        fontSize: "16px",
        lineHeight: "1.7",
      },

      "h1.sbdocs": {
        marginBottom: "30px",
      },

      "h2.sbdocs": {
        fontSize: "26px",
        fontWeight: "700",
        margin: "50px 0 15px 0",
        border: "none",
      },

      "h3.sbdocs": {
        fontSize: "20px",
        fontWeight: "700",
        margin: "20px 0 15px 0",
        border: "none",
      },

      "h4.sbdocs": {
        fontSize: "18px",
        fontWeight: "700",
        margin: "20px 0 15px 0",
        border: "none",
      },

      "h5.sbdocs": {
        fontSize: "16px",
        fontWeight: "700",
        margin: "20px 0 15px 0",
        border: "none",
      },

      ".docblock-source": {
        boxShadow: "none",
        border: "1px solid #EEEEEE",
        background: "#F8F8F8",
      },

      ".docblock-source button": {
        boxShadow: "none",
        border: "1px solid #EEEEEE",
      },

      code: {
        fontSize: 14,
        padding: 5,
      },
    },
  };
};
