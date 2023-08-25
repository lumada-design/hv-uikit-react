import { GlobalProps } from "@emotion/react";

export const getManagerStyles = (): GlobalProps["styles"] => {
  return {
    ".sidebar-container": {
      ".sidebar-header": {
        button: {
          opacity: 0,
        },
        div: {
          margin: 0,
        },
        img: {
          maxHeight: 80,
        },
      },

      "#storybook-explorer-searchfield": {
        borderRadius: 2,
      },

      ".sidebar-item.sidebar-item": {
        fontSize: 14,
        paddingBottom: 4,
        paddingTop: 4,
      },

      ".sidebar-subheading button": {
        fontSize: 12,
      },
    },

    "button[title='Apply outlines to the preview']": {
      display: "none",
    },
  };
};
