export const getStoryStyles = (bgColor: string) => {
  return {
    "body.sb-main-padded.sb-show-main": {
      padding: 0,
    },

    ".sbdocs": {
      fontFamily: "'Open Sans',sans-serif !important",
    },

    ".docs-story": {
      backgroundColor: bgColor,
    },

    ".sb-main-fullscreen.sb-show-main": {
      backgroundColor: bgColor,
    },
  };
};
