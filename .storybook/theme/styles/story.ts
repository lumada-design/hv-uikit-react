import { theme } from "@hitachivantara/uikit-styles";

export const getStoryStyles = (bgColor: string) => {
  return {
    "body.sb-main-padded.sb-show-main": {
      padding: 0,
    },

    ".sbdocs-a": {
      color: theme.colors.primary,
    },

    ".docs-story": {
      backgroundColor: bgColor,
    },

    ".sb-main-fullscreen.sb-show-main": {
      backgroundColor: bgColor,
    },
  };
};
