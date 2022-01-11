const truncateStyles = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const styles = (theme) => ({
  root: {},
  inputRoot: {},
  inputBorderContainer: {
    top: "unset",
    bottom: 0,
  },
  input: {
    padding: theme.hvSpacing("8px", 0),
  },
  text: {
    ...truncateStyles,
  },
  textEmpty: {
    color: theme.hv.typography.placeholderText.color,
  },
  button: {
    cursor: "text",
    height: "100%",
    width: "100%",
    maxWidth: "100%",
    justifyContent: "flex-start",

    backgroundColor: "transparent",
    "&:hover, &:active, &:focus": {
      backgroundColor: "transparent",
      "& $icon": {
        visibility: "visible",
      },
    },
  },
  icon: {
    cursor: "pointer",
    visibility: "hidden",
  },
  iconVisible: {
    visibility: "visible",
  },
  largeText: {
    margin: theme.hvSpacing("8px", 0),
  },
});

export default styles;
