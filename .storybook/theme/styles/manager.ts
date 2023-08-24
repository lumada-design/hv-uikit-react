import { GlobalProps } from "@emotion/react";
import { colors } from "@hitachivantara/uikit-styles";

export const getManagerStyles = (isDark: boolean): GlobalProps["styles"] => {
  const color = colors[isDark ? "dark" : "light"];

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

      ".sidebar-item": {
        "&[data-selected=true]": {
          background: color.primary,
          "&:hover, &:focus": {
            background: color.primary_80,
          },
        },
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
