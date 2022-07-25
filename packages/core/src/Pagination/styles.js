import { outlineStyles } from "../Focus/styles";

const styles = (theme) => {
  const hoverColor = theme.hv.palette.atmosphere.atmo4;

  return {
    root: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "stretch",
      flexWrap: "wrap",
      marginTop: `${theme.hv.spacing.sm}px`,
    },
    pageSizeOptions: {
      position: "absolute",
      marginRight: "40px",
      top: "50%",
      transform: "translateY(-50%)",
      left: "0",
    },
    pageSizeOptionsSelect: {
      fontFamily: theme.hv.typography.fontFamily,
      ...theme.hv.typography.sText,
      "-webkit-appearance": "none",
      border: "none",
      borderRadius: 0,
      paddingLeft: `${theme.hv.spacing.xs}px`,
      paddingRight: "32px",
      textAlignLast: "right",
      marginLeft: `${theme.hv.spacing.xs}px`,
      marginRight: `${theme.hv.spacing.xs}px`,
      outline: "none",
      height: "32px",
      backgroundColor: "transparent",
      backgroundSize: "26px 26px",
      "&::-ms-expand": {
        display: "none",
      },
      "&:hover:enabled": {
        cursor: "pointer",
        backgroundColor: hoverColor,
      },
      "&:focus": {
        backgroundColor: hoverColor,
        ...outlineStyles,
      },
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
      marginRight: `${theme.hv.spacing.xs}px`,
    },
    pageSizeInput: {},
    pageSizeInputRoot: {
      "& $pageSizeInput": {
        ...theme.hv.typography.labelText,
        paddingLeft: `${theme.hv.spacing.xs / 2}px`,
        paddingRight: `${theme.hv.spacing.xs / 2}px`,
        margin: 0,
        textAlign: "right",
        MozAppearance: "textfield",
        "&:focus": {
          backgroundColor: hoverColor,
        },
      },
    },
    pageSizeInputContainer: {
      width: "40px",
      minWidth: "40px",
      maxWidth: `${theme.hv.spacing.lg}px`,
      "& $pageSizeInputRoot": {
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: hoverColor,
        },
        "&:focus": {
          backgroundColor: hoverColor,
        },
        '& input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button':
          {
            WebkitAppearance: "none",
            margin: 0,
          },
      },
    },
    iconContainer: {
      padding: 0,
      borderRadius: 0,
      "&:hover": {
        backgroundColor: hoverColor,
      },
      "&:focus": {
        backgroundColor: hoverColor,
        ...outlineStyles,
      },
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
