const styles = (theme) => {
  return {
    root: {
      display: "inline-block",
      maxWidth: "100%",
    },
    resizable: {
      width: "auto",
      resize: "both",
      overflow: "auto",
    },
    disabled: {},
    invalid: {
      border: `1px solid ${theme.hv.palette.semantic.sema4}!important`,
    },
    input: {
      marginLeft: 0,
      marginRight: 0,
      width: 0,
      flex: "1 1 auto",
      minWidth: 100,
    },
    listItemGutters: {
      padding: "0px 5px",
    },
    listItemRoot: {
      marginBottom: 0,
    },
    labelContainer: {
      float: "left",
      display: "flex",
      alignItems: "flex-start",
    },
    label: {
      display: "block",
      float: "left",
      paddingBottom: "6px",
    },
    description: {
      display: "block",
      float: "left",
    },
    characterCounter: {
      display: "block",
      float: "right",
      textAlign: "right",
      marginBottom: "6px",
    },
    tagsList: {
      display: "flex",
      alignContent: "flex-start",
      float: "left",
      clear: "both",
      width: "100%",
      maxWidth: "100%",
      height: "100%",
      padding: 5,
      overflow: "auto",

      flexDirection: "row",
      flexWrap: "wrap",

      backgroundColor: theme.hv.palette.atmosphere.atmo1,
      border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
      borderRadius: "2px",

      "&:focus": {
        outline: "none",
      },

      "&:focus-visible": {
        outlineColor: "#52A8EC",
        outlineStyle: "solid",
        outlineWidth: "0px",
        outlineOffset: "-1px",
        boxShadow: "0 0 0 1px #52A8EC, 0 0 0 4px rgba(29,155,209,.3)",
      },

      "&:focus-within, &:hover": {
        border: `1px solid ${theme.hv.palette.accent.acce1}`,
      },

      "&$disabled": {
        backgroundColor: theme.hv.palette.atmosphere.atmo3,
        border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,

        "&:focus-within, &:hover": {
          border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
        },
      },
    },
    tagInputContainerRoot: {
      display: "flex",
      flexGrow: 1,
    },
    tagInputRoot: {
      width: "100%",
      "&:hover $tagInputBorderContainer": {
        background: "none",
      },
      "&:focus-within $tagInputBorderContainer": {
        background: "none",
      },
    },
    tagInputRootFocused: {
      outline: "none",
      boxShadow: "none",
    },
    tagSelected: {
      outlineColor: "#52A8EC",
      outlineStyle: "solid",
      outlineWidth: "0px",
      outlineOffset: "-1px",
      boxShadow: "0 0 0 1px #52A8EC, 0 0 0 4px rgba(29,155,209,.3)",
    },
    tagInputBorderContainer: {
      border: "none",
      background: "none",
    },
  };
};

export default styles;
