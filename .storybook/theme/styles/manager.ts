export const getManagerStyles = (theme) => {
  return {
    ".sidebar-container": {
      ".sidebar-header button": {
        display: "none",
      },

      ".sidebar-header div": {
        margin: 0,
      },

      ".sidebar-header a": {
        textAlign: "center",
        fontSize: 27,
      },

      ".sidebar-header img": {
        width: "80%",
      },

      "#storybook-explorer-searchfield": {
        borderRadius: 2,
      },

      ".sidebar-item.selected": {
        color: theme.colors.atmo1,
      },

      ".sidebar-item.sidebar-item": {
        fontSize: 14,
        paddingBottom: 4,
        paddingTop: 4,
        color: "#000000",
      },

      ".sidebar-item.sidebar-item[data-selected='true']": {
        backgroundColor: "#eaf0fb",
      },

      ".sidebar-item.sidebar-item[data-selected='true'] svg": {
        color: "rgba(0,0,0,0.9)",
      },

      ".sidebar-item.sidebar-item:hover": {
        backgroundColor: "#eaf0fb",
      },

      ".sidebar-subheading button": {
        fontWeight: 900,
        fontSize: 12,
        color: "#000000",
      },

      form: {
        borderBottomColor: theme.colors.atmo6,

        "&:hover, &:focus-within": {
          borderBottomColor: theme.colors.secondary,
        },
      },
    },

    "button[title='Apply outlines to the preview']": {
      display: "none",
    },

    ".sidebar-item.sidebar-item svg": {
      color: "rgba(0,0,0,0.5)",
    },
  };
};
