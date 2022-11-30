export const getDocsStyles = (theme) => ({
  ".sbdocs.sbdocs-wrapper": {
    backgroundColor: theme.colors.atmo2,

    "& > .sbdocs-content": {
      maxWidth: "inherit",

      ".sbdocs": {
        fontFamily: theme.fontFamily,
        color: theme.colors.acce1,
        letterSpacing: "0.02em",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "24px",
      },
      "h1.sbdocs, h1.sbdocs-title": {
        color: theme.colors.acce1,
        fontSize: "32px",
        letterSpacing: "0.02em",
        lineHeight: "40px",
        fontWeight: 600,
      },
      "h2.sbdocs": {
        color: theme.colors.acce1,
        fontSize: "22px",
        letterSpacing: "0.02em",
        lineHeight: "30px",
        fontWeight: 600,
        borderBottomColor: theme.colors.atmo4,
        paddingBottom: theme.spacing(1),
        marginBottom: theme.spacing(2),
      },
      "h3.sbdocs": {
        color: theme.colors.acce1,
        fontSize: "18px",
        letterSpacing: "0.02em",
        lineHeight: "28px",
        fontWeight: 600,
        paddingTop: theme.spacing(1),
      },
      "a.sbdocs": {
        color: theme.colors.acce2,
        fontSize: "12px",
        letterSpacing: "0.02em",
        lineHeight: "16px",
        fontWeight: 600,
        textDecoration: "underline",
        fontSize: "inherit",
      },

      "table.docblock-propstable": {
        "tbody.docblock-propstable-body": {
          "tr > th": {
            // important because https://github.com/storybookjs/storybook/blob/v5.3.18/lib/components/src/blocks/PropsTable/SectionRow.tsx#L19
            backgroundColor: theme.colors.atmo1 + " !important",
          },
          "tr:not(:first-of-type)": {
            borderTopColor: theme.colors.atmo4,
          },
        },
      },

      "& .docblock-source": {
        margin: `${theme.spacing(1)}px 0 ${theme.spacing(2)}px`,
        border: `1px solid ${theme.colors.atmo4}`,

        "& > div": {
          backgroundColor: theme.colors.atmo1,

          "& > button": {
            backgroundColor: theme.colors.atmo1,
            color: theme.colors.acce1,
            borderTop: `1px solid ${theme.colors.atmo4}`,
            borderLeft: `1px solid ${theme.colors.atmo4}`,
          },
        },
      },

      "& .sbdocs-preview": {
        border: `1px solid ${theme.colors.atmo4}`,
        backgroundColor: "initial",

        "& .os-content>pre": {
          backgroundColor: theme.colors.atmo1,
          borderTop: `1px solid ${theme.colors.atmo4}`,
          color: theme.colors.acce1,
        },
      },

      "& .os-host": {
        backgroundColor: "initial",
      },

      "& .tabbutton": {
        fontFamily: theme.fontFamily,
        color: theme.colors.acce1,
        fontSize: "12px",
        letterSpacing: "0.02em",
        lineHeight: "16px",
        fontWeight: 400,
      },

      "& .tabbutton:focus": {
        borderBottomColor: theme.colors.acce1,
      },

      "& .tabbutton.tabbutton-active": {
        color: theme.colors.acce1,
        borderBottomColor: theme.colors.acce1,
        fontWeight: 600,
        lineHeight: "16px",
        letterSpacing: "0.02em",
      },

      "& #panel-tab-content": {
        backgroundColor: "initial",
        color: theme.colors.acce1,
      },

      "& .docblock-argstable": {
        "& > thead > tr > th": {
          color: theme.colors.acce1,
        },
        "& > tbody > tr[title] > td": {
          backgroundColor: theme.colors.atmo3 + " !important",
          color: theme.colors.acce1 + " !important",
          letterSpacing: "0.02em",
          lineHeight: "16px",
          fontWeight: 600,
          fontSize: "14px",
          textTransform: "capitalize",
          "& svg": {
            color: theme.colors.acce1 + " !important",
          },
          "& button": {
            cursor: "pointer !important",
          },
        },
        "& > tbody > tr[title]:not(:first-of-type) > td": {
          borderTop: `1px solid ${theme.colors.atmo4}`,
        },
        "& > tbody > tr:not([class]) td": {
          backgroundColor: theme.colors.atmo1,
          color: theme.colors.acce1,
        },
        "& > tbody > tr:not([class]) > td": {
          backgroundColor: theme.colors.atmo1,
          color: theme.colors.acce1,
          borderTop: `1px solid ${theme.colors.atmo4}`,
          borderBottom: `1px solid ${theme.colors.atmo4}`,

          "&:not(:first-of-type) span[class], & code": {
            border: `1px solid ${theme.colors.atmo4}`,
            backgroundColor: theme.colors.atmo3,
            color: theme.colors.acce1,
          },
        },

        "& .sbdocs-expandable": {
          border: `1px solid ${theme.colors.atmo4}`,
          backgroundColor: theme.colors.atmo3,
          color: theme.colors.acce1,
        },
      },

      "& .docs-story": {
        backgroundColor: "initial",

        "&>div": {
          backgroundColor: "initial",
          "&>div": {
            padding: "30px 20px",
          },
        },

        "& .docblock-code-toggle": {
          backgroundColor: theme.colors.atmo1,
          color: theme.colors.acce1,
          borderTop: `1px solid ${theme.colors.atmo4}`,
          borderLeft: `1px solid ${theme.colors.atmo4}`,

          "&:focus": {
            boxShadow: "initial",
          },
          "&:focus-visible": {
            boxShadow: "#52A8EC 0 -3px 0 0 inset",
          },
        },
      },

      "& .docs-story+div .os-host+div": {
        backgroundColor: theme.colors.atmo1,

        "& > button": {
          backgroundColor: theme.colors.atmo1,
          color: theme.colors.acce1,
          borderTop: `1px solid ${theme.colors.atmo4}`,
          borderLeft: `1px solid ${theme.colors.atmo4}`,
        },
      },

      "& code": {
        color: theme.colors.acce1,
      },

      "& :not(pre)>code": {
        border: `1px solid ${theme.colors.atmo4}`,
        backgroundColor: theme.colors.atmo3,
      },

      "& .token": {
        fontFamily: "monospace",
        WebkitFontSmoothing: "antialiased",

        color: theme.colors.acce1,

        "&.tag": { color: theme.colors.sema13 },

        "&.comment": { color: theme.colors.sema1 },
        "&.prolog": { color: theme.colors.sema1 },
        "&.doctype": { color: theme.colors.sema1 },
        "&.cdata": { color: theme.colors.sema1 },

        "&.string": { color: theme.colors.sema4 },

        "&.url": { color: theme.colors.acce16 },
        "&.symbol": { color: theme.colors.acce16 },
        "&.number": { color: theme.colors.acce16 },
        "&.boolean": { color: theme.colors.acce16 },
        "&.variable": { color: theme.colors.acce16 },
        "&.constant": { color: theme.colors.acce16 },
        "&.inserted": { color: theme.colors.acce16 },

        "&.atrule": { color: theme.colors.acce2 },
        "&.keyword": { color: theme.colors.acce2 },
        "&.attr-value": { color: theme.colors.acce2 },

        "&.punctuation": { color: theme.colors.acce1 },
        "&.operator": { color: theme.colors.acce1 },

        "&.function": { color: theme.colors.acce1 },
        "&.deleted": { color: theme.colors.sema12 },

        "&.important": {
          fontWeight: "bold",
        },
        "&.bold": {
          fontWeight: "bold",
        },

        "&.italic": {
          fontStyle: "italic",
        },

        "&.class-name": { color: theme.colors.acce17 },

        "&.selector": { color: theme.colors.sema13 },

        "&.attr-name": { color: theme.colors.sema14 },
        "&.property": { color: theme.colors.sema14 },
        "&.regex": { color: theme.colors.sema14 },
        "&.entity": { color: theme.colors.sema14 },

        "&.directive.tag .tag": {
          background: theme.colors.sema8,
          color: theme.colors.acce1,
        },
      },
      "& .language-json .token.boolean": {
        color: theme.colors.acce2,
      },
      "& .language-json .token.number": {
        color: theme.colors.acce2,
      },
      "& .language-json .token.property": {
        color: theme.colors.acce17,
      },

      "& .asd": {
        "& .token": {
          fontFamily: "monospace",
          WebkitFontSmoothing: "antialiased",

          color: theme.colors.acce1,

          "&.tag": { color: theme.colors.sema13 },

          "&.comment": { color: theme.colors.sema1 },
          "&.prolog": { color: theme.colors.sema1 },
          "&.doctype": { color: theme.colors.sema1 },
          "&.cdata": { color: theme.colors.sema1 },

          "&.string": { color: theme.colors.sema1 },

          "&.url": { color: theme.colors.acce16 },
          "&.symbol": { color: theme.colors.acce16 },
          "&.number": { color: theme.colors.acce16 },
          "&.boolean": { color: theme.colors.acce16 },
          "&.variable": { color: theme.colors.acce16 },
          "&.constant": { color: theme.colors.acce16 },
          "&.inserted": { color: theme.colors.acce16 },

          "&.atrule": { color: theme.colors.acce2 },
          "&.keyword": { color: theme.colors.acce2 },
          "&.attr-value": { color: theme.colors.acce2 },

          "&.punctuation": { color: theme.colors.acce1 },
          "&.operator": { color: theme.colors.acce1 },

          "&.function": { color: theme.colors.acce1 },
          "&.deleted": { color: theme.colors.sema12 },

          "&.important": {
            fontWeight: "bold",
          },
          "&.bold": {
            fontWeight: "bold",
          },

          "&.italic": {
            fontStyle: "italic",
          },

          "&.class-name": { color: theme.colors.acce17 },

          "&.selector": { color: theme.colors.sema13 },

          "&.attr-name": { color: theme.colors.sema14 },
          "&.property": { color: theme.colors.sema14 },
          "&.regex": { color: theme.colors.sema14 },
          "&.entity": { color: theme.colors.sema14 },

          "&.directive.tag .tag": {
            background: theme.colors.sema8,
            color: theme.colors.acce1,
          },
        },
        "& .language-json .token.boolean": {
          color: theme.colors.acce2,
        },
        "& .language-json .token.number": {
          color: theme.colors.acce2,
        },
        "& .language-json .token.property": {
          color: theme.colors.acce17,
        },
      },
    },
  },
});
