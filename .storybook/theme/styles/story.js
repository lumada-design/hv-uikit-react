export const getStoryStyles = (theme) => ({
  ".sb-preparing-docs, .sb-preparing-story": {
    "& .sb-previewBlock": {
      backgroundColor: theme.hv.palette.atmosphere.atmo2,
      border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,

      "& .sb-previewBlock_icon": {
        backgroundColor: theme.hv.palette.atmosphere.atmo4,
      },
    },

    "& .sb-argstableBlock-body tr": {
      borderColor: theme.hv.palette.atmosphere.atmo4,
    },
    "& .sb-argstableBlock-body td": {
      backgroundColor: theme.hv.palette.atmosphere.atmo1,
    },
  },
});
