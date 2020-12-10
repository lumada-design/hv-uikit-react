const styles = (theme) => ({
  root: {
    minHeight: 200,
    border: `solid 1px ${theme.hv.palette.atmosphere.atmo5}`,
    "& .monaco-editor": {},
    "& .monaco-editor .minimap > canvas": {
      borderLeft: `solid 1px ${theme.hv.palette.atmosphere.atmo5}`,
    },
    "& .monaco-editor .margin": {
      background: theme.hv.palette.atmosphere.atmo2,
      borderRight: `solid 1px ${theme.hv.palette.atmosphere.atmo5}`,
    },
    "& .monaco-scrollable-element > .scrollbar > .slider": {
      borderRadius: "5px",
      background: theme.hv.palette.atmosphere.atmo5,
    },
    "& .monaco-scrollable-element > .scrollbar > .slider:hover": {
      background: theme.hv.palette.accent.acce1,
    },
    "& .monaco-scrollable-element > .scrollbar > .slider:active": {
      background: theme.hv.palette.accent.acce1,
    },
    "& .monaco-scrollable-element > .visible": {
      background: theme.hv.palette.atmosphere.atmo1,
    },
    "& .monaco-scrollable-element > .visible.horizontal": {
      borderTop: `solid 1px ${theme.hv.palette.atmosphere.atmo5}`,
    },
    "& .monaco-scrollable-element > .visible.vertical": {
      borderLeft: `solid 1px ${theme.hv.palette.atmosphere.atmo5}`,
    },
    "& .monaco-editor .scroll-decoration": {
      display: "none",
    },
    "& .monaco-editor .minimap-shadow-visible": {
      display: "none",
    },
  },
});

export default styles;
