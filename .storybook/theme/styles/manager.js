export const getManagerStyles = (theme) => ({
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

  "button[title='Apply outlines to the preview']": {
    display: "none",
  },
});
