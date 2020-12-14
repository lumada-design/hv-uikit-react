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
