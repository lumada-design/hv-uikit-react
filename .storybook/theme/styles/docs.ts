import { colors as hvColors } from "@hitachivantara/uikit-styles";

export const getDocsStyles = (dark: boolean) => {
  const colors = dark ? hvColors.dark : hvColors.light;

  return {
    ".sbdocs.sbdocs-wrapper": {
      overflow: "hidden",
      backgroundColor: colors.atmo1,

      "div[id*='hv-welcome-image']": {
        backgroundImage: `url(${
          dark ? "welcome-dark.png" : "welcome-light.png"
        })`,
      },

      ".sbdocs": {
        fontFamily: "'Open Sans',sans-serif !important",
        color: colors.secondary,
        fontSize: "16px",
        lineHeight: "24px",
      },

      ".sbdocs-preview": {
        borderColor: colors.atmo3,

        "& .os-content>pre": {
          backgroundColor: colors.atmo2,
          borderTop: `1px solid ${colors.atmo3}`,
          color: colors.secondary,
        },

        "& > div > div > button": {
          backgroundColor: colors.atmo1,
          color: colors.secondary,
          borderColor: colors.atmo3,
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
        background: colors.atmo1,
      },

      ".docs-story": {
        ".docblock-code-toggle": {
          color: colors.secondary,
          backgroundColor: colors.atmo1,
          borderColor: colors.atmo3,
        },
      },

      ".docblock-argstable": {
        "thead>tr>th": {
          color: colors.secondary,
          backgroundColor: colors.atmo1,

          "& button[title='Reset controls']": {
            color: colors.primary,
            backgroundColor: colors.atmo2,
            borderColor: colors.atmo3,
          },
        },

        "tbody>tr:not(:first-of-type)": { borderTopColor: colors.atmo3 },

        "tbody>tr>td": {
          color: colors.secondary,
          backgroundColor: colors.atmo1,

          "textarea, input:not([type='radio'], [type='checkbox']), select": {
            color: colors.secondary,
            background: colors.atmo1,
            boxShadow: `${colors.atmo3} 0 0 0 1px inset`,
          },

          label: {
            "input[type='checkbox']:checked~span:last-of-type, input[type='checkbox']:not(:checked)~span:first-of-type":
              {
                color: colors.secondary,
                background: colors.atmo1,
              },
            "input[type='checkbox']:not(:checked)~span:last-of-type, input[type='checkbox']:checked~span:first-of-type":
              {
                color: colors.secondary_80,
              },
          },
        },

        "tbody>tr>td:nth-of-type(2)>div": {
          "& span[class]": {
            color: colors.secondary,
            backgroundColor: colors.atmo2,
            borderColor: colors.atmo3,
          },
        },

        "tbody>tr>td:nth-of-type(3)": {
          "& span": {
            color: colors.secondary,
            backgroundColor: colors.atmo2,
            borderColor: colors.atmo3,
          },
        },

        "tbody>tr>td:nth-of-type(4)": {
          "& button": {
            color: colors.secondary,
            background: colors.atmo1,
            boxShadow: `${colors.atmo3} 0 0 0 1px inset`,
          },
        },
      },

      ".os-host": {
        color: colors.secondary,
        background: colors.atmo1,

        "& .os-content:has(>div>div>div[role='tablist'])": {
          borderBottom: `1px solid ${colors.atmo3}`,
        },

        "& .os-content>div>div>div[role='tablist']": {
          color: "inherit",

          ".tabbutton-active": {
            borderBottomColor: colors.primary,
            color: colors.primary,
          },
        },
      },

      ".docblock-source": {
        boxShadow: "none",
        borderColor: colors.atmo3,

        "& > div": {
          backgroundColor: colors.atmo2,

          "& > button": {
            backgroundColor: colors.atmo1,
            color: colors.secondary,
            borderColor: colors.atmo3,
          },
        },
      },

      ".sbdocs code": {
        color: colors.secondary,
        backgroundColor: colors.atmo2,
        borderRadius: "3px",
        border: `1px solid ${colors.atmo3}`,
      },

      ".sbdocs-table": {
        "thead>tr>th": {
          color: colors.secondary,
        },

        "tbody>tr>td": {
          color: colors.secondary,
        },

        "tbody>tr:nth-of-type(2n)": {
          backgroundColor: colors.atmo2,
        },

        code: {
          backgroundColor: "inherit",
          border: "none",
        },
      },

      ".sbdocs-expandable": {
        backgroundColor: colors.atmo2,
        color: colors.secondary,
        borderColor: colors.atmo3,
      },

      ".sbdocs-title": { color: colors.secondary },

      "a.sbdocs": {
        color: colors.primary,
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

        color: colors.secondary,

        "&.tag": { color: colors.sema13 },

        "&.comment": { color: colors.positive },
        "&.prolog": { color: colors.positive },
        "&.doctype": { color: colors.positive },
        "&.cdata": { color: colors.positive },

        "&.string": { color: colors.negative },

        "&.url": { color: colors.secondary },
        "&.symbol": { color: colors.secondary },
        "&.number": { color: colors.secondary },
        "&.boolean": { color: colors.secondary },
        "&.variable": { color: colors.secondary },
        "&.constant": { color: colors.secondary },
        "&.inserted": { color: colors.secondary },

        "&.atrule": { color: colors.primary },
        "&.keyword": { color: colors.primary },
        "&.attr-value": { color: colors.primary },

        "&.punctuation": { color: colors.secondary },
        "&.operator": { color: colors.secondary },

        "&.function": { color: colors.secondary },
        "&.deleted": { color: colors.sema12 },

        "&.important": {
          fontWeight: "bold",
        },
        "&.bold": {
          fontWeight: "bold",
        },

        "&.italic": {
          fontStyle: "italic",
        },

        "&.class-name": { color: colors.secondary },

        "&.selector": { color: colors.sema13 },

        "&.attr-name": { color: colors.sema14 },
        "&.property": { color: colors.sema14 },
        "&.regex": { color: colors.sema14 },
        "&.entity": { color: colors.sema14 },

        "&.directive.tag .tag": {
          background: colors.positive_20,
          color: colors.secondary,
        },
      },
      "& .language-json .token.boolean": { color: colors.primary },
      "& .language-json .token.number": { color: colors.primary },
      "& .language-json .token.property": { color: colors.secondary },
    },
  };
};
