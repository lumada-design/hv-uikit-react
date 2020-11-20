export const getManagerStylesOverrides = (theme) => ({
  ".sidebar-container": {
    ".sidebar-item.selected": {
      color: theme.hv.palette.atmosphere.atmo1,
    },

    form: {
      borderBottomColor: theme.hv.palette.atmosphere.atmo6,

      "&:hover, &:focus-within": {
        borderBottomColor: theme.hv.palette.accent.acce1,
      },
    },

    /* hide shortcuts button */
    ".sidebar-header button": {
      display: "none",
    },
  },

  ".simplebar-wrapper": {
    backgroundColor: theme.hv.palette.atmosphere.atmo3,

    ...(process.env.NODE_ENV !== "production"
      ? {}
      : {
          // hide the Canvas tab when in production
          ".simplebar-content > div > div > div > a:first-of-type": {
            display: "none",

            "& + a": {
              // same margin than the separator
              marginLeft: "15px",
            },
          },
        }),
  },
});

export const getDocsStylesOverrides = (theme) => ({
  "body.sb-show-main": {
    // margin not needed in Docs view
    margin: 0,
  },

  // removes the transformation buttons from toolbar
  ".simplebar-content > div >div:first-of-type > button ": {
    display: "none",
  },
  // each story has a transformation applied (used by buttons of the toolbar), even if no
  // transformation is used.
  // theses transformations were removed, as they would reset the coordinates system to
  // the div were they are applied.
  ".sbdocs": {
    " & > div > div > div": {
      transform: "unset !important",
      WebkitTransform: "unset !important",
    },
    'a[class*="sbdocs"]': {
      ...theme.hv.typography.link,
      fontSize: 14,
    },
    "&.sbdocs-wrapper": {
      backgroundColor: theme.hv.palette.atmosphere.atmo2,
    },

    "& > .sbdocs-content": {
      maxWidth: "inherit",

      /* Usage block */
      ".docblock-source > div": {
        backgroundColor: theme.hv.palette.atmosphere.atmo1,
        "& > button": {
          backgroundColor: theme.hv.palette.atmosphere.atmo1,
        },
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

      "& > h2": {
        borderBottomColor: theme.hv.palette.atmosphere.atmo4,
        paddingBottom: theme.hv.spacing.xs,
        marginBottom: theme.hv.spacing.sm,
      },
    },
  },
});
