const styles = () => ({
  headerColorValue: {
    textTransform: "uppercase",
  },
  headerColorIcon: {
    width: 24,
    "& svg": {
      marginLeft: 0,
    },
  },
  panel: {
    width: "100%",
    minWidth: 240,
    display: "flex",
    justifyContent: "center",
    padding: "20px 15px 20px 20px",
  },
  colorPicker: {
    width: 205,
  },
  presetColors: {
    borderTop: "none !important",
  },
  labelContainer: {
    display: "flex",
    alignItems: "flex-start",
  },
  label: {
    paddingBottom: "6px",
    display: "block",
  },
  description: {},
});

export default styles;
