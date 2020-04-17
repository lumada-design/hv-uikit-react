export const getManagerStylesOverrides = theme => ({
  ".sidebar-container": {
    ".sidebar-item.selected": {
      color: theme.hv.palette.atmosphere.atmo1
    },

    form: {
      borderBottomColor: theme.hv.palette.atmosphere.atmo6,

      "&:hover, &:focus-within": {
        borderBottomColor: theme.hv.palette.accent.acce1
      }
    },

    /* hide shortcuts button */
    ".sidebar-header button": {
      display: "none"
    }
  },

  ".simplebar-wrapper": {
    backgroundColor: theme.hv.palette.atmosphere.atmo3,

    ...(process.env.NODE_ENV !== "production"
      ? {}
      : {
          // hide the Canvas tab when in production
          ".simplebar-content > div > div > div > a:first-child": {
            display: "none",

            "& + a": {
              // same margin than the separator
              marginLeft: "15px"
            }
          }
        })
  }
});

export const getDocsStylesOverrides = theme => ({
  ".sbdocs": {
    a: {
      color: theme.hv.typography.inlineLink.color
    },
    "&.sbdocs-wrapper": {
      backgroundColor: theme.hv.palette.atmosphere.atmo2
    },

    "& > .sbdocs-content": {
      maxWidth: "inherit",

      /* Usage block */
      ".docblock-source > div": {
        backgroundColor: theme.hv.palette.atmosphere.atmo1,
        "& > button": {
          backgroundColor: theme.hv.palette.atmosphere.atmo1
        }
      },

      "table.docblock-propstable": {
        "tbody.docblock-propstable-body": {
          "tr > th": {
            // important because https://github.com/storybookjs/storybook/blob/v5.3.18/lib/components/src/blocks/PropsTable/SectionRow.tsx#L19
            backgroundColor: theme.hv.palette.atmosphere.atmo1 + " !important"
          },
          "tr:not(:first-child)": {
            borderTopColor: theme.hv.palette.atmosphere.atmo5
          }
        }
      },

      "& > h2": {
        borderBottomColor: theme.hv.palette.atmosphere.atmo6,
        paddingBottom: theme.hv.spacing.xs,
        marginBottom: theme.hv.spacing.sm
      }
    }
  }
});
