const outlineStyles = {
  outlineColor: "#52A8EC",
  outlineStyle: "solid",
  outlineWidth: "0px",
  outlineOffset: "-1px",
  boxShadow: "0 0 0 1px #52A8EC, 0 0 0 4px rgba(29,155,209,.3)",
};

const styles = (theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.hv.palette.atmosphere.atmo1,
    margin: "3px 3px 6px 3px",
    "&:hover": {
      outline: `3px solid ${theme.hv.palette.atmosphere.atmo3}`,
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
      "& $notificationActionWrapper": {
        display: "block",
      },
    },
    "&$read": {
      backgroundColor: theme.hv.palette.atmosphere.atmo2,
      outline: `3px solid ${theme.hv.palette.atmosphere.atmo2}`,
      "&:hover": {
        backgroundColor: theme.hv.palette.atmosphere.atmo3,
        outline: `3px solid ${theme.hv.palette.atmosphere.atmo3}`,

        "&.focus-visible": {
          ...outlineStyles,
        },
      },
    },

    "&.focus-visible": {
      ...outlineStyles,
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
      "&$read": {
        ...outlineStyles,
      },

      "& $notificationActionWrapper": {
        display: "block",
      },
    },
  },
  notificationWrapper: {
    display: "flex",
    minHeight: "72px",
    marginRight: theme.hv.spacing.xs,
    color: theme.hv.palette.accent.acce1,
    padding: "17px",
    paddingRight: 0,
    cursor: "pointer",

    "&:focus": {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
      outline: `5px solid ${theme.hv.palette.atmosphere.atmo3}`,
      boxShadow: "none",
      "& $notificationActionWrapper": {
        display: "block",
      },
    },

    "&.focus-visible": {
      ...outlineStyles,
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
      "& $notificationActionWrapper": {
        display: "block",
      },
    },
  },

  iconContainer: {
    width: "32px",
    minWidth: "32px",
    marginRight: `${theme.hv.spacing.sm}px`,
  },

  messageContainer: {
    width: "196px",
    maxWidth: "196px",
    display: "-webkit-box",
    lineClamp: 2,
    boxOrient: "vertical",
    overflow: "hidden",
  },

  title: {
    ...theme.hv.typography.highlightText,
    marginBottom: "5px",
  },
  timeContainer: {
    ...theme.hv.typography.vizText,
    display: "flex",
    alignItems: "center",
  },
  bullet: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    marginRight: "4px",
    backgroundColor: theme.hv.palette.accent.acce1,

    "&$hide": {
      display: "none",
    },
  },
  hide: {},
  read: {},
  notificationWrapperDropdown: {
    outline: `3px solid ${theme.hv.palette.atmosphere.atmo3}`,
    backgroundColor: theme.hv.palette.atmosphere.atmo3,
    "& $notificationActionWrapper": {
      display: "block",
    },
    "&$read": {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
      outline: `3px solid ${theme.hv.palette.atmosphere.atmo3}`,
    },
  },

  notificationDropdownOpen: {
    backgroundColor: theme.hv.palette.atmosphere.atmo3,
  },

  notificationActionWrapper: {
    "& > div": {
      marginTop: 17,
    },
  },
});

export default styles;
