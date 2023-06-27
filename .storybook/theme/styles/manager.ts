import { HvTheme } from "@hitachivantara/uikit-styles";

export const getManagerStyles = (theme: HvTheme) => {
  return {
    ".sidebar-container": {
      ".sidebar-header": {
        button: {
          position: "absolute",
          right: 0,
          top: 0,
        },

        div: {
          margin: 0,
        },

        a: {
          textAlign: "center",
          fontSize: 27,
        },

        img: {
          // width: "80%",
        },
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
