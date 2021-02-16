export const getDocsStyles = (theme) => ({
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
      fontSize: "inherit",
    },
    "h1, h2": {
      lineHeight: "initial",
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
