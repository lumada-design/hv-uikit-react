import { hexToRgbA } from "@hitachivantara/uikit-react-core";

const styles = (theme) => {
  const semiTransparentAtmo1 = hexToRgbA(theme.hv.palette.atmosphere.atmo1, 0.4);

  return {
    root: {
      verticalAlign: "inherit",
      textAlign: "left",
      padding: theme.hvSpacing("8px", "xs", "8px", "32px"),

      borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
    },

    head: {
      height: 52,
      verticalAlign: "top",

      backgroundColor: theme.hv.palette.atmosphere.atmo1,
      borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
      borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
      ...theme.hv.typography.highlightText,
    },
    body: {
      minHeight: 32,
      "td&": {
        height: 32,
      },
      backgroundColor: "inherit",
      ...theme.hv.typography.normalText,

      "&$sorted": {
        backgroundColor: semiTransparentAtmo1,
      },
    },
    footer: {},

    sorted: {},

    alignLeft: {
      textAlign: "left",
    },
    alignCenter: {
      textAlign: "center",
    },
    alignRight: {
      textAlign: "right",
      flexDirection: "row-reverse",
    },
    alignJustify: {
      textAlign: "justify",
    },

    variantNone: {
      padding: 0,
    },
    variantCheckbox: {
      padding: 0,
      width: 32,
      maxWidth: 32,
      overflow: "hidden",
      borderRight: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
    },
    variantActions: {
      padding: 0,
      width: 32,
      maxWidth: 32,
      borderLeft: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
    },
    variantExpand: {
      paddingLeft: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    variantList: {
      minHeight: 52,
      "td&": {
        height: 52,
      },
      padding: "0, 0, 0, 32px",
      border: 0,
    },
    variantListHead: {
      backgroundColor: "inherit",
      "td&": {
        height: 16,
      },
    },
    variantListactions: {
      borderLeft: `solid 2px ${theme.hv.palette.atmosphere.atmo2}`,
      paddingLeft: "0",
      textAlign: "center",
      width: 130,
      maxWidth: 130,
    },
    variantListcheckbox: {
      borderRight: `solid 2px ${theme.hv.palette.atmosphere.atmo2}`,
      padding: 0,
      textAlign: "center",
      width: 34,
      maxWidth: 34,
    },
    stickyColumn: {
      position: "sticky",
      zIndex: 2,
      background: theme.hv.palette.atmosphere.atmo2,

      "&$groupColumnMostRight+$stickyColumn": {
        borderLeft: 0,
      },

      "&$sorted": {
        backgroundColor: theme.hv.palette.atmosphere.atmo2,
        backgroundImage: `linear-gradient(to right, ${semiTransparentAtmo1}, ${semiTransparentAtmo1})`,
      },
    },
    stickyColumnMostLeft: {
      borderRight: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
    },
    stickyColumnLeastRight: {
      borderLeft: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
    },

    groupColumnMostLeft: {
      borderLeft: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,

      "&:first-child": {
        borderLeft: 0,
      },
    },
    groupColumnMostRight: {
      borderRight: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,

      // due to the ":has()" selector not being supported in browsers,
      // this need to be managed with inline styles
      // To be uncommented when not needed (see comment in src/Table/hooks/useSticky.js)
      // "&:last-child,&:has(+ $stickyColumnLeastRight)": {
      "&:last-child": {
        borderRight: 0,
      },

      "&+:not($stickyColumn)": {
        borderLeft: 0,
      },
    },

    resizable: {
      borderRight: `solid 1px ${theme.hv.palette.atmosphere.atmo4}`,
    },

    resizing: {
      borderRight: `solid 2px ${theme.hv.palette.accent.acce1}`,
    },
  };
};

export default styles;
