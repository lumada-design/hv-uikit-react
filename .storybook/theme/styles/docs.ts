import { HvTheme } from "@hitachivantara/uikit-styles";

export const getDocsStyles = (theme: HvTheme) => {
  return {
    ".sbdocs.sbdocs-wrapper": {
      overflow: "hidden",
      backgroundColor: theme.colors.atmo1,

      ".sbdocs": {
        fontFamily: "'Open Sans',sans-serif !important",
        color: theme.colors.secondary,
        fontSize: theme.fontSizes.lg,
        lineHeight: theme.lineHeights.lg,
      },

      ".sbdocs-preview": {
        borderColor: theme.colors.atmo3,

        "& .os-content>pre": {
          backgroundColor: theme.colors.atmo2,
          borderTop: `1px solid ${theme.colors.atmo3}`,
          color: theme.colors.secondary,
        },

        "& > div > div > button": {
          backgroundColor: theme.colors.atmo1,
          color: theme.colors.secondary,
          borderColor: theme.colors.atmo3,
        },
      },

      ".sbdocs-content": {
        width: "940px !important",
        maxWidth: "90% !important",
      },

      // This is necessary for the chart tooltips to not be hidden
      "div[id*='anchor--visualizations-bar-chart'], div[id*='anchor--visualizations-line-chart']":
        {
          ".sbdocs-preview": {
            overflow: "visible",

            "& > div": {
              overflow: "visible",

              "& > div": {
                overflow: "visible",
              },
            },
          },
        },

      "div[id*='panel-tab-content']": {
        background: theme.colors.atmo1,
      },

      ".docs-story": {
        ".docblock-code-toggle": {
          color: theme.colors.secondary,
          backgroundColor: theme.colors.atmo1,
          borderColor: theme.colors.atmo3,
        },
      },

      ".docblock-argstable": {
        "thead>tr>th": {
          color: theme.colors.secondary,
          backgroundColor: theme.colors.atmo1,

          "& button[title='Reset controls']": {
            color: theme.colors.primary,
            backgroundColor: theme.colors.atmo2,
            borderColor: theme.colors.atmo3,
          },
        },

        "tbody>tr:not(:first-of-type)": { borderTopColor: theme.colors.atmo3 },

        "tbody>tr>td": {
          color: theme.colors.secondary,
          backgroundColor: theme.colors.atmo1,

          "textarea, input:not([type='radio'], [type='checkbox']), select": {
            color: theme.colors.secondary,
            background: theme.colors.atmo1,
            boxShadow: `${theme.colors.atmo3} 0 0 0 1px inset`,
          },

          label: {
            "input[type='checkbox']:checked~span:last-of-type, input[type='checkbox']:not(:checked)~span:first-of-type":
              {
                color: theme.colors.secondary,
                background: theme.colors.atmo1,
              },
            "input[type='checkbox']:not(:checked)~span:last-of-type, input[type='checkbox']:checked~span:first-of-type":
              {
                color: theme.colors.secondary_80,
              },
          },
        },

        "tbody>tr>td:nth-of-type(2)>div": {
          "& span[class]": {
            color: theme.colors.secondary,
            backgroundColor: theme.colors.atmo2,
            borderColor: theme.colors.atmo3,
          },
        },

        "tbody>tr>td:nth-of-type(3)": {
          "& span": {
            color: theme.colors.secondary,
            backgroundColor: theme.colors.atmo2,
            borderColor: theme.colors.atmo3,
          },
        },

        "tbody>tr>td:nth-of-type(4)": {
          "& button": {
            color: theme.colors.secondary,
            background: theme.colors.atmo1,
            boxShadow: `${theme.colors.atmo3} 0 0 0 1px inset`,
          },
        },
      },

      ".os-host": {
        color: theme.colors.secondary,
        background: theme.colors.atmo1,

        "& .os-content:has(>div>div>div[role='tablist'])": {
          borderBottom: `1px solid ${theme.colors.atmo3}`,
        },

        "& .os-content>div>div>div[role='tablist']": {
          color: "inherit",

          ".tabbutton-active": {
            borderBottomColor: theme.colors.primary,
            color: theme.colors.primary,
          },
        },
      },

      ".docblock-source": {
        boxShadow: "none",
        borderColor: theme.colors.atmo3,

        "& > div": {
          backgroundColor: theme.colors.atmo2,

          "& > button": {
            backgroundColor: theme.colors.atmo1,
            color: theme.colors.secondary,
            borderColor: theme.colors.atmo3,
          },
        },
      },

      ".sbdocs code": {
        color: theme.colors.secondary,
        backgroundColor: theme.colors.atmo2,
        borderRadius: "3px",
        border: `1px solid ${theme.colors.atmo3}`,
      },

      ".sbdocs-table": {
        "thead>tr>th": {
          color: theme.colors.secondary,
        },

        "tbody>tr>td": {
          color: theme.colors.secondary,
        },

        "tbody>tr:nth-of-type(2n)": {
          backgroundColor: theme.colors.atmo2,
        },

        code: {
          backgroundColor: "inherit",
          border: "none",
        },
      },

      ".sbdocs-expandable": {
        backgroundColor: theme.colors.atmo2,
        color: theme.colors.secondary,
        borderColor: theme.colors.atmo3,
      },

      ".sbdocs-title": { color: theme.colors.secondary },

      "a.sbdocs": {
        color: theme.colors.primary,
        fontSize: "inherit",
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
        fontSize: "32px",
        fontWeight: "700",
        marginBottom: "30px",
        border: "none",
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

      "& .token": {
        fontFamily: "monospace",
        WebkitFontSmoothing: "antialiased",

        color: theme.colors.secondary,

        "&.tag": { color: theme.colors.sema13 },

        "&.comment": { color: theme.colors.positive },
        "&.prolog": { color: theme.colors.positive },
        "&.doctype": { color: theme.colors.positive },
        "&.cdata": { color: theme.colors.positive },

        "&.string": { color: theme.colors.negative },

        "&.url": { color: theme.colors.secondary },
        "&.symbol": { color: theme.colors.secondary },
        "&.number": { color: theme.colors.secondary },
        "&.boolean": { color: theme.colors.secondary },
        "&.variable": { color: theme.colors.secondary },
        "&.constant": { color: theme.colors.secondary },
        "&.inserted": { color: theme.colors.secondary },

        "&.atrule": { color: theme.colors.primary },
        "&.keyword": { color: theme.colors.primary },
        "&.attr-value": { color: theme.colors.primary },

        "&.punctuation": { color: theme.colors.secondary },
        "&.operator": { color: theme.colors.secondary },

        "&.function": { color: theme.colors.secondary },
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

        "&.class-name": { color: theme.colors.secondary },

        "&.selector": { color: theme.colors.sema13 },

        "&.attr-name": { color: theme.colors.sema14 },
        "&.property": { color: theme.colors.sema14 },
        "&.regex": { color: theme.colors.sema14 },
        "&.entity": { color: theme.colors.sema14 },

        "&.directive.tag .tag": {
          background: theme.colors.positive_20,
          color: theme.colors.secondary,
        },
      },
      "& .language-json .token.boolean": { color: theme.colors.primary },
      "& .language-json .token.number": { color: theme.colors.primary },
      "& .language-json .token.property": { color: theme.colors.secondary },
    },
  };
};
