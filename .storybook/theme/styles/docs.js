export const getDocsStyles = (theme) => ({
  ".sbdocs.sbdocs-wrapper": {
    backgroundColor: theme.hv.palette.atmosphere.atmo2,

    "& > .sbdocs-content": {
      maxWidth: "inherit",

      ".sbdocs": {
        ...theme.hv.typography.normalText,
        fontSize: "14px",
        lineHeight: "24px",
      },
      "h1.sbdocs, h1.sbdocs-title": {
        ...theme.hv.typography.xlTitle,
      },
      "h2.sbdocs": {
        ...theme.hv.typography.mTitle,
        borderBottomColor: theme.hv.palette.atmosphere.atmo4,
        paddingBottom: theme.hv.spacing.xs,
        marginBottom: theme.hv.spacing.sm,
      },
      "h3.sbdocs": {
        ...theme.hv.typography.xsTitle,
        paddingTop: theme.hv.spacing.xs,
      },
      "a.sbdocs": {
        ...theme.hv.typography.link,
        fontSize: "inherit",
      },

      "table.docblock-propstable": {
        "tbody.docblock-propstable-body": {
          "tr > th": {
            // important because https://github.com/storybookjs/storybook/blob/v5.3.18/lib/components/src/blocks/PropsTable/SectionRow.tsx#L19
            backgroundColor: theme.hv.palette.atmosphere.atmo1 + " !important",
          },
          "tr:not(:first-of-type)": {
            borderTopColor: theme.hv.palette.atmosphere.atmo4,
          },
        },
      },

      "& .docblock-source": {
        margin: `${theme.hv.spacing.xs}px 0 ${theme.hv.spacing.sm}px`,
        border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,

        "& > div": {
          backgroundColor: theme.hv.palette.atmosphere.atmo1,

          "& > button": {
            backgroundColor: theme.hv.palette.atmosphere.atmo1,
            color: theme.hv.palette.accent.acce1,
            borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
            borderLeft: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
          },
        },
      },

      "& .sbdocs-preview": {
        border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
        backgroundColor: "initial",

        "& .os-content>pre": {
          backgroundColor: theme.hv.palette.atmosphere.atmo1,
          borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
        },
      },

      "& .tabbutton": {
        fontFamily: theme.hv.typography.fontFamily,
        ...theme.hv.typography.normalText,
      },

      "& .tabbutton:focus": {
        borderBottomColor: theme.hv.typography.highlightText.color,
      },

      "& .tabbutton.tabbutton-active": {
        color: theme.hv.typography.highlightText.color,
        borderBottomColor: theme.hv.typography.highlightText.color,
        fontWeight: theme.hv.typography.highlightText.fontWeight,
        lineHeight: theme.hv.typography.highlightText.lineWeight,
        letterSpacing: theme.hv.typography.highlightText.letterSpacing,
      },

      "& #panel-tab-content": {
        backgroundColor: "initial",
        color: theme.hv.palette.accent.acce1,
      },

      "& .docblock-argstable": {
        "& > thead > tr > th": {
          color: theme.hv.palette.accent.acce1,
        },
        "& > tbody > tr[title] > td": {
          backgroundColor: theme.hv.palette.atmosphere.atmo3 + " !important",
          color: theme.hv.palette.accent.acce1 + " !important",
          ...theme.hv.typography.highlightText,
          fontSize: "14px",
          textTransform: "capitalize",
          "& svg": {
            color: theme.hv.palette.accent.acce1 + " !important",
          },
          "& button": {
            cursor: "pointer !important",
          },
        },
        "& > tbody > tr[title]:not(:first-of-type) > td": {
          borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
        },
        "& > tbody > tr:not([class]) td": {
          backgroundColor: theme.hv.palette.atmosphere.atmo1,
          color: theme.hv.palette.accent.acce1,
        },
        "& > tbody > tr:not([class]) > td": {
          backgroundColor: theme.hv.palette.atmosphere.atmo1,
          color: theme.hv.palette.accent.acce1,
          borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
          borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,

          "&:not(:first-of-type) span[class], & code": {
            border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
            backgroundColor: theme.hv.palette.atmosphere.atmo3,
            color: theme.hv.palette.accent.acce1,
          },
        },

        "& .sbdocs-expandable": {
          border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
          backgroundColor: theme.hv.palette.atmosphere.atmo3,
          color: theme.hv.palette.accent.acce1,
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
          backgroundColor: theme.hv.palette.atmosphere.atmo1,
          color: theme.hv.palette.accent.acce1,
          borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
          borderLeft: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,

          "&:focus": {
            boxShadow: "initial",
          },
          "&:focus-visible": {
            boxShadow: "#52A8EC 0 -3px 0 0 inset",
          },
        },
      },

      "& .docs-story+div .os-host+div": {
        backgroundColor: theme.hv.palette.atmosphere.atmo1,

        "& > button": {
          backgroundColor: theme.hv.palette.atmosphere.atmo1,
          color: theme.hv.palette.accent.acce1,
          borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
          borderLeft: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
        },
      },

      "& code": {
        color: theme.hv.palette.accent.acce1,
      },

      "& :not(pre)>code": {
        border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
        backgroundColor: theme.hv.palette.atmosphere.atmo3,
      },

      "& .token": {
        fontFamily: "monospace",
        WebkitFontSmoothing: "antialiased",

        color: theme.hv.palette.accent.acce1,

        "&.tag": { color: theme.hv.palette.semantic.sema13 },

        "&.comment": { color: theme.hv.palette.semantic.sema1 },
        "&.prolog": { color: theme.hv.palette.semantic.sema1 },
        "&.doctype": { color: theme.hv.palette.semantic.sema1 },
        "&.cdata": { color: theme.hv.palette.semantic.sema1 },

        "&.string": { color: theme.hv.palette.semantic.sema4 },

        "&.url": { color: theme.hv.palette.semantic.acce16 },
        "&.symbol": { color: theme.hv.palette.semantic.acce16 },
        "&.number": { color: theme.hv.palette.semantic.acce16 },
        "&.boolean": { color: theme.hv.palette.semantic.acce16 },
        "&.variable": { color: theme.hv.palette.semantic.acce16 },
        "&.constant": { color: theme.hv.palette.semantic.acce16 },
        "&.inserted": { color: theme.hv.palette.semantic.acce16 },

        "&.atrule": { color: theme.hv.palette.accent.acce2 },
        "&.keyword": { color: theme.hv.palette.accent.acce2 },
        "&.attr-value": { color: theme.hv.palette.accent.acce2 },

        "&.punctuation": { color: theme.hv.palette.accent.acce1 },
        "&.operator": { color: theme.hv.palette.accent.acce1 },

        "&.function": { color: theme.hv.palette.accent.acce1 },
        "&.deleted": { color: theme.hv.palette.semantic.sema12 },

        "&.important": {
          fontWeight: "bold",
        },
        "&.bold": {
          fontWeight: "bold",
        },

        "&.italic": {
          fontStyle: "italic",
        },

        "&.class-name": { color: theme.hv.palette.semantic.acce17 },

        "&.selector": { color: theme.hv.palette.semantic.sema13 },

        "&.attr-name": { color: theme.hv.palette.semantic.sema14 },
        "&.property": { color: theme.hv.palette.semantic.sema14 },
        "&.regex": { color: theme.hv.palette.semantic.sema14 },
        "&.entity": { color: theme.hv.palette.semantic.sema14 },

        "&.directive.tag .tag": {
          background: theme.hv.palette.semantic.sema8,
          color: theme.hv.palette.accent.acce1,
        },
      },
      "& .language-json .token.boolean": { color: theme.hv.palette.accent.acce2 },
      "& .language-json .token.number": { color: theme.hv.palette.accent.acce2 },
      "& .language-json .token.property": { color: theme.hv.palette.semantic.acce17 },

      "& .asd": {
        "& .token": {
          fontFamily: "monospace",
          WebkitFontSmoothing: "antialiased",

          color: theme.hv.palette.accent.acce1,

          "&.tag": { color: theme.hv.palette.semantic.sema13 },

          "&.comment": { color: theme.hv.palette.semantic.sema1 },
          "&.prolog": { color: theme.hv.palette.semantic.sema1 },
          "&.doctype": { color: theme.hv.palette.semantic.sema1 },
          "&.cdata": { color: theme.hv.palette.semantic.sema1 },

          "&.string": { color: theme.hv.palette.semantic.sema1 },

          "&.url": { color: theme.hv.palette.semantic.acce16 },
          "&.symbol": { color: theme.hv.palette.semantic.acce16 },
          "&.number": { color: theme.hv.palette.semantic.acce16 },
          "&.boolean": { color: theme.hv.palette.semantic.acce16 },
          "&.variable": { color: theme.hv.palette.semantic.acce16 },
          "&.constant": { color: theme.hv.palette.semantic.acce16 },
          "&.inserted": { color: theme.hv.palette.semantic.acce16 },

          "&.atrule": { color: theme.hv.palette.accent.acce2 },
          "&.keyword": { color: theme.hv.palette.accent.acce2 },
          "&.attr-value": { color: theme.hv.palette.accent.acce2 },

          "&.punctuation": { color: theme.hv.palette.accent.acce1 },
          "&.operator": { color: theme.hv.palette.accent.acce1 },

          "&.function": { color: theme.hv.palette.accent.acce1 },
          "&.deleted": { color: theme.hv.palette.semantic.sema12 },

          "&.important": {
            fontWeight: "bold",
          },
          "&.bold": {
            fontWeight: "bold",
          },

          "&.italic": {
            fontStyle: "italic",
          },

          "&.class-name": { color: theme.hv.palette.semantic.acce17 },

          "&.selector": { color: theme.hv.palette.semantic.sema13 },

          "&.attr-name": { color: theme.hv.palette.semantic.sema14 },
          "&.property": { color: theme.hv.palette.semantic.sema14 },
          "&.regex": { color: theme.hv.palette.semantic.sema14 },
          "&.entity": { color: theme.hv.palette.semantic.sema14 },

          "&.directive.tag .tag": {
            background: theme.hv.palette.semantic.sema8,
            color: theme.hv.palette.accent.acce1,
          },
        },
        "& .language-json .token.boolean": { color: theme.hv.palette.accent.acce2 },
        "& .language-json .token.number": { color: theme.hv.palette.accent.acce2 },
        "& .language-json .token.property": { color: theme.hv.palette.semantic.acce17 },
      },
    },
  },
});
