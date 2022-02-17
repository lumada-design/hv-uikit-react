const interval = 0.11;

const bars = {
  "&:nth-child(1)": {
    animationDelay: "0",
  },
  "&:nth-child(2)": {
    animationDelay: `${interval * 2}s`,
  },
  "&:nth-child(3)": {
    animationDelay: `${interval * 4}s`,
  },
};

const small = {
  width: "2px",
  height: "18px",
  margin: "0px 2px",
  ...bars,
};

const regular = {
  width: "4px",
  height: "30px",
  margin: "0 3px",
  ...bars,
};

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  hidden: {
    display: "none",
  },

  barContainer: {
    display: "flex",
  },

  loadingBar: {
    display: "inline-block",
  },

  regular: {
    animation: "$loading-regular 1s ease-in-out infinite",
    ...regular,
  },
  regularColor: {
    animation: "$loading-regular-color 1s ease-in-out infinite",
    ...regular,
  },

  small: {
    animation: "$loading-small 1s ease-in-out infinite",
    ...small,
  },
  smallColor: {
    animation: "$loading-small-color 1s ease-in-out infinite",
    ...small,
  },
  "@keyframes loading-regular": {
    "0%": {
      transform: "scale(1)",
      backgroundColor: theme.hv.palette.accent.acce3,
    },
    "50%": {
      transform: "scale(1, 0.6)",
      backgroundColor: theme.hv.palette.accent.acce1,
    },
  },

  "@keyframes loading-regular-color": {
    "0%": {
      transform: "scale(1)",
    },
    "50%": {
      transform: "scale(1, 0.6)",
    },
  },

  "@keyframes loading-small": {
    "0%": {
      transform: "scale(1)",
    },
    "50%": {
      transform: "scale(1,0.223)",
    },
    "100%": {},
  },

  "@keyframes loading-small-color": {
    "0%": {
      transform: "scale(1)",
    },
    "50%": {
      transform: "scale(1,0.223)",
    },
  },

  label: {
    marginTop: "15px",
  },

  progress: {
    width: "100%",
  },

  progressContainer: {
    width: "100%",
  },

  progressBarContainer: {
    display: "flex",
    width: "100%",
    height: 4,
    backgroundColor: theme.hv.palette.atmosphere.atmo4,
  },

  progressBar: {
    backgroundColor: "#000",
    height: 4,
  },

  progressDone: {
    backgroundColor: theme.hv.palette.semantic.sema1,
  },

  progressError: {
    backgroundColor: theme.hv.palette.semantic.sema4,
  },

  progressBarLabel: {
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "end",
  },
});

export default styles;
