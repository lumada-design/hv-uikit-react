const styles = (theme) => {
  const hoverColor = theme.palette.atmo3;

  return {
    root: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "stretch",
      flexWrap: "wrap",
      marginTop: theme.hv.spacing.sm,
      "& $pageSizeInput": {
        ...theme.hv.typography.highlightText,
      },
      "& $pageSizeInputContainer": {
        width: 40,
        minWidth: 40,
        maxWidth: theme.hv.spacing.lg,
        '& input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button':
          {
            WebkitAppearance: "none",
            margin: 0,
          },
      },
      "& $pageSizeInputRoot": {
        backgroundColor: "transparent",
        "&:focus, &:focus-within, &:hover": {
          backgroundColor: hoverColor,
        },
      },
    },
    pageSizeOptions: {
      display: "flex",
      position: "absolute",
      height: 32,
      marginRight: 40,
      top: "50%",
      transform: "translateY(-50%)",
      left: "0",
    },
    pageSizeOptionsSelect: {
      display: "inline-block",
      margin: theme.hvSpacing(0, "xs"),
      width: "auto",
    },
    pageSizeTextContainer: {
      height: "32px",
      padding: "8px 0",
    },
    pageNavigator: {
      display: "flex",
      alignItems: "stretch",
      height: "32px",
      "&>*": {
        margin: `0 ${theme.hv.spacing.xs / 2}px`,
      },
    },
    pageInfo: {
      display: "inline-block",
      whiteSpace: "nowrap",
      height: "32px",
      lineHeight: "32px",
    },
    pageJump: {
      display: "inline-block",
      marginRight: theme.hv.spacing.xs / 2,
    },
    pageSizeInput: {},
    pageSizeInputContainer: {},
    pageSizeInputRoot: {
      "& $pageSizeInput": {
        paddingLeft: theme.hv.spacing.xs / 2,
        paddingRight: theme.hv.spacing.xs / 2,
        margin: 0,
        textAlign: "right",
        MozAppearance: "textfield",
        "&:focus": {
          backgroundColor: hoverColor,
        },
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    iconContainer: {
      padding: 0,
    },
    icon: {},
    selectDownIcon: {
      display: "inline-block",
      position: "relative",
      pointerEvents: "none",
      left: "-32px",
      top: "2px",
      width: 0,
    },
  };
};

export default styles;
